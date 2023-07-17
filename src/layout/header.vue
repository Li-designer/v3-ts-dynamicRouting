<script setup lang="ts">
  import { UserOutlined, LogoutOutlined, RollbackOutlined } from "@ant-design/icons-vue";
  import type { MenuProps } from "ant-design-vue";
  import { useUserStore } from "@/store/user";

  const store = useUserStore();
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    if (e.key === "1") {
      store.logout();
      router.push("/login");
    }
  };
</script>

<template>
  <a-layout-header class="header">
    <div class="logo">
      <img src="~@/assets/image/feel.png" alt="" class="img" />
      <span>Ant Design Vue3 ts </span>
    </div>
    <a-dropdown-button class="dropdown">
      <span>
        {{ store.getUserName }}
        <i class="roles"> ({{ store.getUserRolesName?.join(" | ") }})</i>
      </span>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <rollback-outlined />
            退出登录
          </a-menu-item>
          <a-menu-item key="2">
            <logout-outlined />
            切换角色
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </a-dropdown-button>
  </a-layout-header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: fixed;
    z-index: 3;
    width: 100%;

    .logo {
      @include fh();
      font-weight: 700;
      font-size: 20px;
      height: 50px;
      font-family: "nosifer";
      background-color: #fff;
      .img {
        @include wh(30px, 30px);
        margin-right: 5px;
      }
    }
    .dropdown {
      .roles {
        color: #f85b1b;
      }
    }
  }
</style>
