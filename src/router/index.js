import VueRouter from 'vue-router';
import routes from './routes';

/**
 * 路由模式
 * @type {String}
 * @default 'hash'
 */
const mode = 'hash';

/**
 * 路由实例
 */
const router = new VueRouter({
  mode,
  routes
});

export default router;
