<template>
<div class="image-matching-node" @click="onClick">
  {{ name }}
</div>
</template>

<script>
import NodeMixin from './NodeMixin'

export default {
  name: 'rpa-image-matching-node',

  mixins: [NodeMixin],

  props: ['imageUrlPath', 'startPos', 'endPos', 'actionPos', 'action',
          'windowTitle', 'timeout'],
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.image-matching-node {
    @include node-mixin;
}
</style>
