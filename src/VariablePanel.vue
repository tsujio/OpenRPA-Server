<template>
<div class="variable-panel">
  <span class="title">Variable Table</span>

  <table ref="variableTable">
    <thead><th>Name</th><th>Value</th></thead>
    <tbody>
      <template v-for="(item, index) in variables">
        <tr>
          <td :data-index="index"
              @click="onVariableTableCellClick($event, 'name')">
            <mdc-textfield v-if="isEditing(index, 'name')"
                           :key="item[0] + '-name'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value">{{ item[0] }}</span>
          </td>
          <td :data-index="index"
              @click="onVariableTableCellClick($event, 'value')">
            <mdc-textfield v-if="isEditing(index, 'value')"
                           :key="item[0] + '-value'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value">{{ item[1] || '&nbsp' }}</span>
          </td>
        </tr>
      </template>

      <template v-if="isEditing(-1, 'name')">
        <tr>
          <td><mdc-textfield v-model="editingVariable.nameOrValue"
                             @blur="onEditingTextfieldBlur" /></td>
          <td></td>
        </tr>
      </template>

      <tr>
        <td class="new-variable-help" colspan="2"
            :data-index="-1"
            @click="onVariableTableCellClick($event, 'name')">
          <mdc-icon icon="add"></mdc-icon>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'rpa-variable-panel',

  props: ['variables'],

  data() {
    return {
      editingVariable: {
        // -2:   not editing
        // -1:   editing new variable
        // >= 0: editing variable at the index
        index: -2,

        // 'name' or 'value'
        type: "",

        // value of 'name' or 'value' cell
        nameOrValue: "",
      },
    }
  },

  methods: {
    isEditing(index, type) {
      return this.editingVariable.index === index &&
        this.editingVariable.type === type
    },

    onVariableTableCellClick(e, type) {
      const index = parseInt(e.currentTarget.getAttribute('data-index'))
      this.startEditingVariable(index, type)
    },

    onEditingTextfieldBlur() {
      this.finishEditingVariable()
    },

    startEditingVariable(index, type) {
      const self = this

      // Ignore if now editing
      if (this.editingVariable.index !== -2) {
        return
      }

      var nameOrValue
      if (index === -1) {
        nameOrValue = ""
      } else {
        nameOrValue = this.variables[index][type === 'name' ? 0 : 1]
      }

      // Start editing variable
      this.editingVariable = {
        index: index,
        type: type,
        nameOrValue: nameOrValue,
      }

      Vue.nextTick().then(() => {
        // maybe bad hack
        const textfield = this.$refs.variableTable.querySelector('input[type="text"]')

        self.setEventListeners(textfield)

        textfield.focus()
      })
    },

    setEventListeners(textfield) {
      const self = this

      textfield.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
          if (e.preventDefault) {
            e.preventDefault()
          }
          if (e.stopPropagation) {
            e.stopPropagation()
          }

          const type = self.editingVariable.type
          const index = self.editingVariable.index

          // Finish editing if tab or enter inputted
          self.finishEditingVariable((action) => {
            // In particular condition, continue to edit variable value
            if (e.key === 'Tab' && type === 'name') {
              if (action === 'add' ||
                  action === 'update' ||
                  action === 'none' && index >= 0) {
                const i = action === 'add' ? self.variables.length - 1 : index
                self.startEditingVariable(i, 'value')
              }
            }
          })
        }
      })
    },

    finishEditingVariable(callback = (action) => {}) {
      var action = 'none'

      // Ignore if not editing
      if (this.editingVariable.index === -2) {
        callback(action)
        return
      }

      const variables = JSON.parse(JSON.stringify(this.variables))

      const index = this.editingVariable.index
      const type = this.editingVariable.type
      const nameOrValue = this.editingVariable.nameOrValue

      const isNameDuplicated = type === 'name' &&
            this.variables.some((v) => v[0] === nameOrValue)

      if (!isNameDuplicated) {
        if (index === -1) {
          if (nameOrValue !== "") {
            // Add variable
            variables.push([nameOrValue, ""])
            action = 'add'
          }
        } else {
          if (type === 'name' && nameOrValue === "") {
            // Delete variable
            variables.splice(index, 1)
            action = 'delete'
          } else {
            // Update variable
            variables[index][type === 'name' ? 0 : 1] = nameOrValue
            action = 'update'
          }
        }
      }

      this.$emit('update:variables', variables, () => callback(action))

      // Stop editing variable
      this.editingVariable = {
        index: -2,
        type: "",
        nameOrValue: "",
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import './theme';

.variable-panel {
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
}

.title {
}

table {
    border-collapse: collapse;
    margin-top: 10px;
    width: 100%;
}

th, td {
    padding: 5px 10px;
    box-sizing: border-box;
}

th {
    border: 1px solid $mdc-theme-primary;
    background: $mdc-theme-primary;
    width: 50%;
}

th:not(:last-child) {
    border-right: 1px solid $rpa-background;
}

td {
    border: 1px solid $rpa-background-dark;
    background: white;
}

.cell-value {
    display: inline-block;
    width: 100%;
}

.new-variable-help {
    text-align: center;
    background: $rpa-background-light;
}

.new-variable-help:hover {
    background: $mdc-theme-primary;
}
</style>
