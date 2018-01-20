<template>
<div class="workflow-panel">
  <mdc-textfield v-model="name" label="Title" outline />

  <rpa-workflow-canvas :workflow.sync="workflow" />
</div>
</template>

<script>
import WorkflowCanvas from './WorkflowCanvas'

export default {
  name: 'rpa-workflow-panel',

  components: {
    'rpa-workflow-canvas': WorkflowCanvas,
  },

  data() {
    return {
      name: "",
      workflow: [],
    }
  },
}
</script>

<style scoped>
.workflow-panel {
    margin-left: 200px;
    padding: 0 20px;
    overflow-x: scroll;
}
</style>
