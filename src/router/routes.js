import home from 'pages/home';
import notFound from 'pages/notFound';
import moduleOneRouter from 'pages/moduleOne/router';

/**
 * 路由配置
 */
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home,
    children: [
      moduleOneRouter
    ]
  },
  {
    path: '*',
    component: notFound
  }
];

export default routes;
