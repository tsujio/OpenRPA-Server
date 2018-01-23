<template>
<div class="node-property-panel" v-if="isNodeSet">
  <rpa-image-matching-node-property
     :key="node.id" v-if="node.type === 'ImageMatching'"
     :initial-node="node" @update:node="val => $emit('update:node', val)" />
  <rpa-while-node-property
     :key="node.id" v-else-if="node.type === 'While'"
     :initial-node="node" @update:node="val => $emit('update:node', val)" />
</div>
</template>

<script>
import ImageMatchingNodeProperty from './property/ImageMatchingNodeProperty'
import WhileNodeProperty from './property/WhileNodeProperty'

export default {
  name: 'rpa-node-property-panel',

  components: {
    'rpa-image-matching-node-property': ImageMatchingNodeProperty,
    'rpa-while-node-property': WhileNodeProperty,
  },

  props: ['node'],

  computed: {
    isNodeSet() {
      return this.node !== null
    }
  }
}
</script>

<style scoped>
.node-property-panel {
    position: fixed;
    top: 64px;
    bottom: 0;
    right: 0;
    width: 300px;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #eee;
    border-left: 1px solid #ccc;
    overflow-x: hidden;
    overflow-y: auto;
}

.node-property-panel.hidden {
    display: none;
}
</style>
