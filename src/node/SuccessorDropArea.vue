<template>
<div class="successor-drop-area"
     :class="{emphasized: isSuccessorOn}"
     @dragenter="onSuccessorDragEnter"
     @dragover="onSuccessorDragOver"
     @dragleave="onSuccessorDragLeave"
     @drop="onSuccessorDrop">
</div>
</template>

<script>
export default {
  name: 'rpa-successor-drop-area',

  props: ['predecessorId'],

  data() {
    return {
      isSuccessorOn: false,
    }
  },

  methods: {
    onSuccessorDragEnter: function() {
      this.isSuccessorOn = true
    },

    onSuccessorDragOver: function(e) {
      if (e.preventDefault) {
        e.preventDefault()
      }

      return false
    },

    onSuccessorDragLeave: function() {
      this.isSuccessorOn = false
    },

    onSuccessorDrop: function(e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      }
      if (e.preventDefault) {
        e.preventDefault()
      }

      this.isSuccessorOn = false

      if (!e.dataTransfer) {
        return false;
      }

      // Get dropped node info
      try {
        var nodeInfo = JSON.parse(e.dataTransfer.getData('text'))
      } catch (e) {
        console.log("Invalid object dropped: ", e)
        return false
      }

      // Notify to parent
      this.$emit('successordrop', this.predecessorId, nodeInfo)

      return false
    },
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.successor-drop-area {
    min-width: $node-width;
    width: 100%;
    height: $node-interval;
}

.successor-drop-area.emphasized {
    height: calc(#{$node-interval} + #{$node-height});
}
</style>
