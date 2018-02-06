<template>
<div class="image-matching-node"
     :class="{select: isSelected, drag: isDragged}"
     draggable="true" @dragstart.stop="onDragStart" @dragend.stop="onDragEnd"
     tabindex="0" @focus="onFocus" @keydown.delete.stop="onDeleteKeyDown">
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
    @include selectable-node-mixin;
    @include draggable-node-mixin;
    @include pointer-having-node-mixin;
}
</style>
