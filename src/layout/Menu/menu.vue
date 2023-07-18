<script setup lang="ts">
  import subMenu from "./subMenu.vue";
  import { changeIcon } from "@/utils/icon";
  import { usePerStore } from "@/store/permission";

  const list = ref<menu.MenuList[]>([]);
  const collapsed = ref<boolean>(false);
  const router = useRouter();
  const storePer = usePerStore();
  const filterPath = ["/", "/:pathMatch(.*)", "/login"]; // 不需要处理成菜单的路由
  const state = reactive<menu.State>({
    collapsed: false,
    selectedKeys: [], // 当前选中的数组
    openKeys: [], // 当前展开的菜单数组
    preOpenKeys: [] // 上一个选中的菜单
  });

  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
      state.selectedKeys = _val;
    }
  );

  const filter = storePer.route.filter(item => !filterPath.includes(item.path));
  const getFilterMenu = el => {
    list.value = restMenu(el);
    // 找出显示父级的数组
    hiddeParentMenu(list.value);
    // 去掉空的父路由
    list.value = list.value.filter(item => item.title && item.icon);
    // 排序
    list.value = list.value.sort((a, b) => a.rank - b.rank);
  };
  const hiddeParentMenu = Array => {
    Array.forEach((element, index) => {
      if (!element.showParent && element.level === 3) {
        list.value.push(element);
      }
      if (element.children && element.children.length) {
        hiddeParentMenu(element.children);
      }
    });
  };
  // 重置路由显示菜单格式
  const restMenu = route => {
    let level;
    return route.map(el => {
      let children;
      level = 3;
      if (el.children && el.children.length > 0) {
        level--;
        children = restMenu(el.children).sort((a, b) => a.rank - b.rank);
      }

      if (children && children.length) {
        return {
          key: el.path,
          title: el?.meta?.title || "",
          icon: el?.meta?.icon || "",
          children: children,
          level: level,
          rank: el?.meta?.rank
        };
      } else {
        return {
          key: el.path,
          title: el?.meta?.title || "",
          icon: el?.meta?.icon || "",
          showParent: el?.meta?.showParent,
          level: level,
          rank: el?.meta?.rank
        };
      }
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
