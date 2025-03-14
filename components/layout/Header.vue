<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { sidebarRoutes } from '~/composables/sidebar'
import { currentUser, signout } from '~/composables/user'
import VersionInfo from '~/components/common/VersionInfo.vue'

const { currentRoute } = useRouter()
const isDropdownVisible = ref(false)

function handleDropdownVisible(visible: boolean) {
  isDropdownVisible.value = visible
}
const title = ref('')
watchEffect(() => {
  sidebarRoutes.value.forEach((item) => {
    if (item.path === currentRoute.value.path) {
      title.value = item.name
    }
    else if (currentRoute.value.path.startsWith(item.path)) {
      const subPath = item.submenu?.find(sub => sub.path === currentRoute.value.path)
      if (subPath) {
        title.value = `${item.name} / ${subPath.name}`
      }
    }
    // else {
    //   title.value = currentRoute.value.meta.title as string
    // }
  })
})
</script>

<template>
  <nav class="header-nav top-0 inset-x-0 fixed  z-30  w-screen lg:w-auto h-14 box-border px-2 py-4 ">
    <div class="flex  justify-between items-center">
      <div class="flex justify-center items-center">
        <slot />
        <div class="ml-4 text-sm text-[#97a8be] hidden sm:block">{{ title }} </div>
      </div>
      <div class="hidden sm:flex sm:justify-center sm:items-center sm:gap-8 text-sm">
        <VersionInfo />
      </div>
      <div class="flex items-center justify-center gap-3 mr-10">
        <el-dropdown @visible-change="handleDropdownVisible">
          <div class="el-dropdown-link focus:outline-none text-primary flex justify-center items-center">
            {{ currentUser?.username || '管理员' }}
            <el-icon
              class="el-icon--right transition-transform duration-300"
              :class="[isDropdownVisible ? 'rotate-0' : '-rotate-90']"
            >
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <div class="flex justify-center items-center gap-1.5" @click="signout">
                  登出 <svg-icon name="signout" class="w-4 h-4" />
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
:deep(.ep-page-header__breadcrumb)  {
  display: none;
}
// HeaderNav样式
.header-nav {
  background-color: var(--c-background-light);
  border-bottom: 1px solid var(--c-border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
