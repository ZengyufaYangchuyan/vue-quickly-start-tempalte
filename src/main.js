import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';
import getBorwserInfo from '../config/borwser';

/**
 * 设置浏览器配置
 */
window.borwserInfo = getBorwserInfo();

/**
 * 当前是否处于产品状态
 * @type {Boolean}
 */
let isProduction = process.env.NODE_ENV === 'production';


Vue.use(VueRouter);

/**
 * 配置是否允许 vue-devtools 检查代码
 * @description 开发版本默认为 true，生产版本默认为 false。
 * 生产版本设为 true 可以启用检查。
 */
Vue.config.devtools = !isProduction;

let vm = new Vue({
  components: {App},
  router,
  template: '<App/>'
});

vm.$mount('#app');
