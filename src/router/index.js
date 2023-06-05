import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Random from "../components/Random.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/random",
    name: "Random",
    component: Random,
  },
  {
    path: "/helloworld",
    name: "HelloWorld",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
