import './main.scss'
import Vue from 'vue'
import VueMDCAdapter from 'vue-mdc-adapter'
import App from './App.vue'

Vue.use(VueMDCAdapter)

import Flow from './node/Flow'
Vue.component('rpa-flow', Flow)

new Vue({
  el: '#app',
  render: h => h(App)
})
