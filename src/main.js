import './theme.scss'
import Vue from 'vue'
import VueMDCAdapter from 'vue-mdc-adapter'
import App from './App.vue'

Vue.use(VueMDCAdapter)

new Vue({
  el: '#app',
  render: h => h(App)
})
