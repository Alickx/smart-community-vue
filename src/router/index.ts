import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import root from './root';
import { getIsLogin } from '/@/utils/AuthUtil';

//导入生成的路由数据
const router = createRouter({
  history: createWebHistory(),
  routes: root,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

function checkLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  if (getIsLogin()) {
    if (to.query.redirect) {
      next({ path: to.query.redirect as string });
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else if (to.meta.auth) {
      next({ path: '/login', query: { redirect: to.path } });
    } else {
      next();
    }
  }
}

router.beforeResolve((to, _from, next) => {
  // 检查登录
  checkLogin(to, next);
});

export default router;
