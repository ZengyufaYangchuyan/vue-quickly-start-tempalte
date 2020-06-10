import Vue from 'vue';

/**
 * plugins
 * @description vue中使用到的插件
 */
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import http from './axios';

/**
 * baseFn
 * @description 基础方法
 */
import borwserInfo from '../config/borwser';

/**
 * setting
 * @description vue配置
 */
import router from './router';
import getStore from './vuex';

/**
 * components
 * @description 根组件
 */
import App from './App';

/**
 * vue 用到的插件列表
 */
let vueUsePluginList = [VueRouter, Vuex, http];
vueUsePluginList.forEach(item => {
  Vue.use(item);
});

/**
 * 设置浏览器配置
 */
window.borwserInfo = borwserInfo;

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
  store: getStore(),
  router,
  template: '<App/>'
});

vm.$mount('#app');
