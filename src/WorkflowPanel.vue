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

    onNodeUpdate(accessor, update) {
      var target = this.workflow

      for (let prop of accessor) {
        for (let node of target) {
          if (node[prop.name] === prop.value) {
            target = node
            break
          }
        }
      }

      target[update.name] = update.value
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
