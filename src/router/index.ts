import { Router, createRouter, createWebHashHistory } from "vue-router";

const LayOut = () => import("@/layout/index.vue");

// 排除的文件 "!./modules/**/remaining.ts",需拼接
/* modules文件下的路由自动导入 */
const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true
});
/**
 * @keepAlive 是否缓存
 */
export const routes = [
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: LayOut,
    redirect: "error/404",
    children: [
      {
        path: "error/404",
        name: "Error",
        meta: { title: "404" },
        component: () => import("@/views/error/NotFound.vue")
      }
    ]
  },
  {
    path: "/",
    name: "Page",
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "Login",
        meta: { title: "登录" },
        component: () => import("@/views/login/index.vue")
      }
    ]
  },
  {
    path: "",
    name: "Home",
    component: LayOut,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "HomePage",
        meta: {
          title: "主页",
          keepAlive: false
        },
        component: () => import("@/views/Home/index.vue")
      }
    ]
  },
  {
    path: "",
    name: "DashBoard",
    component: LayOut,
    redirect: "/dashBoard",
    children: [
      {
        path: "/dashBoard",
        name: "DashBoardPage",
        meta: {
          title: "数据面板",
          keepAlive: false
        },
        component: () => import("@/views/DashBoard/index.vue")
      }
    ]
  }
];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
