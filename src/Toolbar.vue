<template>
<div class="toolbar">
  <mdc-toolbar fixed>
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start>
        <mdc-toolbar-menu-icon :event="drawerEvent"></mdc-toolbar-menu-icon>
        <mdc-toolbar-title><a href="/" class="title">OpenRPA</a></mdc-toolbar-title>
      </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>
</div>
</template>

<script>
export default {
  name: 'rpa-toolbar',

  props: ['drawerEvent'],
}
</script>

<style lang="scss" scoped>

.title {
    color: black;
    text-decoration: none;
}
</style>
