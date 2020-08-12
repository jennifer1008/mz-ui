/**
 * @author jenniferfengFeng
 * Date: 20/07/31
 */
import Button from './index.vue';

Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
