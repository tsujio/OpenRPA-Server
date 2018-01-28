<template>
<div class="workflow-panel">
  <mdc-textfield :value="name" @input="onNameUpdate" label="Title" outline />

  <rpa-workflow-canvas :workflow="workflow" @update:node="onNodeUpdate" />
</div>
</template>

<script>
import WorkflowCanvas from './WorkflowCanvas'

export default {
  name: 'rpa-workflow-panel',

  components: {
    'rpa-workflow-canvas': WorkflowCanvas,
  },

  props: ['name', 'workflow'],

  methods: {
    onNameUpdate(name) {
      this.$emit('update:name', name)
    },

    onNodeUpdate(node, callback) {
      // Find index of node to update
      var updateIndex = -1
      for (let i = 0; i < this.workflow.length; i++) {
        if (this.workflow[i].id === node.id) {
          updateIndex = i
          break
        }
      }

      if (updateIndex === -1) {
        throw new Error(`node (id=${node.id}) not found`)
      }

      // Notify to parent
      this.$emit('update:workflow',
                 this.workflow.slice(0, updateIndex)
                 .concat(node)
                 .concat(this.workflow.slice(updateIndex + 1)),
                 callback)
    }
  },
}
</script>

<style scoped>
.workflow-panel {
    height: calc(100vh - 64px);
    margin-left: 200px;
    padding: 10px 20px;
    margin-right: 300px;
    overflow: auto;
    box-sizing: border-box;
}
</style>
