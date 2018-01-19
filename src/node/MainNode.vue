<template>
<div class="main-node">
  <div class="body">
    <rpa-start-node />
    <rpa-successor-drop-area :predecessor-id="null" @successordrop="onSuccessorDrop" />

    <template v-for="node in body">
    </template>

    <rpa-end-node />
  </div>
</div>
</template>

<script>
import NodeMixin from './NodeMixin'
import SuccessorDropArea from './SuccessorDropArea'
import StartNode from './StartNode'
import EndNode from './EndNode'

export default {
  name: 'rpa-main-node',

  mixins: [NodeMixin],

  components: {
    'rpa-successor-drop-area': SuccessorDropArea,
    'rpa-start-node': StartNode,
    'rpa-end-node': EndNode,
  },

  props: ['body'],

  methods: {
    onSuccessorDrop(predecessorId, nodeInfo) {
      if (predecessorId === null) {
        this.body.splice(0, 1, this.createNodeInstance(nodeInfo))
        return
      }

      for (let i = 0; i < this.body.length; i++) {
        if (node[i].id === predecessorId) {
          this.body.splice(i + 1, 1, this.createNodeInstance(nodeInfo))
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
