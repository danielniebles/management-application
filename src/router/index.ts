import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../modules/Home/Home.vue";
import Dashboard from "../modules/Dashboard/Dashboard.vue";
import Login from "../modules/Login/Login.vue";
import Candidate from "../modules/Candidate/Candidate.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/candidate/:id",
    name: "Candidate",
    component: Candidate,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/",
    redirect: { name: "Login" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    return next("/login");
  } else if (to.path === "/login" && loggedIn) {
    return next("/dashboard");
  }
  next();
});

export default router;
