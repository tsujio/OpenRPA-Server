<template>
<div class="flow">
  <rpa-successor-drop-area :predecessor-id="null" @successordrop="onSuccessorDrop" />

  <template v-for="node in body">
    <rpa-image-matching-node
       :key="node.id" v-if="node.type === 'ImageMatching'" v-bind="node"
       @update:node="onNodeUpdate" />
    <rpa-while-node
       :key="node.id" v-else-if="node.type === 'While'" v-bind="node"
       @update:node="onNodeUpdate" />

    <rpa-successor-drop-area :key="'sda-' + node.id" :predecessor-id="node.id" @successordrop="onSuccessorDrop" />
  </template>
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import SuccessorDropArea from './SuccessorDropArea'
import ImageMatchingNode from './ImageMatchingNode'
import WhileNode from './WhileNode'

export default {
  name: 'rpa-flow',

  components: {
    'rpa-successor-drop-area': SuccessorDropArea,
    'rpa-image-matching-node': ImageMatchingNode,
    'rpa-while-node': WhileNode,
  },

  props: ['body'],

  methods: {
    createNodeInstance(nodeInfo) {
      const copy = JSON.parse(JSON.stringify(nodeInfo))

      return Object.assign(copy, {
        id: uuidv4(),
        name: copy.displayType,
      })
    },

    onSuccessorDrop(predecessorId, nodeInfo) {
      const node = this.createNodeInstance(nodeInfo)

      // Find index where insert dropped node
      var sliceIndex = 0
      if (predecessorId !== null) {
        for (let i = 0; i < this.body.length; i++) {
          if (this.body[i].id === predecessorId) {
            sliceIndex = i + 1
            break
          }
        }
      }

      // Notify to parent
      this.$emit('update:body',
                 this.body.slice(0, sliceIndex)
                 .concat([node])
                 .concat(this.body.slice(sliceIndex)))
    },

    onNodeUpdate(node) {
      // Find index of node to update
      var updateIndex = -1
      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].id === node.id) {
          updateIndex = i
          break
        }
      }

      if (updateIndex === -1) {
        throw new Error(`node (id=${node.id}) not found`)
      }

      // Notify to parent
      this.$emit('update:body',
                 this.body.slice(0, updateIndex)
                 .concat(node)
                 .concat(this.body.slice(updateIndex + 1)))
    },
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.flow {
    @include container-node-mixin;
}
</style>
