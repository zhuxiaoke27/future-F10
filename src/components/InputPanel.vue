<template>
  <div class="input-section">
    <!-- 基本信息 -->
    <div class="section-title">基本信息</div>

    <div class="form-group">
      <label for="mainTitleInput">主标题（将显示在最上方）：</label>
      <input
        type="text"
        id="mainTitleInput"
        v-model="config.mainTitle"
        placeholder="请输入主标题"
      >
      <div class="form-hint" style="font-size: 12px; color: #666; margin-top: 5px;">
        提示：使用[[文本]]格式可以对特定文本应用渐变色
      </div>
    </div>

    <div class="form-group">
      <label for="subtitle">副标题（将显示在主标题下方）：</label>
      <input
        type="text"
        id="subtitle"
        v-model="config.subtitle"
        placeholder="请输入副标题"
      >
      <div class="form-hint" style="font-size: 12px; color: #666; margin-top: 5px;">
        提示：使用[[文本]]格式可以对特定文本应用渐变色
      </div>

      <div style="display: flex; align-items: center; margin-top: 10px;">
        <label for="titleFontSize" style="margin-right: 10px; min-width: 120px;">主标题字号：</label>
        <input
          type="range"
          id="titleFontSize"
          min="60"
          max="130"
          v-model.number="config.titleFontSize"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.titleFontSize }}</span>
      </div>

      <div style="display: flex; align-items: center; margin-top: 10px;">
        <label for="subtitleFontSize" style="margin-right: 10px; min-width: 120px;">副标题字号：</label>
        <input
          type="range"
          id="subtitleFontSize"
          min="60"
          max="130"
          v-model.number="config.subtitleFontSize"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.subtitleFontSize }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="textArea">文本区域（显示在副标题和主图片之间）：</label>
      <textarea
        id="textArea"
        v-model="config.textAreaContent"
        placeholder="请输入文本内容；非必须，如不输入则不会在图中显示"
        rows="3"
        style="resize: vertical;"
      ></textarea>

      <div style="display: flex; align-items: center; margin-top: 10px;">
        <label for="textAreaFontSize" style="margin-right: 10px; min-width: 120px;">文本区域字号：</label>
        <input
          type="range"
          id="textAreaFontSize"
          min="20"
          max="60"
          v-model.number="config.textAreaFontSize"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.textAreaFontSize }}</span>
      </div>
    </div>

    <div class="form-group">
      <label for="mainImage">主图片上传（尺寸：995*450）：</label>
      <input
        type="file"
        id="mainImage"
        accept="image/*"
        @change="handleMainImageChange"
      >
      <div class="checkbox-container">
        <input
          type="checkbox"
          id="showMainImage"
          v-model="config.showMainImage"
        >
        <label for="showMainImage" style="margin-bottom: 0; cursor: pointer;">
          展示主图片（取消勾选则不展示主图片）
        </label>
      </div>
    </div>

    <div class="form-group">
      <label for="dataSource">数据输入方式：</label>
      <select id="dataSource" v-model="config.dataSource">
        <option value="excel">Excel文件上传</option>
        <option value="json">JSON数据输入</option>
      </select>
    </div>

    <div class="form-group" v-if="config.dataSource === 'excel'">
      <label for="excelFile">Excel数据文件：</label>
      <input
        type="file"
        id="excelFile"
        accept=".xlsx, .xls"
        @change="handleExcelFileChange"
      >
    </div>

    <div class="form-group" v-if="config.dataSource === 'json'">
      <label for="jsonData">JSON数据输入：</label>
      <textarea
        id="jsonData"
        v-model="jsonDataInput"
        placeholder="请输入JSON格式的数据..."
        rows="10"
        style="resize: vertical; font-family: monospace; font-size: 12px;"
      ></textarea>
      <button type="button" @click="fillSampleJsonData" class="small-btn" style="margin-top: 8px;">
        填充示例JSON数据
      </button>
    </div>

    <div class="form-group">
      <label for="companyLogos">Logo数据（JSON格式）：</label>
      <textarea
        id="companyLogos"
        v-model="companyLogosInput"
        placeholder="粘贴包括名称、logo、URL的JSON数据"
        rows="5"
        style="resize: vertical;"
      ></textarea>
      <div class="flex-container">
        <button type="button" @click="fillSampleLogoData" class="small-btn">
          填充示例数据
        </button>
        <div class="checkbox-container">
          <input
            type="checkbox"
            id="showCompanyLogos"
            v-model="config.showCompanyLogos"
          >
          <label for="showCompanyLogos" style="margin-bottom: 0; cursor: pointer;">
            显示Logo
          </label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="copyright">版权文案（支持多行输入）：</label>
      <textarea
        id="copyright"
        v-model="config.copyright"
        placeholder="请输入版权文案"
        rows="3"
        style="resize: vertical;"
      ></textarea>
    </div>

    <!-- 模板选择 -->
    <div class="section-title">模板选择</div>
    <div class="form-group">
      <label>配色模板：</label>
      <div class="template-selection">
        <button
          v-for="(template, key) in templates"
          :key="key"
          type="button"
          class="template-btn"
          :class="{ active: config.selectedTemplate === key }"
          @click="applyTemplate(key)"
        >
          <div :class="`template-preview ${key}-preview`"></div>
          <span>{{ template.name }}</span>
        </button>
      </div>
    </div>

    <!-- 背景设置 -->
    <div class="section-title">背景设置</div>

    <div class="form-group">
      <label>外层背景颜色：</label>
      <div class="color-group">
        <input
          type="color"
          v-model="config.outerBgColor"
          @input="clearTemplateSelection"
        >
        <input
          type="text"
          v-model="config.outerBgColor"
          class="color-hex-input"
        >
      </div>
    </div>

    <div class="form-group">
      <label>锯齿大小（越大越稀疏）：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="10"
          max="80"
          v-model.number="config.toothSize"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.toothSize }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>主题渐变色（深色）：</label>
      <div class="color-group">
        <input
          type="color"
          v-model="config.gradientDeepColor"
          @input="clearTemplateSelection"
        >
        <input
          type="text"
          v-model="config.gradientDeepColor"
          class="color-hex-input"
        >
      </div>
    </div>

    <div class="form-group">
      <label>主题渐变色（浅色）：</label>
      <div class="color-group">
        <input
          type="color"
          v-model="config.gradientLightColor"
          @input="clearTemplateSelection"
        >
        <input
          type="text"
          v-model="config.gradientLightColor"
          class="color-hex-input"
        >
      </div>
    </div>

    <!-- 表格设置 -->
    <div class="section-title">表格设置</div>

    <div class="form-group">
      <label>第二列柱状图模板：</label>
      <select v-model="config.barChartTemplate">
        <option value="default">默认模板: 正负值分别向右向左延伸</option>
        <option value="unified">统一模板: 所有柱子向右延伸，正值红色负值绿色</option>
      </select>
      <div class="form-hint" style="font-size: 12px; color: #666; margin-top: 5px;">
        默认模板: 0轴动态定位，正值向右负值向左，共享全部宽度<br>
        统一模板: 0轴固定在左侧，所有柱子向右延伸，颜色区分正负值
      </div>
    </div>

    <div class="form-group" v-if="config.barChartTemplate === 'unified'">
      <label>统一模板颜色配置：</label>
      <div style="margin-top: 10px;">
        <div class="color-group" style="margin-bottom: 10px;">
          <label style="min-width: 80px; margin-right: 10px;">正值颜色：</label>
          <input type="color" v-model="config.positiveBarColor">
          <input type="text" v-model="config.positiveBarColor" class="color-hex-input">
        </div>
        <div class="color-group" style="margin-bottom: 10px;">
          <label style="min-width: 80px; margin-right: 10px;">负值颜色：</label>
          <input type="color" v-model="config.negativeBarColor">
          <input type="text" v-model="config.negativeBarColor" class="color-hex-input">
        </div>
        <div>
          <label>0轴起始位置偏移（%）：</label>
          <div style="display: flex; align-items: center; margin-top: 5px;">
            <input
              type="range"
              min="0"
              max="50"
              v-model.number="config.unifiedZeroAxisOffset"
              style="flex-grow: 1;"
            >
            <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.unifiedZeroAxisOffset }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>数据颜色规则：</label>
      <select v-model.number="config.colorRule">
        <option :value="1">规则1: 仅当列有正负值混合时区分颜色</option>
        <option :value="2">规则2: 始终应用颜色（正值红色，负值绿色）</option>
      </select>
    </div>

    <div class="form-group">
      <label>第二列数值小数位数：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="0"
          max="3"
          v-model.number="config.secondColumnDecimalPlaces"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.secondColumnDecimalPlaces }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>整体字体大小：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="15"
          max="30"
          v-model.number="config.overallFontSize"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.overallFontSize }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>最后一列字体大小调整：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="-8"
          max="0"
          v-model.number="config.lastColumnFontSizeAdjustment"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.lastColumnFontSizeAdjustment }}</span>
      </div>
    </div>

    <!-- 表头参数设置 -->
    <div class="section-title">表头参数设置</div>

    <div class="form-group">
      <label>表头行间距（多行表头时生效）：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="0"
          max="30"
          v-model.number="config.headerLineSpacing"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.headerLineSpacing }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>表头上边距：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="0"
          max="30"
          v-model.number="config.headerTopPadding"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.headerTopPadding }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>表头下边距：</label>
      <div style="display: flex; align-items: center;">
        <input
          type="range"
          min="0"
          max="30"
          v-model.number="config.headerBottomPadding"
          style="flex-grow: 1;"
        >
        <span style="margin-left: 10px; min-width: 30px; text-align: right;">{{ config.headerBottomPadding }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>行背景渐变色（深色）：</label>
      <div class="color-group">
        <input
          type="color"
          v-model="config.rowBgColorDeep"
          @input="clearTemplateSelection"
        >
        <input
          type="text"
          v-model="config.rowBgColorDeep"
          class="color-hex-input"
        >
      </div>
    </div>

    <div class="form-group">
      <label>行背景渐变色（浅色）：</label>
      <div class="color-group">
        <input
          type="color"
          v-model="config.rowBgColorLight"
          @input="clearTemplateSelection"
        >
        <input
          type="text"
          v-model="config.rowBgColorLight"
          class="color-hex-input"
        >
      </div>
    </div>

    <!-- 配置管理 -->
    <div class="section-title">配置管理</div>

    <div class="form-group">
      <div class="config-buttons">
        <button @click="handleExportConfig" class="config-btn config-btn-export">
          📥 导出配置
        </button>
        <button @click="triggerImportConfig" class="config-btn config-btn-import">
          📤 导入配置
        </button>
        <button @click="handleResetConfig" class="config-btn config-btn-reset">
          🔄 恢复默认
        </button>
      </div>
      <input
        ref="configFileInput"
        type="file"
        accept=".json"
        @change="handleImportConfig"
        style="display: none;"
      >
      <div class="config-hint">
        提示：配置在每次导出图片后自动保存，重新打开页面时会自动恢复
      </div>
    </div>

    <button @click="$emit('generate')">生成信息图</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { colorTemplates } from '@/constants/colorTemplates'
import { sampleLogoData, sampleJsonData } from '@/constants/sampleData'
import { exportConfigFile, importConfigFile, clearConfig } from '@/composables/useConfigPersistence'

const { config, applyColorTemplate, clearTemplateSelection, resetConfig } = useConfig()

// 文件和数据输入
const mainImageFile = ref(null)
const excelFile = ref(null)
const jsonDataInput = ref('')
const companyLogosInput = ref('')
const configFileInput = ref(null)

// 模板定义
const templates = {
  default: { name: '默认' },
  red: { name: '红色' },
  blue: { name: '蓝色' },
  purple: { name: '紫色' }
}

// 应用模板
const applyTemplate = (templateName) => {
  applyColorTemplate(templateName)
}

// 处理主图片变化
const handleMainImageChange = (event) => {
  mainImageFile.value = event.target.files[0]
}

// 处理Excel文件变化
const handleExcelFileChange = (event) => {
  excelFile.value = event.target.files[0]
}

// 填充示例JSON数据
const fillSampleJsonData = () => {
  jsonDataInput.value = JSON.stringify(sampleJsonData, null, 2)
}

// 填充示例Logo数据
const fillSampleLogoData = () => {
  companyLogosInput.value = JSON.stringify(sampleLogoData, null, 2)
}

// 配置管理功能
// 导出配置文件
const handleExportConfig = () => {
  const result = exportConfigFile(config)
  if (result.success) {
    alert('配置文件导出成功！')
  } else {
    alert('配置文件导出失败：' + result.error)
  }
}

// 触发文件选择
const triggerImportConfig = () => {
  configFileInput.value.click()
}

// 导入配置文件
const handleImportConfig = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const result = await importConfigFile(file)
  if (result.success) {
    // 合并导入的配置到当前配置
    Object.assign(config, result.data)
    alert('配置文件导入成功！')
  } else {
    alert('配置文件导入失败：' + result.error)
  }

  // 清空文件选择，允许重复导入同一文件
  event.target.value = ''
}

// 恢复默认配置
const handleResetConfig = () => {
  if (confirm('确定要恢复默认配置吗？当前配置将被清除。')) {
    resetConfig()
    clearConfig()
    alert('已恢复默认配置！')
  }
}

// 导出给父组件使用
defineExpose({
  mainImageFile,
  excelFile,
  jsonDataInput,
  companyLogosInput
})
</script>

<style scoped>
/* 配置管理按钮 */
.config-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.config-btn {
  flex: 1;
  min-width: 100px;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
}

.config-btn-export {
  background-color: #28a745;
}

.config-btn-export:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.config-btn-import {
  background-color: #007bff;
}

.config-btn-import:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.config-btn-reset {
  background-color: #dc3545;
}

.config-btn-reset:hover {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.config-hint {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-left: 3px solid #007bff;
  border-radius: 4px;
}
</style>
