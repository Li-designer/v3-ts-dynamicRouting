import FontIcon from "./FontIcon/index.vue";
// 组件全局注册
const components = [FontIcon];
const componentsPlugin: any = {
  install: (app: any) => {
    components.forEach(item => {
      app.component(item, item);
    });
  }
};

export default componentsPlugin;
