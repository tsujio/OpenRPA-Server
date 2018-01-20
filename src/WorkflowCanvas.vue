<template>
<div class="workflow-canvas">
  <template v-for="node in workflow">
    <rpa-main-node v-if="node.type === 'Main'" :key="node.id"
                   :id="node.id" :type="node.type" :displayType="node.displayType"
                   :name.sync="node.name" :body.sync="node.body" />
  </template>
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import MainNode from './node/MainNode'

export default {
  name: 'rpa-workflow-canvas',

  components: {
    'rpa-main-node': MainNode,
  },

  props: ['workflow'],

  created() {
    this.$emit('update:workflow', this.getEmptyWorkflow());
  },

  methods: {
    getEmptyWorkflow() {
      return [
        {
          id: uuidv4(),
          type: 'Main',
          displayType: "",
          name: "",
          body: [],
        },
      ]
    },
  },
}
</script>

<style scoped>
.workflow-canvas {
    margin-top: 20px;
    margin-bottom: 20px;
    background: #fafafa;
    padding: 20px 60px;
    min-width: 500px;
    border: 1px solid lightgray;
}
</style>
