<template>
<div class="workflow-panel">
  <div class="navigation">
    <mdc-textfield :value="workflow.name" @input="onNameUpdate" label="Title" outline />

    <mdc-menu-anchor>
      <mdc-button @click="$refs.menu.show()"><mdc-icon icon="settings"></mdc-icon></mdc-button>
      <mdc-menu ref="menu" @select="onMenuSelect">
        <mdc-menu-item data-menu-item-id="delete" :disabled="!workflow.id">
          <mdc-icon icon="delete"></mdc-icon> Delete
        </mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>

    <mdc-dialog ref="deleteConfirmDialog"
                title="Confirmation" accept="Delete" cancel="Cancel"
                @accept="$emit('delete:workflow')">
      Delete this workflow?
    </mdc-dialog>
  </div>

  <rpa-workflow-canvas :workflow="workflow" :is-saving="isSaving"
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

  props: ['workflow', 'isSaving'],

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
      const itemId = selected.item.getAttribute('data-menu-item-id')

      switch (itemId) {
      case 'delete': this.$refs.deleteConfirmDialog.show(); break;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './theme';

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 20px;
}

.mdc-simple-menu {
    top: 0px !important;
    right: 0px !important;
    left: auto !important;
    bottom: auto !important;
}

.workflow-panel {
    height: calc(100vh - #{$rpa-toolbar-height});
    width: calc(100vw - #{$rpa-left-side-panel-width} - #{$rpa-right-side-panel-width});
    margin-left: $rpa-left-side-panel-width;
    padding: 10px 0;
    margin-right: $rpa-right-side-panel-width;
    overflow: auto;
    box-sizing: border-box;
}
</style>
