import Vue from 'vue';
import App from './App';

/**
 * 当前是否处于产品状态
 * @type {Boolean}
 */
let isProduction = process.env.NODE_ENV === 'production';

/**
 * 配置是否允许 vue-devtools 检查代码
 * @description 开发版本默认为 true，生产版本默认为 false。
 * 生产版本设为 true 可以启用检查。
 */
Vue.config.devtools = !isProduction;

let vm = new Vue({
  components: {App},
  template: '<App/>'
});

vm.$mount('#app');
