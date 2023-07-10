<script setup lang="ts">
  import subMenu from "./subMenu.vue";
  import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from "@ant-design/icons-vue";
  const list = [
    {
      key: "1",
      title: "Option 1"
    },
    {
      key: "2",
      title: "Navigation 2",
      children: [
        {
          key: "2.1",
          title: "Navigation 3",
          children: [{ key: "2.1.1", title: "Option 2.1.1" }]
        }
      ]
    }
  ];

  const collapsed = ref<boolean>(false);
  const selectedKeys = ref(["1"]);
  const openKeys = ref(["2"]);
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
  };
</script>

<template>
  <div style="width: 256px">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped></style>
