<template>
<div class="while-node-property">
  <span class="node-type">{{ node.displayType }}</span>

  <mdc-textfield v-model="node.name"
                 class="node-name" label="Action name" />

    <mdc-textfield v-model="conditionStr"
                 class="condition" label="Condition" />
</div>
</template>

<script>
export default {
  name: 'rpa-while-node-property',

  props: ['initialNode'],

  data() {
    return {
      node: {},
      conditionStr: '',
    }
  },

  created() {
    this.node = this.initialNode.toJSON()
    this.conditionStr = JSON.stringify(this.node.condition)
  },

  updated() {
    try {
      this.node.condition = JSON.parse(this.conditionStr)
    } catch (e) {
      ;
    }

    this.$emit('update:node', this.node)
  },
}
</script>

<style scoped>
.node-type {
    display: block;
}
</style>
