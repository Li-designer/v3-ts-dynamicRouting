<script setup lang="ts">
  import subMenu from "./subMenu.vue";
  import { PieChartOutlined } from "@ant-design/icons-vue";
  const list = [
    {
      key: "/dashBoard",
      title: "数据面板"
    },
    {
      key: "",
      title: "主页",
      children: [
        {
          key: "/home",
          title: "主页"
        }
      ]
    }
  ];

  const collapsed = ref<boolean>(false);
  const router = useRouter();
  const state = reactive({
    collapsed: false,
    selectedKeys: ["/dashBoard"],
    openKeys: ["/dashBoard"],
    preOpenKeys: ["/dashBoard"]
  });

  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    }
  );

  const menuClick = ({ item, key, keyPath }) => {
    if (key) {
      router.push(key);
    }
  };
</script>

<template>
  <div class="aMenu">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
      :style="{ height: '100%', borderRight: 0 }"
      @click="menuClick"
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

<style lang="scss" scoped>
  .aMenu {
    padding-top: 20px;
  }
</style>
