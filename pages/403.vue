<script setup>
definePageMeta({
  layout: 'error',
})
</script>

<template>
  <div class="error-page">
    <h1>403</h1>
    <h2>访问被拒绝</h2>
    <p>很抱歉,您没有权限访问此页面。</p>
    <NuxtLink to="/">返回首页</NuxtLink>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin-bottom: 0;
}

h2 {
  font-size: 2rem;
  margin-top: 0;
}

a {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
