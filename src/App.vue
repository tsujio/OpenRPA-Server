<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="drawerEvent" />
    <rpa-drawer :drawer-event="drawerEvent" />
    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel :is-node-property-panel-active="isNodePropertyPanelActive" />
      <rpa-node-property-panel :node="nodeToConfigureProperty" :active="isNodePropertyPanelActive"
                               @update:node="onNodePropertyUpdate"
                               @click:closebutton="onNodePropertyPanelCloseButtonClick" />
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
import Toolbar from './Toolbar'
import Drawer from './Drawer'
import NodePalette from './NodePalette'
import WorkflowPanel from './WorkflowPanel'
import NodePropertyPanel from './NodePropertyPanel'

export default {
  name: 'app',

  components: {
    'rpa-toolbar': Toolbar,
    'rpa-drawer': Drawer,
    'rpa-node-palette': NodePalette,
    'rpa-workflow-panel': WorkflowPanel,
    'rpa-node-property-panel': NodePropertyPanel,
  },

  data() {
    return {
      drawerEvent: 'toggle-drawer',
      nodeToConfigureProperty: null,
    }
  },

  computed: {
    isNodePropertyPanelActive() {
      return this.nodeToConfigureProperty !== null
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

    onNodePropertyPanelCloseButtonClick() {
      this.nodeToConfigureProperty = null
    },
  }
}
</script>
