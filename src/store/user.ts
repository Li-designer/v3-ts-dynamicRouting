import {
  cleanLocalStorage,
  getLocal,
  getToken,
  readFromLocalStorage,
  removeToken,
} from "@/utils/save";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "" || getToken(),
      roleArr: readFromLocalStorage("roleArr"),
      role: "" || getLocal("role"), //当前角色默认Admin
      userInfo: readFromLocalStorage("USER"),
    };
  },
  getters: {
    getRoleArr(state) {
      return state.roleArr;
    },
    getRole(state) {
      return state.role;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.userInfo
    },
  },
  actions: {
    /**
     * @description 退出登录
     */
    logout() {
      // this.token = "";
      // this.roleArr = [];
      // this.role = "";

      removeToken();
      cleanLocalStorage("tabBar");
    }
  }
});
