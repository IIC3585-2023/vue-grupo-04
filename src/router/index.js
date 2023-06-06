import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Random from "../components/Random.vue";
import DogCeo from "../components/DogCeo.vue";

const base_url = import.meta.env.VITE_BASE_URL;

const routes = [
  {
    path: `${base_url}/`,
    name: "Home",
    component: Home,
  },
  {
    path: `${base_url}/random`,
    name: "Random",
    component: Random,
  },
  {
    path: `${base_url}/dogceo`,
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
  history: createWebHistory(),
  routes,
});

export default router;
