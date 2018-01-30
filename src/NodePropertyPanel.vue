<template>
<div class="node-property-panel">
  <div v-if="isNodeSet">
    <component :is="nodePropertyClass" :key="node.id" :initial-node="node"
               @update:node="val => $emit('update:node', val)" />
  </div>
</div>
</template>

<script>
import ImageMatchingNodeProperty from './property/ImageMatchingNodeProperty'
import IfNodeProperty from './property/IfNodeProperty'
import WhileNodeProperty from './property/WhileNodeProperty'

export default {
  name: 'rpa-node-property-panel',

  components: {
    'rpa-image-matching-node-property': ImageMatchingNodeProperty,
    'rpa-if-node-property': IfNodeProperty,
    'rpa-while-node-property': WhileNodeProperty,
  },

  props: ['node'],

  computed: {
    isNodeSet() {
      return this.node !== null
    },

    nodePropertyClass() {
      switch (this.node.type) {
      case 'ImageMatching': return 'rpa-image-matching-node-property'
      case 'If': return 'rpa-if-node-property'
      case 'While': return 'rpa-while-node-property'
      default: throw new Error(`Unknown node type: ${node.type}`)
      }
    },
  },
}
</script>

<style scoped>
.node-property-panel {
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
}
</style>
