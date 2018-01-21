<template>
<div class="workflow-canvas">
  <template v-for="node in workflow">
    <rpa-main-node v-if="node.type === 'Main'" :key="node.id" v-bind="node"
                   @update:node="(accessor, update) => $emit('update:node', accessor, update)" />
  </template>
</div>
</template>

<script>
import MainNode from './node/MainNode'

export default {
  name: 'rpa-workflow-canvas',

  components: {
    'rpa-main-node': MainNode,
  },

  props: ['workflow'],
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
