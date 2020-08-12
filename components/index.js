/**
 * @author jenniferFeng
 * Date: 2020/07/29
 */
import MZButton from './button/index';
import MZDialog from './dialog/index';
import MZLoading from './loading/index';
import MZPopup from './popup/index';
import MZPicker from './picker/index';
import MZOverlay from './overlay/index'
import MZArea from './area'
const components = [
  MZDialog,
  MZButton,
  MZPopup,
  MZPicker,
  MZOverlay,
  MZArea
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  // MetaInfo.install(Vue)
  Vue.prototype.$loading = MZLoading
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MZDialog,
  MZButton,
  MZLoading,
  MZPopup,
  MZPicker,
  MZOverlay,
  MZArea
}