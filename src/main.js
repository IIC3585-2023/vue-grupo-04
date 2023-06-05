import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

// Navbar: https://www.w3schools.com/howto/howto_js_topnav.asp
