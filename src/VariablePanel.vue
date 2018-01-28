<template>
<div class="variable-panel">
  <span class="title">Variable Table</span>

  <table ref="variableTable">
    <thead><th>Name</th><th>Value</th></thead>
    <tbody>
      <template v-for="(item, index) in variables">
        <tr>
          <td :data-index="index" :data-type="'name'"
              @click="onVariableTableCellClick($event)">
            <mdc-textfield v-if="editingVariable.index === index &&
                                 editingVariable.type === 'name'"
                           :key="item[0] + '-name'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value">{{ item[0] }}</span>
          </td>
          <td :data-index="index" :data-type="'value'"
              @click="onVariableTableCellClick($event)">
            <mdc-textfield v-if="editingVariable.index === index &&
                                 editingVariable.type === 'value'"
                           :key="item[0] + '-value'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value">{{ item[1] || '&nbsp' }}</span>
          </td>
        </tr>
      </template>

      <template v-if="editingVariable.index === -1">
        <tr>
          <td><mdc-textfield v-model="editingVariable.nameOrValue"
                             @blur="onEditingTextfieldBlur" /></td>
          <td></td>
        </tr>
      </template>

      <tr>
        <td class="new-variable-help" colspan="2"
            :data-index="-1" :data-type="'name'"
            @click="onVariableTableCellClick">
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
        index: -2,
        type: "",
        nameOrValue: "",
      },
    }
  },

  methods: {
    onVariableTableCellClick(e) {
      const self = this

      // Ignore if now editing
      if (this.editingVariable.index !== -2) {
        return
      }

      const elem = e.currentTarget
      const index = parseInt(elem.getAttribute('data-index'))
      const type = elem.getAttribute('data-type')

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
        self.$refs.variableTable.querySelector('input[type="text"]').focus()
      })
    },

    onEditingTextfieldBlur() {
      const variables = JSON.parse(JSON.stringify(this.variables))

      const index = this.editingVariable.index
      const type = this.editingVariable.type
      const nameOrValue = this.editingVariable.nameOrValue

      const isDuplicated = type === 'name' &&
            this.variables.some((v) => v[0] === nameOrValue)

      if (!isDuplicated) {
        if (index === -1) {
          if (nameOrValue !== "") {
            // Add variable
            variables.push([nameOrValue, ""])
          }
        } else {
          if (type === 'name' && nameOrValue === "") {
            // Delete variable
            variables.splice(index, 1)
          } else {
            // Update variable
            variables[index][type === 'name' ? 0 : 1] = nameOrValue
          }
        }

        this.$emit('update:variables', variables)
      }

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
}

.new-variable-help:hover {
    background: $mdc-theme-primary;
}
</style>
