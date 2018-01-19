<template>
<div class="node-class" draggable="true" @dragstart="onDragStart">
  <span>{{ displayType }}</span>
</div>
</template>

<script>
export default {
  name: 'rpa-node-class',

  props: ['type', 'displayType'],

  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('text', JSON.stringify({
        type: this.type,
        displayType: this.displayType,
      }))
    }
  }
}
</script>

<style scoped >
.node-class {
    background: #eeeeef;
    border: 1px solid #346789;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.8em;
    cursor: move;
    width: 150px;
    height: 40px;
    margin-top: 10px;
}
</style>
