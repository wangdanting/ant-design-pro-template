// https://umijs.org/zh/guide/router.html
export default [
  {
    path: '/',
    component: '../layouts/UserLayout',
    routes: [
      {path: '/user/login', component: './User/Login'}
    ]
  }
]