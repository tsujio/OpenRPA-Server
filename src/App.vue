<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="'toggle-drawer'" />

    <rpa-workflow-list-panel :drawer-event="'toggle-drawer'"
                             :workflows="workflows" />

    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel :name="workflow.name" :workflow="workflow.body"
                          @update:name="name => { workflow.name = name }"
                          @update:workflow="onWorkflowUpdate"
                          @click:savebutton="onSaveButtonClick" />
      <rpa-right-side-panel>
        <rpa-node-property-panel slot="upper"
                                 :node="nodeToConfigureProperty"
                                 @update:node="onNodePropertyUpdate" />
        <rpa-variable-panel slot="lower"
                            :variables="workflow.variables"
                            @update:variables="onVariablesUpdate" />
      </rpa-right-side-panel>
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
import uuidv4 from 'uuid/v4'
import ajax from './lib/ajax'
import Toolbar from './Toolbar'
import WorkflowListPanel from './WorkflowListPanel'
import NodePalette from './NodePalette'
import WorkflowPanel from './WorkflowPanel'
import RightSidePanel from './RightSidePanel'
import NodePropertyPanel from './NodePropertyPanel'
import VariablePanel from './VariablePanel'

export default {
  name: 'app',

  components: {
    'rpa-toolbar': Toolbar,
    'rpa-workflow-list-panel': WorkflowListPanel,
    'rpa-node-palette': NodePalette,
    'rpa-workflow-panel': WorkflowPanel,
    'rpa-right-side-panel': RightSidePanel,
    'rpa-node-property-panel': NodePropertyPanel,
    'rpa-variable-panel': VariablePanel,
  },

  data() {
    return {
      workflows: [],

      workflow: {
        name: "",
        body: [],
        variables: [],
      },

      nodeToConfigureProperty: null,
    }
  },

  created() {
    var self = this;

    this.fetchWorkflows()

    this.workflow.body = this.getEmptyWorkflow()

    this.$root.$on('select:workflow', function(id) {
      self.loadWorkflow(id)
    })

    this.$root.$on('select:node', function(node) {
      self.nodeToConfigureProperty = node
    })
  },

  methods: {
    fetchWorkflows() {
      const self = this

      ajax.get('/workflows')
        .then((workflows) => {
          self.workflows = workflows
        })
        .catch((err) => {
          console.log('Failed to fetch workflows: ', err)
        })
    },

    loadWorkflow(id) {
      const self = this

      ajax.get('/workflows/' + id)
        .then((workflow) => {
          self.workflow = workflow
        })
        .catch((err) => {
          console.log('Failed to fetch workflow: ', err)
        })
    },

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
      this.workflow.body = workflow

      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },

    onSaveButtonClick() {
      ajax.post('/workflows', this.workflow)
        .then((result) => {
          console.log('Saved workflow: ', result)
        })
        .catch((err) => {
          console.log('Failed to save workflow: ', err)
        })
    },

    onNodePropertyUpdate(node) {
      this.$root.$emit('update:nodeproperty', node)
    },

    onVariablesUpdate(variables, callback) {
      this.workflow.variables = variables

      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },
  }
}
</script>
