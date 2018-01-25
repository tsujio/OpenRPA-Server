<template>
<div class="variable-panel">
  <span class="title">Variable Table</span>

  <table>
    <thead><th>Name</th><th>Value</th></thead>
    <tbody>
      <template v-for="item in variables">
        <tr>
          <td class="name-cell">{{ item[0] }}</td>
          <td class="value-cell">{{ item[1] }}</td>
        </tr>
      </template>

      <template v-if="isEditingNewVariable">
        <tr>
          <td><mdc-textfield ref="newVariableName" v-model="editingVariable.name" outline
                             @blur="onNewVariableNameFieldBlur" /></td>
          <td></td>
        </tr>
      </template>

      <tr>
        <td class="new-variable-help" colspan="2" @click="onNewVariableClick">New variable</td>
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
      isEditingNewVariable: false,

      editingVariable: {
        name: "",
        value: "",
      },
    }
  },

  methods: {
    onNewVariableClick() {
      const self = this

      this.isEditingNewVariable = true

      Vue.nextTick().then(() => {
        self.$refs.newVariableName.$el.querySelector('input[type="text"]').focus()
      })
    },

    onNewVariableNameFieldBlur() {
      // TODO: check duplicated name

      if (this.editingVariable.name !== "") {
        this.$emit('add:variables', this.editingVariable)
      }

      this.isEditingNewVariable = false
      this.editingVariable = { name: "", value: "" }
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
    padding: 5px 10px;
}

.new-variable-help {
    color: #555;
    text-align: center;
}
</style>
