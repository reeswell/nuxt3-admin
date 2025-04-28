<script setup lang="ts">
import { sidebarRoutes } from '~/composables/sidebar'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()

const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <aside class="text-white py-2 pl-2 w-60 fixed flex z-40 top-0 h-screen   overflow-hidden">
    <div class="flex flex-col w-full overflow-hidden bg-primary rounded-2xl">
      <h2
        class="bg-[var(--primary-deeper-color)] rounded-t-2xl h-14 flex items-center justify-center text-lg font-bold">
        xx管理系统
      </h2>
      <el-scrollbar wrap-class="scrollbar-wrapper" class="w-full h-full ">
        <el-menu active-text-color="var(--el-color-primary)" background-color="var(--el-color-primary)"
          text-color="var(--el-color-white)" :default-active="activeMenu" class="h-full">
          <SidebarItem v-for="item in sidebarRoutes" :key="item.path" :item="item" :level="1" :top-item="item" />
        </el-menu>
      </el-scrollbar>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
:deep(.el-scrollbar__view .el-menu) {
  border-right: 0;
}
</style>
