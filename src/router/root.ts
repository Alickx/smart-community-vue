export default [
  {
    path: '/',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/demo',
    component: () => import('@/pages/demo/index.vue'),
  },
];
