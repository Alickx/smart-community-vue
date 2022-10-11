export default [
  {
    path: '/',
    component: () => import('/@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('/@/views/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  }
];
