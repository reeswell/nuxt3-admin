<script setup lang="ts">
function initTheme() {
  const { resetTheme } = useTheme()
  if (!localStorage.getItem('theme')) {
    resetTheme()
  }
}
onMounted(() => {
  initTheme()
})
</script>
<template>
  <slot />
</template>
