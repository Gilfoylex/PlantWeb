<template>
  <div id="app-content">
    <RouterView />
  </div>
</template>

<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';

let currentTheme = null
const onTouchStart = ()=>{
  alert(1)
}

function setThemeClassWithSystem() {
  // 根据 window.matchMedia 设置 setThemeClass
  currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? Themes.dark : null;
  StyleProvider(currentTheme)
}

onMounted(() =>{
  setThemeClassWithSystem()

  //监听系统主题切换
  window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener('change', () => {
    setThemeClassWithSystem()
  })
})

</script>

<style>
/* 修改全局的背景和文字颜色 */
body {
  transition: background-color .25s, color .25s;
  color: var(--color-text);
  background-color: var(--color-body);
  display: flex;
  justify-content: center; /* 水平居中 */
}

#app-content {
  width: 375px;
}
</style>
