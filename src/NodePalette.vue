<template>
<div class="node-palette">
  <rpa-node-class v-for="nodeClass in nodeClasses" :key="nodeClass.type" v-bind="nodeClass" />
</div>
</template>

<script>
import NodeClass from './NodeClass'

export default {
  name: 'rpa-node-palette',

  components: {
    'rpa-node-class': NodeClass,
  },

  data() {
    return {
      nodeClasses: [
        {type: 'ImageMatching', displayType: 'Image Matching', ext: {
          imageUrlPath: "",
          windowTitle: "",
          startPos: [0, 0],
          endPos: [0, 0],
          action: "Nothing",
          actionPos: [0, 0],
          timeout: 10,
        }},
        {type: 'KeyboardInput', displayType: 'Keyboard Input'},
        {type: 'OpenExplorer', displayType: 'Open Folder'},
        {type: 'FileRead', displayType: 'File Read'},
        {type: 'UserInput', displayType: 'User Input'},
        {type: 'Variable', displayType: 'Read/Write Variable'},
        {type: 'Wait', displayType: 'Wait'},
        {type: 'If', displayType: 'Branch', ext: {
          condition: [],
          thenFlow: [],
          elseFlow: [],
        }},
        {type: 'While', displayType: 'Loop', ext: {
          condition: [],
          body: [],
        }},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme';

.node-palette {
    position: fixed;
    top: $rpa-toolbar-height;
    bottom: 0;
    left: 0;
    width: $rpa-left-side-panel-width;
    padding: 20px 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    background: $rpa-background;
    border-right: 1px solid $rpa-background-dark;
}
</style>
