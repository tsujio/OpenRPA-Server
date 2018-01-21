<template>
<div class="main-node">
  <rpa-start-node />

  <rpa-flow :body="body" @update:body="onBodyUpdate" />

  <rpa-end-node />
</div>
</template>

<script>
import NodeMixin from './NodeMixin'
import StartNode from './StartNode'
import EndNode from './EndNode'
import Flow from './Flow'

export default {
  name: 'rpa-main-node',

  mixins: [NodeMixin],

  components: {
    'rpa-start-node': StartNode,
    'rpa-end-node': EndNode,
    'rpa-flow': Flow,
  },

  props: ['body'],

  methods: {
    onBodyUpdate(body) {
      this.$emit('update:node',
                 [{name: 'id', value: this.id}],
                 {name: 'body', value: body})
    },
  },
}
</script>

<style scoped>

</style>
