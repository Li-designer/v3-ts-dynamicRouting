import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import BusPlugin from "@/utils/bus";
import componentsPlugin from "./components";
import "@/permission";
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/Spin/style/css";
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

app.use(router).use(componentsPlugin).use(BusPlugin).use(pinia).mount("#app");
