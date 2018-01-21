<template>
<div class="image-matching-node-property">
  <span class="node-type">{{ node.displayType }}</span>

  <mdc-textfield v-model="node.name"
                 class="node-name" label="Action name" />

  <mdc-fab icon="camera_alt" mini class="capture-button" @click="onCaptureButtonClick"></mdc-fab>
</div>
</template>

<script>
export default {
  name: 'rpa-image-matching-node-property',

  props: ['initialNode'],

  data() {
    return {
      node: {}
    }
  },

  created() {
    this.node = this.initialNode.toJSON()
  },

  updated() {
    this.$emit('update:node', this.node)
  },

  methods: {
    onCaptureButtonClick() {
    }
  }
}
</script>

<style scoped>

</style>
