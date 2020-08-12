/**
 * @author jenniferfengFeng
 * Date: 20/07/31
 */
import Loading from './index.vue';
import Vue from 'vue'

// export default Loading;
let LoadingConstructor = Vue.extend(Loading)
console.log(LoadingConstructor)
LoadingConstructor.prototype.config = function (options) {
  Object.keys(options).forEach((key) => {
    if (key === 'isError' || key === 'totalProgress') {
      return;
    }
    this[key] = options[key]
  })
}
LoadingConstructor.prototype.Show = function (data) {
  this.vm = this.$mount()
  Object.keys(data).forEach((key) => {
    if (key === 'isError' || key === 'totalProgress') {
      return;
    }
    this.vm.$data[key] = data[key]
  })
  document.body.appendChild(this.vm.$el)
  return this
}

LoadingConstructor.prototype.Hide = function () {
    document.body.removeChild(this.vm.$el)
}

let MZLoading = () => {
  return new LoadingConstructor()
}

export default MZLoading()