/**
 * 配置状态管理
 * 使用Vue 3的reactive创建响应式配置对象
 */
import { reactive, computed } from 'vue'
import { defaultConfig } from '@/constants/defaultConfig'
import { colorTemplates } from '@/constants/colorTemplates'
import { loadConfig, saveConfig } from './useConfigPersistence'

// 全局配置状态
const config = reactive({
  // 基本信息
  mainTitle: defaultConfig.mainTitle,
  subtitle: defaultConfig.subtitle,
  textAreaContent: defaultConfig.textAreaContent,
  copyright: defaultConfig.copyright,

  // 显示选项
  showMainImage: defaultConfig.showMainImage,
  showCompanyLogos: defaultConfig.showCompanyLogos,

  // 颜色配置
  outerBgColor: defaultConfig.outerBgColor,
  gradientDeepColor: defaultConfig.gradientDeepColor,
  gradientLightColor: defaultConfig.gradientLightColor,
  rowBgColorDeep: defaultConfig.rowBgColorDeep,
  rowBgColorLight: defaultConfig.rowBgColorLight,
  positiveBarColor: defaultConfig.positiveBarColor,
  negativeBarColor: defaultConfig.negativeBarColor,

  // 字体配置
  titleFontSize: defaultConfig.titleFontSize,
  subtitleFontSize: defaultConfig.subtitleFontSize,
  textAreaFontSize: defaultConfig.textAreaFontSize,
  overallFontSize: defaultConfig.overallFontSize,
  lastColumnFontSizeAdjustment: defaultConfig.lastColumnFontSizeAdjustment,

  // 表格配置
  toothSize: defaultConfig.toothSize,
  headerLineSpacing: defaultConfig.headerLineSpacing,
  headerTopPadding: defaultConfig.headerTopPadding,
  headerBottomPadding: defaultConfig.headerBottomPadding,
  secondColumnDecimalPlaces: defaultConfig.secondColumnDecimalPlaces,
  colorRule: defaultConfig.colorRule,
  barChartTemplate: defaultConfig.barChartTemplate,
  unifiedZeroAxisOffset: defaultConfig.unifiedZeroAxisOffset,

  // 数据源
  dataSource: 'excel', // 'excel' | 'json'

  // 当前选中的模板
  selectedTemplate: 'default',

  // 图片资源
  accountLogoSrc: defaultConfig.accountLogoSrc,
  insideBgSrc: defaultConfig.insideBgSrc
})

// 自动加载保存的配置
const loadSavedConfig = () => {
  const result = loadConfig()
  if (result.success && result.data) {
    // 合并保存的配置到当前配置
    Object.assign(config, result.data)
    console.log('✅ 已自动恢复上次保存的配置')
  }
}

// 页面加载时立即尝试恢复配置
loadSavedConfig()

/**
 * 使用配置的组合式函数
 */
export function useConfig() {
  /**
   * 应用颜色模板
   * @param {string} templateName - 模板名称
   */
  const applyColorTemplate = (templateName) => {
    if (!colorTemplates[templateName]) return

    const template = colorTemplates[templateName]

    config.outerBgColor = template.outerBg
    config.gradientDeepColor = template.gradientDeep
    config.gradientLightColor = template.gradientLight
    config.rowBgColorDeep = template.rowBgColorDeep
    config.rowBgColorLight = template.rowBgColorLight
    config.selectedTemplate = templateName
  }

  /**
   * 清除模板选择（当用户手动修改颜色时）
   */
  const clearTemplateSelection = () => {
    config.selectedTemplate = ''
  }

  /**
   * 重置配置为默认值
   */
  const resetConfig = () => {
    Object.assign(config, {
      mainTitle: defaultConfig.mainTitle,
      subtitle: defaultConfig.subtitle,
      textAreaContent: defaultConfig.textAreaContent,
      copyright: defaultConfig.copyright,
      showMainImage: defaultConfig.showMainImage,
      showCompanyLogos: defaultConfig.showCompanyLogos,
      outerBgColor: defaultConfig.outerBgColor,
      gradientDeepColor: defaultConfig.gradientDeepColor,
      gradientLightColor: defaultConfig.gradientLightColor,
      rowBgColorDeep: defaultConfig.rowBgColorDeep,
      rowBgColorLight: defaultConfig.rowBgColorLight,
      positiveBarColor: defaultConfig.positiveBarColor,
      negativeBarColor: defaultConfig.negativeBarColor,
      titleFontSize: defaultConfig.titleFontSize,
      subtitleFontSize: defaultConfig.subtitleFontSize,
      textAreaFontSize: defaultConfig.textAreaFontSize,
      overallFontSize: defaultConfig.overallFontSize,
      lastColumnFontSizeAdjustment: defaultConfig.lastColumnFontSizeAdjustment,
      toothSize: defaultConfig.toothSize,
      headerLineSpacing: defaultConfig.headerLineSpacing,
      headerTopPadding: defaultConfig.headerTopPadding,
      headerBottomPadding: defaultConfig.headerBottomPadding,
      secondColumnDecimalPlaces: defaultConfig.secondColumnDecimalPlaces,
      colorRule: defaultConfig.colorRule,
      barChartTemplate: defaultConfig.barChartTemplate,
      unifiedZeroAxisOffset: defaultConfig.unifiedZeroAxisOffset,
      dataSource: 'excel',
      selectedTemplate: 'default'
    })
  }

  /**
   * 保存当前配置到 LocalStorage
   */
  const saveConfigToStorage = () => {
    return saveConfig(config)
  }

  /**
   * 计算最后一列的实际字体大小
   */
  const lastColumnFontSize = computed(() => {
    return config.overallFontSize + config.lastColumnFontSizeAdjustment
  })

  return {
    config,
    applyColorTemplate,
    clearTemplateSelection,
    resetConfig,
    saveConfigToStorage,
    lastColumnFontSize
  }
}
