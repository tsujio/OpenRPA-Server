<template>
<div class="if-node"
     :class="{select: isSelected, drag: isDragged}"
     draggable="true" @dragstart.stop="onDragStart" @dragend.stop="onDragEnd"
     tabindex="0" @focus="onFocus" @keydown.delete.stop="onDeleteKeyDown">

  <rpa-condition-node>
    <span slot="name">{{ name }}</span>
  </rpa-condition-node>

  <div class="flow-container">
    <div class="body-flow then">
      <span class="flow-label">Then</span>
      <rpa-flow :body="thenFlow" @update:flow="onThenFlowUpdate" />
    </div>
    <div class="body-flow else">
      <span class="flow-label">Else</span>
      <rpa-flow :body="elseFlow" @update:flow="onElseFlowUpdate" />
    </div>
  </div>
</div>
</template>

<script>
import NodeMixin from './NodeMixin'
import ConditionNode from './ConditionNode'

export default {
  name: 'rpa-if-node',

  mixins: [NodeMixin],

  components: {
    'rpa-condition-node': ConditionNode,
  },

  props: ['thenFlow', 'elseFlow'],

  methods: {
    onThenFlowUpdate() {
      this.onBodyUpdate('then', ...arguments)
    },

    onElseFlowUpdate() {
      this.onBodyUpdate('else', ...arguments)
    },

    onBodyUpdate(type, body, callback) {
      const json = this.toJSON()

      if (type === 'then') {
        json.thenFlow = body
      } else {
        json.elseFlow = body
      }

      this.$emit('update:node', json, callback)
    },
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.if-node {
    @include container-node-mixin;
    @include selectable-node-mixin;
    @include draggable-node-mixin;
    @include pointer-having-node-mixin;

    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    cursor: move;
    padding: 20px 40px;
}

.flow-label {
    display: block;
    width: $node-width;
    text-align: center;
}

.flow-container {
    display: flex;
    flex-direction: row;
    margin-top: $node-interval;
}

.body-flow {
    align-self: flex-start;
    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    padding: 10px 20px;
    text-align: center;
}

.body-flow.else {
    margin-left: 40px;
}
</style>
