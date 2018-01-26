<template>
<div class="variable-panel">
  <span class="title">Variable Table</span>

  <table ref="variableTable">
    <thead><th>Name</th><th>Value</th></thead>
    <tbody>
      <template v-for="(item, index) in variables">
        <tr>
          <td>
            <mdc-textfield v-if="editingVariable.index === index && editingVariable.type === 'name'"
                           :key="item[0] + '-name'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value" :data-index="index" :data-type="'name'"
                  @click="onVariableTableCellClick($event)">{{ item[0] }}</span>
          </td>
          <td>
            <mdc-textfield v-if="editingVariable.index === index && editingVariable.type === 'value'"
                           :key="item[0] + '-value'"
                           v-model="editingVariable.nameOrValue"
                           @blur="onEditingTextfieldBlur" />
            <span v-else class="cell-value" :data-index="index" :data-type="'value'"
                  @click="onVariableTableCellClick($event)">{{ item[1] || '&nbsp' }}</span>
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
        <td class="new-variable-help" colspan="2">
          <span class="cell-value" :data-index="-1" :data-type="'name'"
                @click="onVariableTableCellClick">New variable</span>
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
      
      const index = parseInt(e.target.getAttribute('data-index'))
      const type = e.target.getAttribute('data-type')
      
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

<style scoped>
.variable-panel {
    height: 100%;
    width: 100%;
    padding: 20px 10px;
    background: #eee;
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
    border: 1px solid #aaa;
}

th {
    padding: 5px 10px;
}

.cell-value {
    display: inline-block;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
}

.new-variable-help {
    color: #555;
    text-align: center;
}
</style>
