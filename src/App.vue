<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="drawerEvent" />
    <rpa-drawer :drawer-event="drawerEvent" />
    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel />
      <rpa-right-side-panel>
        <rpa-node-property-panel slot="upper"
                                 :node="nodeToConfigureProperty"
                                 @update:node="onNodePropertyUpdate" />
        <rpa-variable-panel slot="lower" />
      </rpa-right-side-panel>
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
import Toolbar from './Toolbar'
import Drawer from './Drawer'
import NodePalette from './NodePalette'
import WorkflowPanel from './WorkflowPanel'
import RightSidePanel from './RightSidePanel'
import NodePropertyPanel from './NodePropertyPanel'
import VariablePanel from './VariablePanel'

export default {
  name: 'app',

  components: {
    'rpa-toolbar': Toolbar,
    'rpa-drawer': Drawer,
    'rpa-node-palette': NodePalette,
    'rpa-workflow-panel': WorkflowPanel,
    'rpa-right-side-panel': RightSidePanel,
    'rpa-node-property-panel': NodePropertyPanel,
    'rpa-variable-panel': VariablePanel,
  },

  data() {
    return {
      drawerEvent: 'toggle-drawer',
      nodeToConfigureProperty: null,
    }
  },

  created() {
    var self = this;

    this.$root.$on('node.click', function(node) {
      self.nodeToConfigureProperty = node
    })
  },

  methods: {
    onNodePropertyUpdate(node) {
      this.$root.$emit('update:nodeproperty', node)
    },
  }
}
</script>
