<template>
<div class="workflow-list-panel">
  <mdc-drawer temporary :toggle-on="drawerEvent">
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
  }
}
</script>

<style lang="scss" scoped>

</style>
