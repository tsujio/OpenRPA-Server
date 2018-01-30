<template>
<div class="if-node-property">
  <span class="node-type">{{ node.displayType }}</span>

  <mdc-textfield v-model="node.name"
                 class="node-name" label="Action name" />
</div>
</template>

<script>
export default {
  name: 'rpa-if-node-property',

  props: ['initialNode'],

  data() {
    return {
      node: {},
    }
  },

  created() {
    this.node = this.initialNode.toJSON()
  },

  updated() {
    this.$emit('update:node', this.node)
  },
}
</script>

<style scoped>
.node-type {
    display: block;
}
</style>
