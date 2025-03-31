<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Header from '~/components/layout/Header.vue'
import Sidebar from '~/components/layout/Sidebar.vue'

const isSidebarCollapsed = ref(false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="app-container" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <div class="main-wrapper">
      <Header class="header">
        <div class="toggle-button" @click.prevent="toggleSidebar">
          <el-icon size="20">
            <component :is="isSidebarCollapsed ? Expand : Fold" />
          </el-icon>
        </div>
      </Header>

      <main class="main-content" :class="isSidebarCollapsed ? 'pl-5 ' : 'pl-0'">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
$sidebar-width: 16rem;
$collapsed-width: 0;
$header-height: 3.5rem;
$transition-duration: 0.28s;
$transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

.app-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--c-background-gray, #f5f7fa);

  // 确保所有过渡效果同步
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

  // 折叠状态
  .sidebar-collapsed & {
    transform: translateX(-$sidebar-width);
  }
}

.main-wrapper {
  position: relative;
  margin-left: 0;
  padding-left: $sidebar-width;
  min-height: 100vh;

  transform: translateX(0);
  transition: var(--transition), padding $transition-duration $transition-timing;

  .sidebar-collapsed & {
    padding-left: $collapsed-width;
    transform: translateX(0); // 保持不变
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

  // 使用transform与侧边栏保持同步
  transform: translateX($sidebar-width);
  transition: var(--transition), width $transition-duration $transition-timing;

  .sidebar-collapsed & {
    width: 100%;
    transform: translateX(0);
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

// 媒体查询
@media (max-width: 767px) {
  .sidebar {
    .sidebar-collapsed & {
      transform: translateX(-100%);
    }
  }

  .main-wrapper {
    padding-left: 0;

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
