import httpRequest from "@/service/http";

/**
 *
 * @param data
 * @returns
 */
export function userLogin(data: api.LOGIN) {
  return httpRequest("post", "/expert-adventure/auth/login", { data });
}

/**
 *
 * @param params
 * @returns mock数据
 */
export function getAsyncRoute(params: {}) {
  return httpRequest("get", "/apifox/getMenuList", { params });
}
