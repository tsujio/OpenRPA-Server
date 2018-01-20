<template>
<div class="image-matching-node">
  {{ name }}
</div>
</template>

<script>
import NodeMixin from './NodeMixin'

export default {
  name: 'rpa-image-matching-node',

  mixins: [NodeMixin],
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.image-matching-node {
    @include node-mixin;
}
</style>
