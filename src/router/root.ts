export default [
  {
    path: '/',
    component: () => import('../layout/commonLayout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('/@/views/index.vue'),
      },
      {
        path: '/post/editor',
        name: 'PostEditor',
        component: () => import('/@/views/postEditor/index.vue'),
      },
      {
        path: '/post/:id',
        name: 'PostView',
        component: () => import('/@/views/postView/index.vue'),
      },
      {
        path: '/user/:id',
        name: 'UserHome',
        component: () => import('/@/views/userHome/index.vue'),
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('/@/views/search/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  },
];
