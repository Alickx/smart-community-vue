export default [
  {
    path: '/:categoryName?',
    name: 'home',
    component: () => import('/@/views/home/index.vue'),
  },
  {
    path: '/:categoryName?/:tagName?',
    name: 'home',
    component: () => import('/@/views/home/index.vue'),
  },
  {
    path: '/post/post-edit-editor',
    name: 'post-editor',
    meta: {
      auth: true,
    },
    component: () => import('/@/views/post-edit/index.vue'),
  },
  {
    path: '/post/:id',
    name: 'post-view',
    component: () => import('/@/views/post-info/index.vue'),
  },
  {
    path: '/user/:id',
    name: 'user-home',
    component: () => import('/@/views/user-home/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('/@/views/search/index.vue'),
  },
  {
    path: '/notice',
    name: 'notice',
    meta: {
      auth: true,
    },
    component: () => import('/@/views/notice/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('/@/views/register/index.vue'),
  },
  {
    path: '/auth/activate',
    name: 'user-activate',
    component: () => import('/@/views/user-activate/index.vue'),
  },
  {
    path: '/user/setting',
    name: 'user-setting',
    meta: {
      auth: true,
    },
    component: () => import('/@/views/user-setting/index.vue'),
    children: [
      {
        path: 'post',
        name: 'user-setting-post',
        meta: {
          auth: true,
        },
        component: () => import('/@/views/user-setting/components/post-manage/index.vue'),
      },
      {
        path: 'profile',
        name: 'user-setting-profile',
        meta: {
          auth: true,
        },
        component: () => import('/@/views/user-setting/components/user-profile/index.vue'),
      },
      {
        path: 'follow',
        name: 'user-setting-follow',
        meta: {
          auth: true,
        },
        component: () => import('/@/views/user-setting/components/follow-manage/index.vue'),
      },
    ],
  },
];
