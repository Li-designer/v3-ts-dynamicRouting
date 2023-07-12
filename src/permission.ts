import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./router";
import { getToken } from "@/utils/save";

const TITLE = "ant-v3-ts";
NProgress.configure({ showSpinner: false });
const getPageTitle = (key: unknown) => {
  const hasKey = `${key}`;
  if (hasKey) {
    const pageName = key ? `${key}` : "404";
    return `${pageName} - ${TITLE}`;
  }
  return `${TITLE}`;
};

const whiteList: string[] = ["/login"];

/* 权限设置 */
router.beforeEach((to: toRouteType, from, next) => {
  const hasToken = getToken();

  // ! 权限
  NProgress.start();

  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    if (hasToken) {
      if (to.name) {
        next();
      } else if (!to.name) {
        next(`/404?redirect=${to.path}`);
      } else {
        next();
      }
    } else if (!hasToken) {
      next(`/login`);
    }
  }
});

router.afterEach(to => {
  NProgress.done();
  document.title = getPageTitle(to.meta.title);
});
