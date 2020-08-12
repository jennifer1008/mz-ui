/**
 * @author jenniferfengFeng
 * Date: 20/07/31
 */
import Overlay from './index.vue';

Overlay.install = function (Vue) {
  Vue.component(Overlay.name, Overlay);
};

export default Overlay;