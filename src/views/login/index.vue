<script setup lang="ts">
  import { userLogin } from "@/api/login";
  import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
  import useRequset from "@/hooks/useRequest";
  import { readFromLocalStorage, saveToLocalStorage, setToken } from "@/utils/save";
  import { useUserStore } from "@/store/user";
  import { RSAdsc, RSAjsc } from "@/utils";

  const router = useRouter();
  const store = useUserStore();
  const formState = reactive<login.FormState>({
    username: "",
    password: "",
    remember: false
  });

  const formValue = readFromLocalStorage("FORMSTATE");
  if (formValue) {
    formState.username = formValue.username;
    formState.password = RSAdsc(formValue.password) as string;
    formState.remember = true;
  }
  /**
   * @description 登录
   * @param values
   */
  const onFinish = async (values: any) => {
    if (values.remember) {
      const form = {
        username: values.username,
        password: RSAjsc(values.password)
      };
      saveToLocalStorage({ name: "FORMSTATE", content: form });
    }
    delete values.remember;
    const { data } = await useRequset(userLogin, { ...values });
    const userInfo = { id: data.id, rolesName: data.roleNames, username: data.username };
    setToken(data.accessToken);
    saveToLocalStorage({ name: "roleArr", content: data.roles });
    saveToLocalStorage({ name: "role", content: data.roles });
    saveToLocalStorage({ name: "USER", content: userInfo });
    store.token = data.accessToken;
    store.roleArr = data.roles;
    store.userInfo = userInfo;
    store.role = data.roles;
    router.push("/dashBoard/page");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });
</script>

<template>
  <div class="loginBox">
    <div class="loginPage">
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码?</a>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">登 录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loginBox {
    @include fcc();
    @include wh(100%, 100vh);
    .loginPage {
      @include fcc();
      @include wh(100%, 800px);
      @include backgroundImage("@/assets/image/bg.svg");
      .login-form {
        width: 280px;
        .login-form-forgot {
          float: right;
        }
        .login-form-button {
          width: 280px;
        }
      }
    }
  }
</style>
