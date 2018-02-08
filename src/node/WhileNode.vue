<template>
<div class="while-node"
     :class="{select: isSelected, drag: isDragged}"
     draggable="true" @dragstart.stop="onDragStart" @dragend.stop="onDragEnd"
     tabindex="0" @focus="onFocus" @keydown.delete.stop="onDeleteKeyDown">

  <rpa-condition-node>
    <span slot="name">{{ name }}</span>
  </rpa-condition-node>

  <rpa-flow :body="body" @update:flow="onBodyUpdate" />
</div>
</template>

<script>
import NodeMixin from './NodeMixin'
import ConditionNode from './ConditionNode'

export default {
  name: 'rpa-while-node',

  mixins: [NodeMixin],

  components: {
    'rpa-condition-node': ConditionNode,
  },

  props: ['body'],

  methods: {
    onBodyUpdate(body, callback) {
      const json = this.toJSON()

      json.body = body

      this.$emit('update:node', json, callback)
    },
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.while-node {
    @include container-node-mixin;
    @include selectable-node-mixin;
    @include draggable-node-mixin;
    @include pointer-having-node-mixin;

    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    cursor: move;
    padding: 10px 40px;
    text-align: center;
}
</style>
