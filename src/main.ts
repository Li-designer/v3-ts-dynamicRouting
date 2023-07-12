
import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import BusPlugin from "@/utils/bus";
import 'ant-design-vue/es/message/style/css';
import 'ant-design-vue/es/Spin/style/css';
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(BusPlugin).use(pinia).mount("#app");
