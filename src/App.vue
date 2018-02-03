<template>
<div class="app">
  <mdc-layout-app>
    <rpa-toolbar :drawer-event="'toggle-drawer'" />

    <rpa-workflow-list-panel :drawer-event="'toggle-drawer'"
                             :workflows="workflows" />

    <main class="content">
      <rpa-node-palette />
      <rpa-workflow-panel :workflow="workflow"
                          @update:name="name => { workflow.name = name }"
                          @update:body="onWorkflowBodyUpdate"
                          @click:savebutton="onSaveButtonClick"
                          @delete:workflow="onDeleteWorkflowRequest" />
      <rpa-right-side-panel>
        <rpa-node-property-panel slot="upper"
                                 :node="nodeToConfigureProperty"
                                 @update:node="onNodePropertyUpdate" />
        <rpa-variable-panel slot="lower"
                            :variables="workflow.variables"
                            @update:variables="onVariablesUpdate" />
      </rpa-right-side-panel>
    </main>

    <mdc-snackbar />
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
      workflow: {},
      nodeToConfigureProperty: null,
    }
  },

  created() {
    var self = this;

    this.$root.$on('select:workflow', function(id) {
      self.loadWorkflow(id)
    })

    this.$root.$on('select:node', function(node) {
      self.nodeToConfigureProperty = node
    })

    this.initializeData()
  },

  methods: {
    initializeData() {
      this.fetchWorkflows()
      this.workflow = this.getEmptyWorkflow()
      this.nodeToConfigureProperty = null
    },

    fetchWorkflows() {
      const self = this

      ajax.get('/workflows')
        .then((workflows) => {
          self.workflows = workflows
        })
        .catch((err) => {
          console.log('Failed to fetch workflows: ', err)

          self.$root.$emit('show-snackbar', {
            message: 'Failed to load workflow list. Please reload page.'
          })
        })
    },

    loadWorkflow(id) {
      const self = this

      ajax.get('/workflows/' + id)
        .then((workflow) => {
          self.workflow = workflow
          self.nodeToConfigureProperty = null
        })
        .catch((err) => {
          console.log('Failed to fetch workflow: ', err)

          self.$root.$emit('show-snackbar', {
            message: 'Failed to load workflow. Please select workflow again.'
          })
        })
    },

    getEmptyWorkflow() {
      return {
        id: '',
        name: 'New Workflow',
        body: [
          {
            id: uuidv4(),
            type: 'Main',
            displayType: "",
            name: "",
            body: [
            ],
          },
        ],
        variables: [],
      }
    },

    onWorkflowBodyUpdate(body, callback) {
      this.workflow.body = body

      this.$nextTick(() => {
        if (callback) {
          callback()
        }
      })
    },

    onSaveButtonClick() {
      const self = this

      if (this.workflow.id) {
        // Update
        ajax.patch('/workflows/' + this.workflow.id, this.workflow)
          .then(() => {
            console.log('Updated workflow: ', self.workflow.id)

            self.$root.$emit('show-snackbar', {message: 'Saved.'})
          })
          .catch((err) => {
            console.log('Failed to save workflow: ', err)

            self.$root.$emit('show-snackbar', {
              message: 'Failed to save workflow. Please try again.'
            })
          })
      } else {
        // Create
        ajax.post('/workflows', this.workflow)
          .then((result) => {
            console.log('Saved workflow: ', result.id)

            self.workflow.id = result.id

            self.fetchWorkflows()

            self.$root.$emit('show-snackbar', {message: 'Saved.'})
          })
          .catch((err) => {
            console.log('Failed to save workflow: ', err)

            self.$root.$emit('show-snackbar', {
              message: 'Failed to save workflow. Please try again.'
            })
          })
      }
    },

    onDeleteWorkflowRequest() {
      const self = this

      if (!this.workflow.id) {
        return
      }

      ajax.delete('/workflows/' + this.workflow.id)
        .then(() => {
          self.initializeData()

          self.$root.$emit('show-snackbar', {message: 'Deleted.'})
        })
        .catch((err) => {
          console.log('Failed to delete workflow: ', err)

          self.$root.$emit('show-snackbar', {
            message: 'Failed to delete workflow. Please try again.'
          })
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
