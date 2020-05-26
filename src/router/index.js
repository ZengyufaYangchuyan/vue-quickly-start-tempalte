import VueRouter from 'vue-router';
import routes from './routes';
import navigationGuard from './navigationGuard';

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

/**
 * 全局路由守卫
 */
let navigationGuardKeys = Object.keys(navigationGuard);
for (let i = 0; i < navigationGuardKeys.length; i++) {
  let item = navigationGuardKeys[i];
  router[`${item}`] && router[`${item}`](navigationGuard[`${item}`]);
}

export default router;
