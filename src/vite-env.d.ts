/// <reference types="vite/client" />
// * ts识别.vue文件
declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}