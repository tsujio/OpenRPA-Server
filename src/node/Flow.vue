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

  created() {
    const self = this

    this.$root.$on('remove:node', function(node, callback) {
      const i = self.findNode(node.id)

      if (i !== -1) {
        self.$emit('update:flow',
                   self.body.slice(0, i).concat(self.body.slice(i + 1)),
                   callback)
      }
    })
  },

  methods: {
    findNode(nodeId) {
      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].id === nodeId) {
          return i
        }
      }

      return -1
    },

    createNodeInstance(nodeInfo) {
      const copy = JSON.parse(JSON.stringify(nodeInfo))

      return Object.assign(copy, {
        id: uuidv4(),
        name: copy.displayType,
      })
    },

    onSuccessorDrop(predecessorId, nodeInfo) {
      const self = this

      const isNodeMove = !!nodeInfo.id
      const node = isNodeMove ? nodeInfo : this.createNodeInstance(nodeInfo)

      if (predecessorId === node.id) {
        return
      }

      if (isNodeMove) {
        // Remove moved node at old position
        this.$root.$emit('remove:node', node, () => {
          // Insert moved node into new position
          self.insertNode(predecessorId, node, true)
        })
      } else {
        // Insert new node
        this.insertNode(predecessorId, node, true)
      }
    },

    insertNode(predecessorId, node, selectAfterInserted) {
      const self = this

      const insertIndex = this.findNode(predecessorId) + 1

      // Notify parent of updating flow
      this.$emit('update:flow',
                 this.body.slice(0, insertIndex)
                 .concat([node])
                 .concat(this.body.slice(insertIndex)))

      // Select inserted node
      if (selectAfterInserted) {
        this.$nextTick(() => {
          self.$root.$emit('click:node', node)
        })
      }
    },

    onNodeUpdate(node, callback) {
      // Find index of node to update
      const updateIndex = this.findNode(node.id)

      if (updateIndex === -1) {
        throw new Error(`node (id=${node.id}) not found`)
      }

      // Notify parent of updating flow
      this.$emit('update:flow',
                 this.body.slice(0, updateIndex)
                 .concat(node)
                 .concat(this.body.slice(updateIndex + 1)),
                 callback)
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
