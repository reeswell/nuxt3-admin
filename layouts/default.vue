<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Header from '~/components/layout/Header.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import ModalContainer from '~/components/modal/ModalContainer.vue'

// const router = useRouter()

const isSidebarCollapsed = ref(false)

// router.beforeEach(() => {
//   isSidebarCollapsed.value = true
// })

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

// 应用容器
.app-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page, #f5f7fa);

  // 确保所有过渡效果同步
  --transition: transform $transition-duration $transition-timing;
}

// 侧边栏
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: $sidebar-width;
  height: 100%;

  // 使用transform代替left
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

// 主容器包装 - 关键改变：使用transform代替margin
.main-wrapper {
  position: relative;
  margin-left: 0; // 不使用margin过渡
  padding-left: $sidebar-width; // 使用padding代替
  min-height: 100vh;

  // 关键：使用transform代替margin-left，保持与侧边栏同步
  transform: translateX(0);
  transition: var(--transition), padding $transition-duration $transition-timing;

  // 折叠状态
  .sidebar-collapsed & {
    padding-left: $collapsed-width;
    transform: translateX(0); // 保持不变
  }
}

// 头部
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

  // 折叠状态
  .sidebar-collapsed & {
    width: 100%;
    transform: translateX(0);
  }

  // 折叠按钮
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

// 主内容区域
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

// 其他样式
.iframe-scoped {

  /* 所有样式自动添加作用域 */
  :deep(.bom-li .bom-span a) {
    color: #c00;
  }
}
</style>
