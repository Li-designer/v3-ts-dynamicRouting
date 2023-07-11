<script setup lang="ts">
  // const selectedKeys1 = ref<string[]>([]);
</script>

<template>
  <a-layout-header class="header">
    <div class="logo">
      <img src="~@/assets/image/feel.png" alt="" class="img" />
      <span>Ant Design Vue3 ts </span>
    </div>
    <!-- <a-menu v-model:selectedKeys="selectedKeys1" theme="light" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-menu-item key="1">nav 1</a-menu-item>
      <a-menu-item key="2">nav 2</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu> -->
  </a-layout-header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: fixed;
    z-index: 3;
    width: 100%;

    .logo {
      @include fh();
      font-weight: 700;
      font-size: 20px;
      @include wh(300px, 50px);
      background-color: #fff;
      .img {
        @include wh(30px, 30px);
        margin-right: 5px;
      }
    }
  }
</style>
