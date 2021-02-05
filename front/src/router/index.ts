import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/market",
    name: "Market",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Market.vue")
  },
  {
    path: "/trade/:marketId",
    name: "Trade",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Trade.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/asset",
    name: "Asset",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Asset.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
