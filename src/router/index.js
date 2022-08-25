import {createRouter, createWebHistory} from 'vue-router'
import userStore from "../store/userStore";


const store = userStore

const router = createRouter({
  history: createWebHistory(),
  base: '/',
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '智慧社区 -智慧社区'
      },
      component: () => import('../pages/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册页面 -智慧社区'
      },
      component: () => import('../pages/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录页面 -智慧社区'
      },
      component: () => import('../pages/login.vue')
    },
    {
      path: '/post/edit/:id',
      name: 'postEdit',
      meta: {
        title: '文章发布/编辑 -智慧社区',
        auth: true
      },
      component: () => import('../pages/postEdit.vue')
    },
    {
      path: '/post/:id(\\d+)',
      name: 'post',
      component: () => import('../pages/post.vue')
    },
    {
      path: '/post/manage',
      name: 'postManagement',
      meta: {
        title: '文章管理 -智慧社区',
        auth: true
      },
      component: () => import('../pages/postManagement.vue')
    },
    {
      path: '/user/:id(\\d+)',
      name: 'user',
      meta: {
        title: '用户主页 -智慧社区',
      },
      component: () => import('../pages/user.vue'),
      children: [
        {
          path: ':type',
          name: 'userDetail',
          component: () => import('../components/user/UserDetail.vue'),
        }
      ],
    },
    {
      path: '/user/setting',
      name: 'userSetting',
      meta: {
        title: '个人设置 -智慧社区',
        auth: true
      },
      component: () => import('../pages/setting.vue'),
      children: [
        {
          path: 'profile',
          name: 'userProfile',
          meta: {
            title: '个人资料 -智慧社区',
            auth: true
          },
          component: () => import('../components/user/UserSettingProfile.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        title: '搜索 -智慧社区'
      },
      component: () => import('../pages/search.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      meta: {
        title: '通知 -智慧社区',
        auth: true
      },
      redirect: '/notification/thumb',
      component: () => import('../pages/notification.vue'),
      children: [
        {
          path: 'comment',
          meta: {
            title: '回复通知 -智慧社区',
            auth: true
          },
          name: 'commentRemind',
          component: () => import('../components/notification/CommentRemind.vue')
        },
        {
          path: 'thumb',
          meta: {
            title: '点赞通知 -智慧社区',
            auth: true
          },
          name: 'thumbRemind',
          component: () => import('../components/notification/ThumbRemind.vue')
        },
        {
          path: 'system',
          meta: {
            title: '系统通知 -智慧社区',
            auth: true
          },
          name: 'systemRemind',
          component: () => import('../components/notification/SystemRemind.vue')
        }
      ]
    },
    {
      path: '/:w+',
      name: '404',
      meta: {
        title: '您所访问的页面丢失了噢 -智慧社区'
      },
      component: () => import('../pages/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.getters.getIsLogin) {
      document.title = to.meta.title || document.title || "正在加载..."
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    document.title = to.meta.title || document.title || "正在加载..."
    next()
  }
});

export default router
