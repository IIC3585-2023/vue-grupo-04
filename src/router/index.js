import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Random from "../components/Random.vue";
import DogCeo from "../components/DogCeo.vue";

const base_url = import.meta.env.VITE_BASE_URL;

const routes = [
  {
    path: `/`,
    name: "Home",
    component: Home,
  },
  {
    path: `/random`,
    name: "Random",
    component: Random,
  },
  {
    path: `/dogceo`,
    name: "DogCeo",
    component: DogCeo,
  },
  // {
  //   path: "/helloworld",
  //   name: "HelloWorld",
  //   component: HelloWorld,
  // },
];

const router = createRouter({
  history: createWebHistory(base_url),
  routes,
});

export default router;
