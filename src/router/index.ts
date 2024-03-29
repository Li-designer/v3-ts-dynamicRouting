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
  {
    path: "/",
    name: "LoginPage",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Page",
    meta: { title: "登录" },
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: LayOut,
    redirect: "/home/page",
    children: [
      {
        path: "/home/page",
        name: "HomePage",
        meta: {
          title: "主页",
          icon: "HeatMapOutlined",
          rank: 1,
          showParent: false,
          keepAlive: false
        },
        component: () => import("@/views/Home/index.vue")
      }
    ]
  },
  {
    path: "/dashBoard",
    name: "DashBoard",
    component: LayOut,
    redirect: "/dashBoard/page",
    children: [
      {
        path: "/dashBoard/page",
        name: "DashBoardPage",
        meta: {
          title: "数据面板",
          icon: "PieChartOutlined",
          rank: 2,
          showParent: false,
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
