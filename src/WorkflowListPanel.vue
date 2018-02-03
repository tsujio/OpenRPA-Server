<template>
<div class="workflow-list-panel">
  <mdc-drawer temporary :toggle-on="drawerEvent">
    <div class="drawer-header">
      <mdc-title>Workflow Library</mdc-title>

      <mdc-fab icon="add" @click="onAddButtonClick" mini absolute></mdc-fab>
    </div>

    <mdc-drawer-item
       v-for="workflow in workflows" :key="workflow.id"
       :event="'select:workflow'" :event-args="[workflow.id]">
      {{ workflow.name }}
    </mdc-drawer-item>
  </mdc-drawer>
</div>
</template>

<script>
export default {
  name: 'rpa-workflow-list-panel',

  props: ['drawerEvent', 'workflows'],

  data() {
    return {
    }
  },

  created() {
  },

  methods: {
    onAddButtonClick() {
      this.$emit('add:workflow')

      // Close drawer
      this.$root.$emit(this.drawerEvent)
    },
  }
}
</script>

<style lang="scss" scoped>
@import './theme';

.drawer-header {
    height: 100px;
    width: 100%;
    background: $mdc-theme-primary;
    padding: 10px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
