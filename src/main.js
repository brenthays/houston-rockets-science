import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(HighchartsVue)
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
