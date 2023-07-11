<script setup lang="ts">
  import AppMain from "./AppMain.vue";
  import aMenu from "./Menu/menu.vue";
  import aHeader from "./header.vue";
  import aBreadcrumb from "./breadcrumb.vue";

  const collapsed = ref<boolean>(false);
</script>

<template>
  <a-layout class="app-content">
    <!-- 头部 -->
    <a-layout>
      <aHeader></aHeader>
    </a-layout>
    <a-layout class="bottom-content">
      <!-- 侧边栏 -->
      <a-layout-sider width="200" style="background: #fff" v-model:collapsed="collapsed" collapsible>
        <aMenu></aMenu>
      </a-layout-sider>
      <!-- 面包屑和出口 -->
      <a-layout class="paddBox">
        <a-layout-content class="contentBox">
          <aBreadcrumb></aBreadcrumb>
          <AppMain></AppMain>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
  .app-content {
    .ant-layout.ant-layout-has-sider {
      height: 100vh;
    }
    :deep(.ant-layout-sider-trigger) {
      color: rgba(0, 0, 0, 0.85);
      background-color: #fff;
      border-top: 1px solid #f4f4f4;
    }
    .bottom-content {
      padding-top: 50px;
      .paddBox {
        position: relative;
        padding: 0 24px 0;

        .contentBox {
          min-height: 500px;
          overflow-y: auto;
          background: #fff;
          padding: 84px 24px 0 24px;
        }
      }
    }
  }
</style>
