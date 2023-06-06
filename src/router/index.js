import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Random from "../components/Random.vue";
import DogCeo from "../components/DogCeo.vue";


const routes = [
  {
    path: `${import.meta.env.VITE_BASE_URL}/`,
    name: "Home",
    component: Home,
  },
  {
    path: `${import.meta.env.VITE_BASE_URL}/random`,
    name: "Random",
    component: Random,
  },
  {
    path: `${import.meta.env.VITE_BASE_URL}/dogceo`,
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
