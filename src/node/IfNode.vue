<template>
<div class="if-node"
     :class="{select: isSelected, drag: isDragged}"
     draggable="true" @dragstart.stop="onDragStart" @dragend.stop="onDragEnd"
     tabindex="0" @focus="onFocus" @keydown.delete.stop="onDeleteKeyDown">
  <span class="name">{{ name }}</span>

  <div class="flex">
    <div class="flex-item">
      <div class="branch then">
        <span class="branch-label">Then</span>
        <rpa-flow :body="thenFlow" @update:flow="onThenFlowUpdate" />
      </div>
    </div>
    <div class="flex-item">
      <div class="branch else">
        <span class="branch-label">Else</span>
        <rpa-flow :body="elseFlow" @update:flow="onElseFlowUpdate" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NodeMixin from './NodeMixin'

export default {
  name: 'rpa-if-node',

  mixins: [NodeMixin],

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

    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    cursor: move;
    padding: 10px;
    text-align: center;
}

.name,
.branch-label {
    display: block;
}

.flex {
    display: flex;
    flex-direction: row;
}

.branch {
    background: #eeeeef;
    border: 1px solid #346789;
    border-radius: 0.8em;
    padding: 10px;
    text-align: center;
}

.branch.else {
    margin-left: 20px;
}
</style>
