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
        name: 'Post',
        component: () => import('/@/views/post/index.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  },
];
