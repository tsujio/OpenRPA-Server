<template>
<div class="image-matching-node" @click.stop="onClick"
     :class="{drag: isDragged}" draggable="true" @dragstart.stop="onDragStart" @dragend.stop="onDragEnd">
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
    @include draggable-node-mixin;
}
</style>
