import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Filters from "../components/Filters.vue";
import FiltersPanel from "../components/FiltersPanel.vue";
import CandidateCard from "../components/CandidateCard.vue";
import Dashboard from "../views/Dashboard.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
