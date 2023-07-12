import httpRequest from "@/service/http";

export function userLogin(data: api.LOGIN) {
  return httpRequest("post", "/expert-adventure/auth/login", { data });
}
