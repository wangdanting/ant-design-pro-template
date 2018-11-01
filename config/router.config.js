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
          },
          {
            path: "/form/step-form",
            name: "stepform",
            component: "./Forms/StepForm",
            hideChildrenInMenu: true,
            routes: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: "./Forms/StepForm/Step1"
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: "./Forms/StepForm/Step2"
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: "./Forms/StepForm/Step3"
              }
            ]
          },
          {
            path: "/form/advanced-form",
            name: "advancedform",
            component: "./Forms/AdvancedForm"
          }
        ]
      },
      {
        component: "./Exception/404"
      }
    ]
  }
];
