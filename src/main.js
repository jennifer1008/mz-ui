import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole'
var vConsole = new VConsole()
console.log(vConsole)
Vue.config.productionTip = false
import MZUI from '../components/index'
import '../components/theme-default/lib/index.css'

Vue.use(MZUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
