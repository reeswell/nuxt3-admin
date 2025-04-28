<script setup lang="ts">
import type { CommandScopeNames } from '~/composables/command'
import type { SidebarRouteItem } from '~/types'

const props = defineProps<{
  item: SidebarRouteItem
  level: number
  topItem: SidebarRouteItem
}>()

function renderElIcon(iconName: string) {
  const _iconName = iconName.replace('ElIcon', '')
  return defineAsyncComponent(() =>
    import(`@element-plus/icons-vue`).then(module => module[_iconName as keyof typeof module]),
  )
}


function createCommand(scope: string, item: SidebarRouteItem) {
  const { path, name, icon = '' } = item
  return {
    scope,
    name: () => name,
    description: () => name,
    icon: () => icon,
    visible: () => true,
    onActivate: () => navigateTo(path),
  }
}

function registerRoute() {
  const { level, item, topItem } = props
  const { submenu: menus, name: parentName } = item

  if (level === 1) {
    if (!menus?.length) {
      useCommand(createCommand(parentName, item))
      return
    }

    menus
      .filter(sub => !sub.submenu?.length)
      .forEach(sub => useCommand(createCommand(parentName, sub)))

    return
  }

  item.submenu?.forEach(sub =>
    useCommand(createCommand(topItem.name, sub))
  )
}
onMounted(() => {
  registerRoute()
})
</script>

<template>
  <nuxt-link v-if="!item.submenu || item.submenu.length === 0" :to="item.path"
    :target="item.path.startsWith('http') ? '_blank' : undefined" class="menu-link">
    <el-menu-item :key="item.path" :index="item.path" class="submenu-title-noDropdown">
      <div class="flex items-center gap-1.5 text-white ">
        <template v-if="item.icon">
          <el-icon v-if="item.icon.startsWith('ElIcon')">
            <component :is="renderElIcon(item.icon)" />
          </el-icon>
          <svg-icon v-else :name="item.icon"
            class="inline-flex justify-center items-center w-6 mr-[5px] h-[18px] flex-none aside-menu-item-active font-bold" />
        </template>
        <span>{{ item.name }}</span>
      </div>
    </el-menu-item>
  </nuxt-link>
  <template v-else>
    <el-sub-menu :index="item.path">
      <template #title>
        <div class="flex items-center gap-1.5 text-white ">
          <template v-if="item.icon">
            <el-icon v-if="item.icon.startsWith('ElIcon')">
              <component :is="renderElIcon(item.icon)" />
            </el-icon>
            <svg-icon v-else :name="item.icon"
              class="inline-flex justify-center items-center w-6 mr-[5px] h-[18px] flex-none aside-menu-item-active font-bold" />
          </template>
          <span>{{ item.name }}</span>
        </div>
      </template>
      <component :is="sub?.submenu?.length ? 'div' : 'nuxt-link'" v-for="sub in item.submenu"
        :key="sub.path" :to="sub?.submenu?.length ? '' : sub.path"
         class="menu-link">
        <SidebarItem :item="sub" :level="level + 1" :top-item="topItem" />
      </component>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
:deep(.el-sub-menu__title:hover) {
  background-color: var(--el-color-primary-dark-2);
}

:deep(.el-menu-item) {
  width: 100%;
}

:deep(.el-menu-item:hover) {
  background-color: var(--el-color-primary-dark-2);
}

:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-dark-2);
}

.menu-link {

  display: block;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }

}
</style>
