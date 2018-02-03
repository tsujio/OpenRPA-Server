<template>
<div class="workflow-canvas">
  <div class="canvas-control">
    <mdc-button @click="onSaveButtonClick"
                :disabled="isSaving"
                raised>Save</mdc-button>
    <mdc-button @click="onExecuteButtonClick"
                :disabled="isExecuteButtonDisabled"
                raised accent>Execute</mdc-button>
  </div>

  <div class="canvas-main">
    <template v-for="node in workflow.body">
      <rpa-main-node v-if="node.type === 'Main'" :key="node.id" v-bind="node"
                     @update:node="(node, callback) => $emit('update:node', node, callback)" />
    </template>
  </div>
</div>
</template>

<script>
import MainNode from './node/MainNode'

export default {
  name: 'rpa-workflow-canvas',

  components: {
    'rpa-main-node': MainNode,
  },

  props: ['workflow', 'isSaving'],

  data() {
    return {
      isExecuteButtonDisabled: false,
    }
  },

  methods: {
    onSaveButtonClick() {
      this.$emit('click:savebutton')
    },

    onExecuteButtonClick() {
    },
  }
}
</script>

<style lang="scss" scoped>
@import './theme';

.workflow-canvas {
    margin-top: 20px;
    margin-bottom: 20px;
    background: $rpa-background-light;
    min-width: 500px;
    border: 1px solid $rpa-background-dark;
}

.canvas-control {
    position: sticky;
    top: 20px;
    margin-top: 20px;
    margin-right: 20px;
    float: right;
}

.canvas-control button {
    margin-left: 20px;
}

.canvas-main {
    padding: 20px 60px;
}
</style>
