<template>
<div class="flow">
  <rpa-successor-drop-area :predecessor-id="null" @successordrop="onSuccessorDrop" />

  <template v-for="node in body">
    <rpa-image-matching-node :key="node.id" v-if="node.type === 'ImageMatching'"
                             :id="node.id" :type="node.type" :displayType="node.displayType"
                             :name.sync="node.name" />

    <rpa-successor-drop-area :predecessor-id="node.id" @successordrop="onSuccessorDrop" />
  </template>
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import SuccessorDropArea from './SuccessorDropArea'
import ImageMatchingNode from './ImageMatchingNode'

export default {
  name: 'rpa-flow',

  components: {
    'rpa-successor-drop-area': SuccessorDropArea,
    'rpa-image-matching-node': ImageMatchingNode,
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

      if (predecessorId === null) {
        this.$emit('update:body', [node].concat(this.body))
        return
      }

      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].id === predecessorId) {
          this.$emit('update:body',
                     this.body.slice(0, i + 1)
                     .concat([node])
                     .concat(this.body.slice(i + 1)))
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
