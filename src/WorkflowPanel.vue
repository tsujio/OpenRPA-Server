<template>
<div class="workflow-panel">
  <mdc-textfield v-model="name" label="Title" outline />

  <rpa-workflow-canvas :workflow="workflow" @update:node="onNodeUpdate" />
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
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

  created() {
    this.workflow = this.getEmptyWorkflow()
  },

  methods: {
    getEmptyWorkflow() {
      return [
        {
          id: uuidv4(),
          type: 'Main',
          displayType: "",
          name: "",
          body: [
          ],
        },
      ]
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
    margin-left: 200px;
    padding: 0 20px;
    overflow-x: scroll;
}
</style>
