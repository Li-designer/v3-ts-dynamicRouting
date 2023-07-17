import { saveToLocalStorage, readFromLocalStorage } from "@/utils/save";
import Router from "@/router";
import useRequset from "@/hooks/useRequest";
import { getAsyncRoute } from "@/api/login";
const modules = import.meta.glob("../views/**/**/*.vue");
const layOut = import.meta.glob("../layout/**/**/*.vue");
// 404路由
// 将匹配所有内容并将其放在 `route.params.pathMatch` 下
const pathMathRoute = {
  path: "/:pathMatch(.*)",
  name: "NotFound",
  component: layOut["../layout/index.vue"],
  redirect: "/error/404",
  children: [
    {
      path: "/error/404",
      name: "Error",
      meta: { title: "404" },
      component: modules["../views/error/NotFound.vue"]
    }
  ]
};
export const usePerStore = defineStore("per", {
  state: () => {
    return {
      asyncRoute: [] || readFromLocalStorage("asyncRoute"), // 异步路由
      route: Router.options.routes // 全部路由
    };
  },
  getters: {
    getAsyncRoute(state) {
      return state.asyncRoute;
    }
  },
  actions: {
    // 菜单排序
    ascendingOrder(array: RouteConfigsTable[]) {},
    // 页面对应位置
    handlerDg(item: RouteConfigsTable) {
      if (item.component !== "Layout") {
        item.component = modules[`../views/${item.component}.vue`];
      } else {
        item.component = layOut["../layout/index.vue"];
      }
      if (item.children && item.children.length > 0) {
        item.children?.forEach(element => {
          this.handlerDg(element);
        });
      }
    },
    /**
     * @description 获取异步路由
     */
    async getRoute(role: string[]) {
      const { data } = await useRequset(getAsyncRoute, { role: role || undefined });
      if (data.length > 0) {
        this.asyncRoute = data;
        saveToLocalStorage({ name: "asyncRoute", content: data });
        data.map((v: any) => {
          this.handlerDg(v);
          // path 没有重复
          if (Router.options.routes.findIndex(value => value.path === v.path) === -1) {
            // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
            Router.options.routes.push(v);
            // 最终路由进行升序;
            // 添加路由
            Router.addRoute(v);
            // 添加404路由
            Router.addRoute(pathMathRoute);
            this.route = Router.options.routes;
          }
        });
      }
    }
  }
});
