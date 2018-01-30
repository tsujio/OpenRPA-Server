<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="'toggle-drawer'" />
    <rpa-drawer :drawer-event="'toggle-drawer'" />
    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel :name="robot.name" :workflow="robot.workflow"
                          @update:name="name => { robot.name = name }"
                          @update:workflow="onWorkflowUpdate" />
      <rpa-right-side-panel>
        <rpa-node-property-panel slot="upper"
                                 :node="nodeToConfigureProperty"
                                 @update:node="onNodePropertyUpdate" />
        <rpa-variable-panel slot="lower"
                            :variables="robot.variables"
                            @update:variables="onVariablesUpdate" />
      </rpa-right-side-panel>
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
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
      robot: {
        name: "",
        workflow: [],
        variables: [],
      },

      nodeToConfigureProperty: null,
    }
  },

  created() {
    var self = this;

    this.robot.workflow = this.getEmptyWorkflow()

    this.$root.$on('select:node', function(node) {
      self.nodeToConfigureProperty = node
    })
  },

  methods: {
    getEmptyWorkflow() {
      return [
        {
          id: uuidv4(),
          type: 'Main',
          displayType: "",
          name: "",
          body: [
          ],
        },
      ]
    },

    onWorkflowUpdate(workflow, callback) {
      this.robot.workflow = workflow

      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },

    onNodePropertyUpdate(node) {
      this.$root.$emit('update:nodeproperty', node)
    },

    onVariablesUpdate(variables, callback) {
      this.robot.variables = variables

      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },
  }
}
</script>
