import { type RouteComponent, type RouteLocationNormalized } from "vue-router";

declare global {
  interface toRouteType extends RouteLocationNormalized {
    meta: {
      /* 缓存页面 */
      keepAlive?: Boolean;
      /* 图标 */
      icon?: string;
      /* 排序 */
      rank?: number;
      /* 是否在菜单中显示 */
      isShow?: Boolean;
    };
  }

  /**
   * @description 整体路由配置表（包括完整子路由）
   */
  interface RouteConfigsTable {
    /** 路由地址 `必填` */
    path: string;
    /** 路由名字（保持唯一）`可选` */
    name?: string;
    /** `Layout`组件 `可选` */
    component?: RouteComponent | string;
    /** 路由重定向 `可选` */
    redirect?: string;
    meta?: {
      /** 菜单名称 `必填` */
      title: string;
      /* 是否缓存页面 */
      keepAlive?: Boolean;
      /* 图标 */
      icon?: string;
      /* 排序 */
      rank?: number;
      /* 是否在菜单中显示 */
      isShow?: Boolean;
    };
    /** 子路由配置项 */
    children?: Array<RouteConfigsTable>;
  }

  /**
   * @description obj存储
   */
  interface SaveToLocalStorageParams {
    name: string;
    content: { [key: string | number | symbol]: any };
  }
  /**
   * @description obj存储
   */
  interface SaveToLocalParams {
    name: string;
    content: any;
  }

  /**
   *@description 错误状态码
   */
  type ERROR_CODE = { [key: number]: string };
}
