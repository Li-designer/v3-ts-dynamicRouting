<script setup lang="ts">
  import subMenu from "./subMenu.vue";
  import { changeIcon } from "@/utils/icon";
  import route from "@/router";
  import { usePerStore } from "@/store/permission";

  const list = ref<menu.MenuList[]>([]);
  /* const list = [
      {
        key: "/dashBoard/page",
        title: "数据面板",
        icon: "PieChartOutlined"
      },
      {
        key: "/home/page",
        title: "主页",
        icon: "HeatMapOutlined"
      }
    ]; */
  const collapsed = ref<boolean>(false);
  const router = useRouter();
  const storePer = usePerStore();
  const filterPath = ["/", "/:pathMatch(.*)", "/login"]; // 不需要处理成菜单的路由
  const state = reactive({
    collapsed: false,
    selectedKeys: ["/dashBoard/page"], // 当前选中的数组
    openKeys: ["/dashBoard/page"], // 当前展开的菜单数组
    preOpenKeys: ["/dashBoard/page"] // 上一个选中的菜单
  });

  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    }
  );

  const filter = storePer.route.filter(item => !filterPath.includes(item.path));
  const getFilterMenu = el => {
    list.value = restMenu(el);
    // 过滤不显示父级菜单
  };
  // 重置路由显示菜单格式
  const restMenu = route => {
    return route.map(el => {
      let children;
      if (el.children && el.children.length > 0) {
        children = restMenu(el.children);
      }
      return {
        key: el.path,
        title: el?.meta?.title || "",
        icon: el?.meta?.icon || "",
        children: children
      };
    });
  };
  getFilterMenu(filter);

  const menuClick = ({ item, key, keyPath }: { item: any; key: string; keyPath: string[] }) => {
    state.selectedKeys = keyPath;
    state.openKeys = keyPath;
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
              <component :is="changeIcon(item.icon)" />
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
