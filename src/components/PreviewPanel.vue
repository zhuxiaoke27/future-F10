<template>
  <div class="preview-section">
    <svg
      ref="svgContainer"
      id="infoGraphic"
      width="1200"
      height="800"
      viewBox="0 0 1200 800"
    >
      <!-- SVG内容将通过JavaScript动态生成 -->
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const svgContainer = ref(null)

// 暴露SVG容器给父组件
defineExpose({
  svgContainer
})
</script>
