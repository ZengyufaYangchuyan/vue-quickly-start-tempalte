/**
 * 全局前置守卫
 * @param {*} to 即将要进入的目标 路由对象
 * @param {*} from 当前导航正要离开的路由
 * @param {*} next 进行管道中的下一个钩子 如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
 */
const beforeEach = (to, from, next) => {
  console.log(to, from);
  next();
};

/**
 * 全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
 * @param {*} to 即将要进入的目标 路由对象
 * @param {*} from 当前导航正要离开的路由
 */
const afterEach = (to, from) => {
  console.log(to, from);
};

export default {
  beforeEach,
  afterEach
};
