<template>
<div class="image-matching-node-property">
  <span class="node-type">{{ node.displayType }}</span>

  <mdc-textfield v-model="node.name"
                 class="node-name" label="Action name" />

  <mdc-fab icon="camera_alt" mini class="capture-button" @click="onCaptureButtonClick"></mdc-fab>

  <div v-show="hasImage">
    <div class="screenshot-container" @click="onScreenshotClick">
      <span class="select-area-notice" v-show="!hasRect">Click here and select matching area.</span>
      <img :src="node.imageUrlPath" class="screenshot" />
    </div>

    <mdc-textfield v-model="node.windowTitle"
                   class="window-title" label="Window title" />

    <mdc-select v-model="node.action" label="Please select action"
                class="action">
      <mdc-option value="Nothing">Nothing</mdc-option>
      <mdc-option value="LeftClick">Left Click</mdc-option>
      <mdc-option value="RightClick">Right Click</mdc-option>
      <mdc-option value="DoubleLeftClick">Double Left Click</mdc-option>
      <mdc-option value="Drag">Drag</mdc-option>
    </mdc-select>

<!--
    <span class="timeout-help">Timeout: {{ node.timeout }} second{{ node.timeout > 1 ? 's' : '' }}</span>
    <mdc-slider min=0 max=60 step=1 v-model="node.timeout" />
-->
  </div>

  <rpa-screenshot-dialog ref="screenshotDialog" :node="node" @update:pos="onPosUpdate" />
</div>
</template>

<script>
import io from 'socket.io-client'
import ScreenshotDialog from './ScreenshotDialog'

export default {
  name: 'rpa-image-matching-node-property',

  components: {
    'rpa-screenshot-dialog': ScreenshotDialog,
  },

  props: ['initialNode'],

  data() {
    return {
      node: {},
    }
  },

  computed: {
    hasImage() {
      return !!this.node.imageUrlPath
    },

    hasRect() {
      return this.node.startPos[0] !== 0 &&
        this.node.startPos[1] !== 0 &&
        this.node.endPos[0] !== 0 &&
        this.node.endPos[1] !== 0
    },
  },

  created() {
    this.node = this.initialNode.toJSON()
  },

  updated() {
    this.$emit('update:node', this.node)
  },

  methods: {
    onCaptureButtonClick() {
      const self = this

      const socket = io.connect("/screenshots")

      socket.on('connect', () => {
        console.log('connected.')
      })

      socket.on('receiving screenshot ready', (data) => {
        // Launch local capture application
        // (Not use location.href for Chrome/IE support)
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = 'openrpa:capture/' + data.token
        document.body.appendChild(iframe)
      })

      socket.on('receive screenshot', (data) => {
        self.node.imageUrlPath = data.path
        self.node.windowTitle = data.title

        socket.close()

        self.$refs.screenshotDialog.show()
      })
    },

    onScreenshotClick() {
      this.$refs.screenshotDialog.show()
    },

    onPosUpdate(pos) {
      this.node.startPos = pos.startPos
      this.node.endPos = pos.endPos
      this.node.actionPos = pos.actionPos
    },
  }
}
</script>

<style scoped>
.node-type {
    display: block;
}

.capture-button {
    display: block;
    margin: 2rem 10px;
}

.screenshot-container {
    position: relative;
}

.select-area-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: black;
    opacity: 0.8;
    color: white;
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
}

.screenshot {
    width: 100%;
}

.window-title,
.action,
.timeout-help {
    margin-top: 20px;
}

.timeout-help {
    display: block;
}
</style>
