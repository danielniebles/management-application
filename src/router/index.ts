import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FiltersPanel from "../modules/Dashboard/components/FiltersPanel.vue";
import CandidateCard from "../modules/Dashboard/components/CandidateCard.vue";
import Dashboard from "../modules/Dashboard/Dashboard.vue";
import Login from "../modules/Login/Login.vue"


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: { name: "Login"}

  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    return next('/login');
  }
  next();
})

export default router;
