import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: () => import('../pages/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '登录'
      },
      component: () => import('../pages/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('../pages/login.vue')
    },
    {
      path: '/post/edit',
      name: 'postEdit',
      meta: {
        title: '文章发布/编辑'
      },
      component: () => import('../pages/postedit.vue')
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post',
      component: () => import('../pages/post.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../pages/shop.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../pages/user.vue'),
      children:[
        {
          path: ':type',
          name:'userDetail',
          component: ()=> import('../components/user/UserDetail.vue')
        }
      ],
    },
    {
      path: '/user/setting',
      name: 'userSetting',
      component:()=> import('../pages/setting.vue'),
      children:[
        {
          path: 'profile',
          name: 'userProfile',
          component: ()=> import('../components/user/UserSettingProfile.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: ()=> import('../pages/search.vue')
    }
  ]
})

// const defaultTitle = '主页';
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title ? to.meta.title : defaultTitle;
//   next();
// });

export default router
