<template>
  <div class="container">
    <h1>期货通-F10运营图生成器</h1>

    <InputPanel
      ref="inputPanelRef"
      @generate="handleGenerate"
    />

    <PreviewPanel ref="previewPanelRef" />

    <!-- 加载提示 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-box">
        <div class="loading-spinner"></div>
        <div class="loading-text">{{ loadingMessage }}</div>
        <div class="loading-progress">{{ loadingProgress }}</div>
      </div>
    </div>

    <!-- 导出按钮（仅在生成后显示） -->
    <div v-if="hasGenerated" class="export-container">
      <button @click="handleExport" class="export-btn">
        导出为PNG
      </button>
      <button @click="handleExportNoWatermark" class="export-btn export-btn-no-watermark">
        导出为PNG（无水印）
      </button>
      <button @click="handleExportCompressed" class="export-btn export-btn-compressed">
        导出压缩版（&lt;900KB）
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputPanel from './components/InputPanel.vue'
import PreviewPanel from './components/PreviewPanel.vue'
import { useConfig } from './composables/useConfig'
import { useDataParser } from './composables/useDataParser'
import { useSVGRenderer } from './composables/useSVGRenderer'
import { useExport } from './composables/useExport'

const { config, saveConfigToStorage } = useConfig()
const { parseAllData, isLoading, loadingMessage, loadingProgress } = useDataParser()
const { generateInfoGraphic } = useSVGRenderer()
const { exportToPNG, exportCompressedPNG } = useExport()

const inputPanelRef = ref(null)
const previewPanelRef = ref(null)
const parsedData = ref(null)
const hasGenerated = ref(false)

/**
 * 处理生成信息图
 */
const handleGenerate = async () => {
  try {
    // 获取输入数据
    const mainImageFile = inputPanelRef.value.mainImageFile
    const excelFile = inputPanelRef.value.excelFile
    const jsonDataString = inputPanelRef.value.jsonDataInput
    const companyLogosData = inputPanelRef.value.companyLogosInput

    // 解析数据
    const result = await parseAllData({
      dataSource: config.dataSource,
      excelFile,
      jsonDataString,
      mainImageFile,
      companyLogosData
    })

    parsedData.value = result.data
    parsedData.value.mainImageSrc = result.mainImageSrc
    parsedData.value.companyLogosMap = result.companyLogosMap

    // 生成SVG
    const svgContainer = previewPanelRef.value.svgContainer
    generateInfoGraphic(svgContainer, parsedData.value, config)

    hasGenerated.value = true

  } catch (error) {
    console.error('生成信息图时出错:', error)
    alert(error.message || '生成信息图时出错，请检查输入数据')
  }
}

/**
 * 处理导出PNG
 */
const handleExport = async () => {
  if (!previewPanelRef.value || !previewPanelRef.value.svgContainer) {
    alert('请先生成信息图')
    return
  }

  try {
    await exportToPNG(
      previewPanelRef.value.svgContainer,
      'f10-infographic.png',
      true  // 包含水印
    )

    // 导出成功后自动保存配置
    saveConfigToStorage()

    alert('导出成功！\n当前配置已自动保存')
  } catch (error) {
    console.error('导出PNG失败:', error)
    alert('导出失败：' + error.message)
  }
}

/**
 * 处理导出PNG（无水印）
 */
const handleExportNoWatermark = async () => {
  if (!previewPanelRef.value || !previewPanelRef.value.svgContainer) {
    alert('请先生成信息图')
    return
  }

  try {
    await exportToPNG(
      previewPanelRef.value.svgContainer,
      'f10-infographic-no-watermark.png',
      false  // 不包含水印
    )

    // 导出成功后自动保存配置
    saveConfigToStorage()

    alert('导出成功（无水印）！\n当前配置已自动保存')
  } catch (error) {
    console.error('导出PNG失败:', error)
    alert('导出失败：' + error.message)
  }
}

/**
 * 处理导出压缩版PNG（文件大小<900KB）
 */
const handleExportCompressed = async () => {
  if (!previewPanelRef.value || !previewPanelRef.value.svgContainer) {
    alert('请先生成信息图')
    return
  }

  try {
    const result = await exportCompressedPNG(
      previewPanelRef.value.svgContainer,
      'f10-infographic-compressed.jpg',
      true  // 包含水印
    )

    // 导出成功后自动保存配置
    saveConfigToStorage()

    alert(`导出成功！\n文件大小: ${result.sizeKB}KB\n${result.scale < 1 ? `图片缩放比例: ${(result.scale * 100).toFixed(0)}%` : ''}\n\n当前配置已自动保存`)
  } catch (error) {
    console.error('导出压缩PNG失败:', error)
    alert('导出失败：' + error.message)
  }
}
</script>

<style>
/* 加载遮罩 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-box {
  padding: 30px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  text-align: center;
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.loading-progress {
  font-size: 12px;
  color: #666;
}

/* 导出按钮容器 */
.export-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.export-btn {
  background-color: #28a745;
  padding: 12px 24px;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.export-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.export-btn-no-watermark {
  background-color: #007bff;
}

.export-btn-no-watermark:hover {
  background-color: #0056b3;
}

.export-btn-compressed {
  background-color: #ff9800;
}

.export-btn-compressed:hover {
  background-color: #f57c00;
}
</style>
