import { cleanLocalStorage, getLocal, getToken, readFromLocalStorage, removeToken } from "@/utils/save";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "" || getToken(),
      roleArr: readFromLocalStorage("roleArr"),
      role: [] || readFromLocalStorage("role"), //默认为空,切换角色使用单个角色
      userInfo: readFromLocalStorage("USER")
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
      return state.userInfo;
    },
    getUserName(state) {
      return state.userInfo.username;
    },
    getUserRolesName(state) {
      return state.userInfo.rolesName;
    }
  },
  actions: {
    /**
     * @description 退出登录
     */
    logout() {
      this.token = "";
      this.roleArr = [];
      this.role = [];
      this.userInfo = {};
      removeToken();
      cleanLocalStorage("roleArr");
      cleanLocalStorage("role");
      cleanLocalStorage("USER");
      cleanLocalStorage("asyncRoute");
    }
  }
});
