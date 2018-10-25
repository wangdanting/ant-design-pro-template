// https://umijs.org/zh/guide/router.html
export default [
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  },
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    authority: ["admin", "user"],
    routes: [
      { path: "/", redirect: "/form/basic-form" },
      {
        path: "/form",
        icon: "form",
        name: "form",
        routes: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: "./Forms/BasicForm"
          }
        ]
      },
      {
        component: "./Exception/404"
      }
    ]
  }
];
