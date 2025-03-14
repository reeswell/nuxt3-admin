<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import Header from '~/components/layout/Header.vue'

const router = useRouter()

const isAsideExpanded = ref(true)
router.beforeEach(() => {
  isAsideExpanded.value = false
})
function toggleSidebar() {
  isAsideExpanded.value = !isAsideExpanded.value
}
</script>

<template>
  <div class="layout">
    <div :class="{ 'overflow-hidden lg:overflow-visible': isAsideExpanded }">
      <div
        class="flex pt-14 bg-[#f9fafb] min-h-screen w-full transition-all "
        :class="isAsideExpanded ? 'pl-4' : 'pl-64'"
      >
        <Sidebar :class="[isAsideExpanded ? '-left-64' : 'left-0']" />
        <Header :class="isAsideExpanded ? 'pl-4' : 'pl-64'" class="transition-all ">
          <div class="flex justify-center items-center cursor-pointer" @click.prevent="toggleSidebar">
            <el-icon size="20">
              <component :is="isAsideExpanded ? Expand : Fold" />
            </el-icon>
          </div>
        </Header>

        <div class="main-content ">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iframe-scoped {

  /* 所有样式自动添加作用域 */
  :deep(.bom-li .bom-span a) {
    color: #c00;
  }
}

@media (max-width: 767px) {
  .header-min {
    display: flex;
  }

  .header-iframe,
  .wrapper-iframe {
    display: none;
  }
}

@media (min-width: 767px) {
  .header-min {
    display: none;
  }

  .header-iframe,
  .wrapper-iframe {
    display: block;
  }
}

// 整体布局
.layout {
  background-color: var(--c-background-gray);

  .sidebar {
    background-color: var(--c-primary);
  }

  .main-content {
    padding: 20px;
    padding-left: 0;
    width: 100%;
    overflow-x: hidden; // 如果确定不需要横向滚动

    // 确保所有子元素不会超出容器宽度
    >* {
      max-width: 100%;
    }
  }
}
</style>
