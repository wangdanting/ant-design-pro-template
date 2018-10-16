// https://umijs.org/zh/guide/router.html
export default [
  {
    path: "/",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  }
];
