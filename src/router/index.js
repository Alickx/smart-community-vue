import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'index',
      meta:{
        title: '首页'
      },
      component: ()=> import('../pages/index.vue')
    }
  ]
})

// const defaultTitle = '主页';
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title ? to.meta.title : defaultTitle;
//   next();
// });

export default router
