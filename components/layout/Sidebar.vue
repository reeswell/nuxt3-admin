<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { sidebarRoutes } from '~/composables/sidebar'

const route = useRoute()

const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<template>
  <aside class="text-white py-2 pl-2 w-60 fixed flex z-40 top-0 h-screen   overflow-hidden">
    <div class="flex flex-col w-full overflow-hidden bg-primary rounded-2xl">
      <h2 class="bg-[#111827] rounded-t-2xl h-14 flex items-center justify-center text-lg font-bold">xx管理系统</h2>
      <el-scrollbar wrap-class="scrollbar-wrapper" class="w-56 h-full ">
        <el-menu
          active-text-color="var(--c-active-text-color)" background-color="var(--c-primary)"
          text-color="var(--c-text-color)" :default-active="activeMenu" class="h-full"
        >
          <SidebarItem v-for="item in sidebarRoutes" :key="item.path" :item="item" />
        </el-menu>
      </el-scrollbar>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
:deep(.el-scrollbar__view .el-menu){
  border-right: 0;
}
</style>
