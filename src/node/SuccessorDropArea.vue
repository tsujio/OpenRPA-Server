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
      var nodeInfo = JSON.parse(e.dataTransfer.getData('text'))

      // Notify to parent
      this.$emit('successordrop', this.predecessorId, nodeInfo)

      return false
    },
  }
}
</script>

<style scoped>
.successor-drop-area {
    width: 150px;
    height: 20px;
    margin: auto;
}

.successor-drop-area.emphasized {
    height: 80px;
}
</style>
