import axios from "axios";
import { RESTFUL_ERROR_CODE_MAP } from "@/utils";
import { message,Spin } from "ant-design-vue";
import { getToken, removeToken } from "@/utils/save";
import router from "@/router";
// const BASE_URL = import.meta.env.VITE_PUBLIC_PATH;
const instance = axios.create({
  // baseURL: BASE_URL,
  timeout: 6000,
  headers: {
    timestamp: new Date().getTime(),
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;chareset=UTF-8"
  }
});

instance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const code = Number(response.data.statusCode);
    const msg: string = RESTFUL_ERROR_CODE_MAP[code];
    if (msg) {
      if (code !== 200) {
        setTimeout(() => {
          message.error(response.data.message);
        }, 500);
      }
      return Promise.reject(new Error(response.data.message || msg));
    } else {
      return response.data;
    }
  },
  thrown => {
    const status = thrown.response.status;
    const msg: string = RESTFUL_ERROR_CODE_MAP[status];
    console.log(thrown,'thrown');

    if (status === 403) {
      setTimeout(() => {
        message.error("token已过期请重新登录");
      }, 500);
      removeToken();
      router.push("/login");
    } else{
      setTimeout(() => {
        message.error(thrown.response.data.message || msg);
      }, 500);
    }
    return Promise.reject(thrown);
  }
);

export default instance;
