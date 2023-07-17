import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./router";
import { getToken } from "@/utils/save";
import { useUserStore } from "./store/user";
import { usePerStore } from "./store/permission";

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
router.beforeEach(async (to: toRouteType, from, next) => {
  const hasToken = getToken();

  // ! 权限
  NProgress.start();

  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    if (hasToken) {
      const store = useUserStore();
      const perStore = usePerStore();
      const role = store.getRole;
      if (!perStore.getAsyncRoute.length) {
        try {
          await perStore.getRoute(role);
          next({ ...to, replace: true });
        } catch (error) {
          console.error(error);
          next(`/login?redirect=${to.path}`);
        }
      } else {
        next();
      }
    } else if (!hasToken) {
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(to => {
  NProgress.done();
  document.title = getPageTitle(to.meta.title);
});
