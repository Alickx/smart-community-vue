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
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        title: '登录'
      },
      component: ()=> import('../pages/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        title: '登录'
      },
      component: ()=> import('../pages/login.vue')
    },
    {
      path: '/post/edit',
      name: 'postEdit',
      meta:{
        title: '文章发布/编辑'
      },
      component: ()=> import('../pages/postedit.vue')
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post',
      component: ()=> import('../pages/post.vue')
    }
  ]
})

// const defaultTitle = '主页';
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title ? to.meta.title : defaultTitle;
//   next();
// });

export default router