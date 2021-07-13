import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FiltersPanel from "../modules/Dashboard/components/FiltersPanel.vue";
import CandidateCard from "../modules/Dashboard/components/CandidateCard.vue";
import Dashboard from "../modules/Dashboard/Dashboard.vue";
import Login from "../modules/Login/Login.vue"


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/filters",
    name: "Filters",
    component: FiltersPanel,
  },
  {
    path: "/card",
    name: "Candidate",
    component: CandidateCard,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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

export default router;
