<template>
<div class="workflow-panel">
  <div class="navigation">
    <mdc-textfield :value="workflow.name" @input="onNameUpdate" label="Title" outline />

    <mdc-menu-anchor>
      <mdc-button @click="$refs.menu.show()"><mdc-icon icon="settings"></mdc-icon></mdc-button>
      <mdc-menu ref="menu" @select="onMenuSelect">
        <mdc-menu-item :disabled="!workflow.id"><mdc-icon icon="delete"></mdc-icon> Delete</mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>

    <mdc-dialog ref="deleteConfirmDialog"
                title="Confirmation" accept="Delete" cancel="Cancel"
                @accept="$emit('delete:workflow')">
      Delete this workflow?
    </mdc-dialog>
  </div>

  <rpa-workflow-canvas :workflow="workflow"
                       @update:node="onNodeUpdate"
                       @click:savebutton="$emit('click:savebutton')" />
</div>
</template>

<script>
import WorkflowCanvas from './WorkflowCanvas'

export default {
  name: 'rpa-workflow-panel',

  components: {
    'rpa-workflow-canvas': WorkflowCanvas,
  },

  props: ['workflow'],

  computed: {
    isNewWorkflow() {
      return !this.workflow.id
    },
  },

  methods: {
    onNameUpdate(name) {
      this.$emit('update:name', name)
    },

    onNodeUpdate(node, callback) {
      // Find index of node to update
      var updateIndex = -1
      for (let i = 0; i < this.workflow.body.length; i++) {
        if (this.workflow.body[i].id === node.id) {
          updateIndex = i
          break
        }
      }

      if (updateIndex === -1) {
        throw new Error(`node (id=${node.id}) not found`)
      }

      // Notify to parent
      this.$emit('update:body',
                 this.workflow.body.slice(0, updateIndex)
                 .concat(node)
                 .concat(this.workflow.body.slice(updateIndex + 1)),
                 callback)
    },

    onMenuSelect(selected) {
      switch (selected.index) {
      case 0: this.$refs.deleteConfirmDialog.show(); break;
      }
    },
  },
}
</script>

<style scoped>
.navigation {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.mdc-simple-menu {
    top: 0px !important;
    right: 0px !important;
    left: auto !important;
    bottom: auto !important;
}

.workflow-panel {
    height: calc(100vh - 64px);
    margin-left: 200px;
    padding: 10px 20px;
    margin-right: 300px;
    overflow: auto;
    box-sizing: border-box;
}
</style>
