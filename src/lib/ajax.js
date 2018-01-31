function send(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(new Error(xhr.statusText))
      }
    }

    xhr.onerror = () => {
      reject(xhr)
    }

    xhr.setRequestHeader('Content-Type', 'application/json')

    if (data !== undefined) {
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
  })
}

export default {
  get(url) {
    return send('GET', url)
  },

  post(url, data) {
    return send('POST', url, data)
  },

  patch(url, data) {
    return send('PATCH', url, data)
  },

  delete(url) {
    return send('DELETE', url)
  },
}
