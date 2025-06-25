<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Header from '~/components/layout/Header.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import ModalContainer from '~/components/modal/ModalContainer.vue'
import { useIsMobile } from '~/composables/useIsMobile'

const { isMobile } = useIsMobile()
const isSidebarCollapsed = ref(false)

watch(isMobile, (newValue) => {
  isSidebarCollapsed.value = newValue
}, { immediate: true })

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function handleOverlayClick() {
  if (isMobile.value) {
    isSidebarCollapsed.value = true
  }
}
</script>

<template>
  <div
    class="app-container" :class="{
      'sidebar-collapsed': isSidebarCollapsed,
      'is-mobile': isMobile,
    }"
  >
    <!-- 遮罩层 -->
    <div v-if="isMobile && !isSidebarCollapsed" class="sidebar-overlay" @click="handleOverlayClick" />
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <!-- 主容器 - 使用transform代替margin -->
    <div class="main-wrapper">
      <!-- 头部 -->
      <Header class="header">
        <div class="toggle-button" @click.prevent="toggleSidebar">
          <el-icon size="20">
            <component :is="isSidebarCollapsed ? Expand : Fold" />
          </el-icon>
        </div>
      </Header>

      <!-- 主内容区 -->
      <main class="main-content" :class="isSidebarCollapsed ? 'pl-5 ' : 'pl-0'">
        <slot />
      </main>
    </div>

    <!-- 模态框容器 -->
    <ModalContainer />
  </div>
</template>

<style scoped lang="scss">
// 定义关键变量
$sidebar-width: 16rem; // 256px
$collapsed-width: 0; // 完全折叠
$header-height: 3.5rem; // 56px
$transition-duration: 0.28s; // 保持一致的过渡时间
$transition-timing: cubic-bezier(0.4, 0, 0.2, 1); // 标准的Material Design缓动函数

.app-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page, #f5f7fa);

  --transition: transform $transition-duration $transition-timing;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: $sidebar-width;
  height: 100%;

  transform: translateX(0);
  transition: var(--transition);

  // 使用硬件加速
  transform-style: preserve-3d;
  backface-visibility: hidden;

  .sidebar-collapsed & {
    transform: translateX(-$sidebar-width);
  }
}

.main-wrapper {
  position: relative;
  margin-left: 0;
  padding-left: $sidebar-width;
  min-height: 100vh;

  transition: var(--transition), padding $transition-duration $transition-timing;

  .sidebar-collapsed & {
    padding-left: $collapsed-width;
    transform: translateX(0);
  }
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  width: calc(100% - $sidebar-width);
  height: $header-height;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  left: $sidebar-width;
  transition: var(--transition), width $transition-duration $transition-timing;

  .sidebar-collapsed & {
    width: 100%;
    left: 0;
  }

  .toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0 1rem;
    height: 100%;

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}

.main-content {
  padding-top: calc($header-height + 1rem);
  padding-right: 12px;
  width: 100%;

  // 减少重绘和回流
  contain: content;

  // 确保子元素不会导致溢出
  >* {
    max-width: 100%;
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: opacity 0.3s;
}

.is-mobile {
  .sidebar {
    z-index: 1002;
  }

  &:not(.sidebar-collapsed) {
    .main-wrapper {
      transform: translateX(0);
    }
  }
}
@media (max-width: 767px) {
  .sidebar {
      transform: translateX(-100%);

      .sidebar-collapsed & {
        transform: translateX(-100%);
      }

      .app-container:not(.sidebar-collapsed) & {
        transform: translateX(0);
      }
    }

    .main-wrapper {
      padding-left: 0;
      transform: translateX(0);

      .sidebar-collapsed & {
        padding-left: 0;
      }
    }

  .header {
    width: 100%;
    transform: translateX(0);

    .sidebar-collapsed & {
      transform: translateX(0);
    }
  }

  .header-min {
    display: flex;
  }

  .header-iframe,
  .wrapper-iframe {
    display: none;
  }
}

@media (min-width: 768px) {
  .header-min {
    display: none;
  }

  .header-iframe,
  .wrapper-iframe {
    display: block;
  }
}

.iframe-scoped {

  :deep(.bom-li .bom-span a) {
    color: #c00;
  }
}
</style>
