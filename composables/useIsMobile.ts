import { useDebounceFn, useEventListener } from '@vueuse/core'
import { ref } from 'vue'

export function useIsMobile(breakpoint: number = 768) {
  const isMobile = ref(false)

  // 检测是否为移动设备
  const checkMobile = () => {
    isMobile.value = window.innerWidth < breakpoint
  }
  onMounted(() => {
    checkMobile()
  })
  // 防抖处理的checkMobile
  const debouncedCheckMobile = useDebounceFn(checkMobile, 100)
  useEventListener(window, 'resize', debouncedCheckMobile)

  return {
    isMobile,
  }
}
