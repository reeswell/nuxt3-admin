<script setup lang="ts">
import ColorRadioGroup from './ColorRadioGroup.vue'
const dialogVisible = defineModel<boolean>('dialogVisible')

const { currentTheme, isDark, updateTheme, resetTheme } = useTheme()


</script>

<template>
  <el-dialog v-model="dialogVisible" title="主题配置" width="640px" draggable :close-on-click-modal="false">
    <el-form label-position="left" :label-width="80">
      <!-- <el-form-item label="暗黑模式">
        <el-switch v-model="isDark" />
      </el-form-item> -->
      <el-form-item label="主色：">
        <el-color-picker v-model="currentTheme.colors.primary" />
        <ColorRadioGroup class="ml-4" v-model="currentTheme.colors.primary" />
      </el-form-item>
      <el-form-item label="消息色：">
        <el-color-picker v-model="currentTheme.colors.info" />
      </el-form-item>
      <el-form-item label="成功色：">
        <el-color-picker v-model="currentTheme.colors.success" />
      </el-form-item>
      <el-form-item label="警告色：">
        <el-color-picker v-model="currentTheme.colors.warning" />
      </el-form-item>
      <el-form-item label="危险色：">
        <el-color-picker v-model="currentTheme.colors.danger" />
      </el-form-item>
      <el-button type="primary" @click="updateTheme(currentTheme)">应用配置</el-button>
      <el-button @click="resetTheme">重置主题</el-button>
    </el-form>
  </el-dialog>
</template>

<style></style>
