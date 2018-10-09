// https://umijs.org/zh/guide/router.html
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      {path: '/user/login', component: './User/Login'}
    }]
  }
]