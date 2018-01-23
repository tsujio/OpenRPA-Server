<template>
<div class="while-node" @click.stop="onClick">
  <span class="name">{{ name }}</span>

  <rpa-flow :body="body" @update:body="onBodyUpdate" />
</div>
</template>

<script>
import NodeMixin from './NodeMixin'

export default {
  name: 'rpa-while-node',

  mixins: [NodeMixin],

  props: ['body'],

  methods: {
    onBodyUpdate(body) {
      const json = this.toJSON()

      json.body = body

      this.$emit('update:node', json)
    },
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.while-node {
    @include container-node-mixin;

    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    cursor: move;
    padding: 10px;
    text-align: center;
}

.name {
    display: block;
}
</style>
