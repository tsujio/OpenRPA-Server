<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="drawerEvent" />
    <rpa-drawer :drawer-event="drawerEvent" />
    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel />
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
import Toolbar from './Toolbar'
import Drawer from './Drawer'
import NodePalette from './NodePalette'
import WorkflowPanel from './WorkflowPanel'

export default {
  name: 'app',

  components: {
    'rpa-toolbar': Toolbar,
    'rpa-drawer': Drawer,
    'rpa-node-palette': NodePalette,
    'rpa-workflow-panel': WorkflowPanel,
  },

  data() {
    return {
      drawerEvent: 'toggle-drawer'
    }
  },
}
</script>
