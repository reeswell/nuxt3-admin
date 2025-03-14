<script setup lang="ts">
defineProps<{ item: Item }>()
interface Item {
  isTitle: boolean
  name: string
  path?: string
  icon: string
  submenu: Array<Item>
}

function renderElIcon(iconName: string) {
  const _iconName = iconName.replace('ElIcon', '')
  return defineAsyncComponent(() =>
    import(`@element-plus/icons-vue`).then(module => module[_iconName as keyof typeof module]),
  )
}
</script>

<template>
  <nuxt-link v-if="item.submenu.length === 0" :to="item.path" class="menu-link">
    <el-menu-item :key="item.path" :index="item.path" class="submenu-title-noDropdown">
      <div class="flex items-center gap-1.5">
        <template v-if="item.icon">
          <el-icon v-if="item.icon.startsWith('ElIcon')">
            <component :is="renderElIcon(item.icon)" />
          </el-icon>
          <svg-icon
            v-else
            :name="item.icon"
            class="inline-flex justify-center items-center w-6 mr-[5px] h-[18px] flex-none aside-menu-item-active font-bold"
          />
        </template>
        <span>{{ item.name }}</span>
      </div>
    </el-menu-item>
  </nuxt-link>
  <template v-else>
    <el-sub-menu :index="item.path">
      <template #title>
        <div class="flex items-center gap-1.5">
          <template v-if="item.icon">
            <el-icon v-if="item.icon.startsWith('ElIcon')">
              <component :is="renderElIcon(item.icon)" />
            </el-icon>
            <svg-icon
              v-else
              :name="item.icon"
              class="inline-flex justify-center items-center w-6 mr-[5px] h-[18px] flex-none aside-menu-item-active font-bold"
            />
          </template>
          <span>{{ item.name }}</span>
        </div>
      </template>
      <nuxt-link v-for="sub in item.submenu" :key="sub.path" :to="sub.path" class="menu-link ">
        <el-menu-item :index="sub.path" >
          <div class="w-full flex items-center gap-1.5 pl-8">
            <template v-if="sub.icon">
              <el-icon v-if="sub.icon.startsWith('ElIcon')">
                <component :is="renderElIcon(sub.icon)" />
              </el-icon>
              <svg-icon
                v-else
                :name="sub.icon"
                class="inline-flex justify-center items-center w-6 mr-[5px] h-[18px] flex-none aside-menu-item-active font-bold"
              />
            </template>
            <span>{{ sub.name }}</span>
          </div>
        </el-menu-item>
      </nuxt-link>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
.menu-link {
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }

  :deep(.el-menu-item) {
    width: 100%;
  }
}
</style>
