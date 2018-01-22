const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io').listen(http)
const multer = require('multer')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const nodeZip = require('node-zip')
const fs = require('fs')
const path = require('path')
const imageType = require('image-type')
const moment = require('moment')
const secureRandom = require('secure-random')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT
const MONGODB_ADDR = process.env.MONGODB_PORT_27017_TCP_ADDR
const MONGODB_PORT = process.env.MONGODB_PORT_27017_TCP_PORT

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

const upload = multer({
  inMemory: true,
})

const mongodbURL = `mongodb://${MONGODB_ADDR}:${MONGODB_PORT}`
var db = null
MongoClient.connect(mongodbURL, (err, mongodb) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  db = mongodb.db('openrpa')
})

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

const screenshotNS = io.of('/screenshots')

const screenshotSockets = {}

screenshotNS.on('connection', (socket) => {
  const token = Array.from(secureRandom.randomArray(32), (byte) => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2)
  }).join('')

  screenshotSockets[token] = socket

  socket.emit('receiving screenshot ready', {
    token: token
  })

  socket.on('close', () => {
    delete screenshotSockets[token]
  })
})

/**
 * Upload screenshot
 */
app.post(`/screenshots`, upload.single('screenshot'), (req, res) => {
  const token = req.query.token
  const screenshot = req.file
  const title = req.body.title

  db.collection('screenshots', (err, collection) => {
    collection.insert({
      id: token,
      data: screenshot.buffer,
      type: imageType(screenshot.buffer).mime,
      createdAt: moment().utc(),
    }, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send('Fail to save screenshot.')
        return
      }

      screenshotSockets[token].emit('receive screenshot', {
        title: title,
        path: `/screenshots/${token}`,
      })

      res.send('OK')
    })
  })
})

/**
 * Get screenshot
 */
app.get(`/screenshots/:id`, (req, res) => {
  db.collection('screenshots', (err, collection) => {
    collection.findOne({id: req.params.id}, {}, (err, r) => {
      if (err) {
        console.log(err)
        res.status(500).send(`Fail to load screenshot.`)
        return
      }

      res.writeHead(200, {'Content-Type': r.type})
      res.end(r.data.read(0, r.data.length))
    })
  })
})

/**
 * Create workflow
 */
app.post(`/workflows`, (req, res) => {
  const workflow = req.body

  const now = moment().utc()
  workflow.id = uuidv4()
  workflow.createdAt = now
  workflow.updatedAt = now

  db.collection('workflows', (err, collection) => {
    collection.insert(workflow, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send('Fail to save workflow.')
        return
      }

      res.writeHead('Content-Type', 'application/json')
      res.send({id: workflow.id})
    })
  })
})

/**
 * Get workflow
 */
app.get(`/workflows/:id`, (req, res) => {
  db.collection('workflows', (err, collection) => {
    collection.findOne({id: req.params.id}, {}, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send(`Fail to load workflow.`)
        return
      }

      res.writeHead('Content-Type', 'application/json')
      res.send(doc)
    })
  })
})

/**
 * Update workflow
 */
app.post(`/workflows/:id`, (req, res) => {
  const workflow = req.body

  delete workflow.id
  workflow.updatedAt = moment().utc()

  db.collection('workflows', (err, collection) => {
    collection.updateOne({id: req.params.id}, {$set: workflow}, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send('Fail to update workflow.')
        return
      }

      res.writeHead('Content-Type', 'application/json')
      res.send({})
    })
  })
})

/**
 * Delete workflow
 */
app.post(`/workflows/:id`, (req, res) => {
  db.collection('workflows', (err, collection) => {
    collection.deleteOne({id: req.params.id}, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send('Fail to delete workflow.')
        return
      }

      res.writeHead('Content-Type', 'application/json')
      res.send({})
    })
  })
})

/**
 * Get robot file
 */
app.get(`/robots/:id`, (req, res) => {
  db.collection('workflows', (err, collection) => {
    collection.findOne({id: req.params.id}, {}, (err, doc) => {
      if (err) {
        console.log(err)
        res.status(500).send(`Fail to load workflow.`)
        return
      }

      const zip = nodeZip()

      // Add Robotfile
      zip.file('Robotfile', JSON.stringify({
        version: '0.0.1',
        id: doc.id,
        name: doc.name,
        program: 'workflow.json',
      }))

      // Add workflow
      zip.file('workflow.json', JSON.stringify(doc.data))

      const robotFile = zip.generate({base64: false, compression: 'DEFLATE'})

      res.writeHead('Content-Type', 'application/zip')
      res.send(robotFile)
    })
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})