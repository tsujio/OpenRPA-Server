<template>
<div class="screenshot-dialog">
  <mdc-dialog ref="dialog" title="Select Matching Area" accept="Save" cancel="Cancel"
              @accept="onSave" @cancel="onCancel">
    <div class="screenshot-canvas-container">
      <canvas ref="canvas" class="screenshot-canvas"
              @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
    </div>
  </mdc-dialog>
</div>
</template>

<script>
import theme from '../theme.scss'

export default {
  name: 'rpa-screenshot-dialog',

  props: ['node'],

  data() {
    return {
      startPos: [0, 0],
      endPos: [0, 0],
      actionPos: [0, 0],
      isMouseDown: false,
      isMovingActionPos: false,
      actionPosRadius: 5,
    }
  },

  methods: {
    show() {
      this.initialize()
      this.$refs.dialog.show()
    },

    onSave() {
      this.$emit('update:pos', {
        startPos: this.startPos,
        endPos: this.endPos,
        actionPos: this.actionPos,
      })
    },

    onCancel() {
    },

    getTopLeftPosOfRect() {
      return [Math.min(this.startPos[0], this.endPos[0]),
              Math.min(this.startPos[1], this.endPos[1])]
    },

    getAbsoluteActionPos() {
      const topLeftPos = this.getTopLeftPosOfRect()
      return [topLeftPos[0] + this.actionPos[0],
              topLeftPos[1] + this.actionPos[1]]
    },

    initialize() {
      this.startPos = JSON.parse(JSON.stringify(this.node.startPos))
      this.endPos = JSON.parse(JSON.stringify(this.node.endPos))
      this.actionPos = JSON.parse(JSON.stringify(this.node.actionPos))
      this.isMouseDown = false
      this.draw()
    },

    draw() {
      const self = this
      const ctx = this.$refs.canvas.getContext('2d')
      const img = new Image()

      img.onload = function() {
        self.$refs.canvas.width = img.width
        self.$refs.canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        self.drawRect(ctx)
        self.drawPoint(ctx)
      }
      img.src = this.node.imageUrlPath
    },

    drawRect(ctx) {
      const startPos = this.startPos
      const endPos = this.endPos

      if (startPos[0] === endPos[0] &&
          startPos[1] === endPos[1]) {
        return
      }

      ctx.save()

      // Set line style
      ctx.strokeStyle = theme.themeAccent
      ctx.lineWidth = 5
      ctx.setLineDash([2, 3])

      ctx.beginPath()

      // Top
      ctx.moveTo(startPos[0], startPos[1])
      ctx.lineTo(endPos[0], startPos[1])

      // Bottom
      ctx.moveTo(startPos[0], endPos[1])
      ctx.lineTo(endPos[0], endPos[1])

      // Right
      ctx.moveTo(endPos[0], startPos[1])
      ctx.lineTo(endPos[0], endPos[1])

      // Left
      ctx.moveTo(startPos[0], startPos[1])
      ctx.lineTo(startPos[0], endPos[1])

      ctx.stroke()

      ctx.restore()
    },

    drawPoint(ctx) {
      const startPos = this.startPos
      const endPos = this.endPos

      if (startPos[0] === endPos[0] &&
          startPos[1] === endPos[1]) {
        return
      }

      ctx.save()

      // Set point style
      ctx.strokeStyle = ctx.fillStyle = theme.themePrimary

      // Draw point (small filled circle)
      ctx.beginPath()
      const absPos = this.getAbsoluteActionPos()
      ctx.arc(absPos[0], absPos[1], this.actionPosRadius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    },

    onMouseDown(e) {
      this.isMouseDown = true

      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // If cursor is on actionPos...
      const absPos = this.getAbsoluteActionPos()
      if (Math.pow(x - absPos[0], 2) + Math.pow(y - absPos[1], 2) <=
          Math.pow(this.actionPosRadius, 2)) {
        // Start moving actionPos
        this.isMovingActionPos = true

        return
      }

      this.startPos = [x, y]
    },

    onMouseMove(e) {
      if (!this.isMouseDown) {
        return
      }

      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const topLeftPos = this.getTopLeftPosOfRect()

      if (this.isMovingActionPos) {
        // Set actionPos to cursor position
        this.actionPos = [x - topLeftPos[0],
                          y - topLeftPos[1]]
      } else {
        // Set endPos to cursor position
        this.endPos = [x, y]

        // Set actionPos to center of rect
        this.actionPos = [
          (this.startPos[0] + this.endPos[0]) / 2 - topLeftPos[0],
          (this.startPos[1] + this.endPos[1]) / 2 - topLeftPos[1],
        ]
      }

      this.draw()
    },

    onMouseUp: function() {
      this.isMouseDown = false
      this.isMovingActionPos = false
    },
  },
}
</script>

<style scoped>
.screenshot-canvas-container {
    height: 50vh;
    overflow: scroll;
}
</style>
