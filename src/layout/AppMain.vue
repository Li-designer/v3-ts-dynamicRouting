<script setup lang="ts">
  import { routes } from "@/router";

  const keepAliveList = computed(() => {
    return filterKeepAliveRoute(routes);
  });

  // 过滤keepAlive路由
  const filterKeepAliveRoute = (routes: any) => {
    return routes.reduce((acc: any[], cur: { children: any[]; name: any }) => {
      if (cur.children && cur.children.some((child: { meta: { keepAlive: any } }) => child.meta && child.meta.keepAlive)) {
        cur.children
          .filter(item => item.meta.keepAlive)
          .map(el => {
            acc.push(el.name);
          });
      }
      return acc;
    }, []);
  };
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <template v-if="Component">
      <Transition mode="out-in">
        <keep-alive :include="keepAliveList">
          <Suspense>
            <component :is="Component" :key="route.path" />
            <template #fallback> 正在加载... </template>
          </Suspense>
        </keep-alive>
      </Transition>
    </template>
  </router-view>
</template>

<style scoped></style>
