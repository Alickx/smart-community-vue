export default [
  {
    path: '',
    component: () => import('../layout/common-layout/index.vue'),
    redirect: { name: 'home' },
    children: [
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
        path: 'post/post-edit-editor',
        name: 'post-editor',
        meta: {
          auth: true,
        },
        component: () => import('/@/views/post-edit/index.vue'),
      },
      {
        path: 'post/:id',
        name: 'post-view',
        component: () => import('/@/views/post-info/index.vue'),
      },
      {
        path: 'user/:id',
        name: 'user-home',
        component: () => import('/@/views/user-home/index.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('/@/views/search/index.vue'),
      },
      {
        path: 'notice',
        name: 'notice',
        meta: {
          auth: true,
        },
        component: () => import('/@/views/notice/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/login/index.vue'),
  },
];
