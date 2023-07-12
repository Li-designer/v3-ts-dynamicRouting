<script setup lang="ts"></script>

<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>List</a-breadcrumb-item>
    <a-breadcrumb-item>App</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>
  .breadcrumb {
    @include fh();
    position: absolute;
    left: 24px;
    top: 0;
    margin: 16px 0;
    padding-left: 16px;
    max-width: 1093px;
    height: 60px;
    background-color: #fff;
  }
</style>
