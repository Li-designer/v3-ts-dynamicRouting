<script setup lang="ts">
  import { PieChartOutlined, MailOutlined } from "@ant-design/icons-vue";
  import subMenu from "@/layout/Menu/subMenu.vue";

  const subMenuProp = defineProps({
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  });
  const getMenuInfo = computed(() => subMenuProp.menuInfo);
</script>

<template>
  <a-sub-menu :key="getMenuInfo.key">
    <template #icon><MailOutlined /></template>
    <template #title>{{ getMenuInfo.title }}</template>
    <template v-for="item in getMenuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<style lang="scss" scoped></style>
