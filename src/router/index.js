import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Home from "../views/Home";
import Welcome from "../components/Welcome.vue";
const Users = () => import("../components/user/Users.vue");
const Right = () => import("../components/power/Right.vue");
const Roles = () => import("../components/power/Roles.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: Welcome,
      },
      {
        path: "/users",
        component: Users,
      },
      {
        path: "/rights",
        component: Right,
      },
      {
        path: "/roles",
        component: Roles,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);  to 将要访问的路径
  // console.log(from); from 从哪个路径跳转而来
  // next()放行   next('/xxx')强行跳转至xxx页面

  if (to.path === "/login") {
    return next();
  }
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    return next("/login");
  }
  next();
});
export default router;
