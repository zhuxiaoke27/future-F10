/**
 * SVG渲染引擎
 * 整合所有子渲染模块，生成完整的SVG信息图
 */
import { ref } from 'vue'
import { calculateLayout } from './svg-renderers/calculateLayout'
import { calculateColumnWidths } from './svg-renderers/calculateColumnWidths'
import { createSVGDefs, renderOuterBackground, renderInnerTicket } from './svg-renderers/renderBackground'
import { renderAccountLogo } from './svg-renderers/renderHeader'
import { renderMainTitle, renderSubtitle } from './svg-renderers/renderTitle'
import { renderTextArea } from './svg-renderers/renderTextArea'
import { renderMainImage, renderDecorativeLine } from './svg-renderers/renderImage'
import { renderTableHeaderBackground, renderTableHeaderText } from './svg-renderers/renderTableHeader'
import { renderAllDataRows } from './svg-renderers/renderTableRows'
import { getBarChartParams } from './svg-renderers/renderBarChart'
import { renderCopyright } from './svg-renderers/renderCopyright'
import { renderWatermark } from './svg-renderers/renderWatermark'
import { createSVGElement, createLinearGradient } from '@/utils/svgHelpers'

export function useSVGRenderer() {
  const svgContainer = ref(null)

  /**
   * 生成信息图
   */
  const generateInfoGraphic = (containerElement, parsedData, config) => {
    if (!containerElement || !parsedData) {
      console.error('容器或数据无效')
      return
    }

    const { data: excelData, headers: excelHeaders } = parsedData

    // 清空容器
    containerElement.innerHTML = ''

    // 1. 计算布局
    const layout = calculateLayout({
      excelData,
      excelHeaders,
      textAreaContent: config.textAreaContent,
      textAreaFontSize: config.textAreaFontSize,
      showMainImage: config.showMainImage,
      overallFontSize: config.overallFontSize,
      headerLineSpacing: config.headerLineSpacing,
      headerTopPadding: config.headerTopPadding,
      headerBottomPadding: config.headerBottomPadding
    })

    // 设置SVG尺寸
    containerElement.setAttribute('width', layout.svgWidth)
    containerElement.setAttribute('height', layout.svgHeight)
    containerElement.setAttribute('viewBox', `0 0 ${layout.svgWidth} ${layout.svgHeight}`)

    // 2. 创建渐变和滤镜定义
    createSVGDefs(
      containerElement,
      layout,
      {
        gradientDeepColor: config.gradientDeepColor,
        gradientLightColor: config.gradientLightColor
      },
      config.insideBgSrc,
      config.positiveBarColor,
      config.negativeBarColor
    )

    // 3. 渲染背景
    renderOuterBackground(containerElement, layout, config.outerBgColor)
    renderInnerTicket(containerElement, layout, config.toothSize, layout.decorativeLineY)

    // 4. 渲染头部Logo
    renderAccountLogo(containerElement, layout, config.accountLogoSrc)

    // 5. 渲染标题
    renderMainTitle(containerElement, layout, config.mainTitle, config.titleFontSize)
    renderSubtitle(containerElement, layout, config.subtitle, config.subtitleFontSize)

    // 6. 渲染文本区域
    renderTextArea(containerElement, layout, config.textAreaContent, config.textAreaFontSize)

    // 7. 渲染主图片
    renderMainImage(containerElement, layout, parsedData.mainImageSrc, config.showMainImage)

    // 8. 渲染装饰线
    renderDecorativeLine(containerElement, layout)

    // 9. 准备表格数据
    const columns = Object.keys(excelData[0])
    const columnNames = excelHeaders || columns

    // 10. 计算列宽
    const columnWidths = calculateColumnWidths({
      excelData,
      columns,
      columnNames,
      showCompanyLogos: config.showCompanyLogos,
      innerWidth: layout.innerWidth,
      overallFontSize: config.overallFontSize,
      lastColumnFontSize: config.overallFontSize + config.lastColumnFontSizeAdjustment
    })

    // 11. 为每行创建独立的背景渐变（从左到右）
    const defs = containerElement.querySelector('defs')
    excelData.forEach((_, rowIndex) => {
      const gradientId = `rowGradient-${rowIndex}`
      const rowBgGradient = createSVGElement('linearGradient', { id: gradientId })
      rowBgGradient.setAttribute('x1', '0%')
      rowBgGradient.setAttribute('y1', '0%')
      rowBgGradient.setAttribute('x2', '100%')
      rowBgGradient.setAttribute('y2', '0%')

      const rowStop1 = createSVGElement('stop', {
        offset: '0%',
        style: `stop-color:${config.rowBgColorDeep}`
      })
      const rowStop2 = createSVGElement('stop', {
        offset: '100%',
        style: `stop-color:${config.rowBgColorLight}`
      })
      rowBgGradient.appendChild(rowStop1)
      rowBgGradient.appendChild(rowStop2)
      defs.appendChild(rowBgGradient)
    })

    // 12. 渲染表头
    renderTableHeaderBackground(containerElement, layout)
    renderTableHeaderText(
      containerElement,
      layout,
      columnWidths,
      excelData,
      columnNames,
      columns,
      config.overallFontSize,
      config.showCompanyLogos
    )

    // 13. 计算柱状图参数（只计算一次）
    const barChartParams = getBarChartParams(excelData, columns, config.barChartTemplate)

    // 14. 渲染所有数据行
    renderAllDataRows(containerElement, {
      excelData,
      columns,
      layout,
      columnWidths,
      showCompanyLogos: config.showCompanyLogos,
      companyLogosMap: parsedData.companyLogosMap,
      overallFontSize: config.overallFontSize,
      lastColumnFontSize: config.overallFontSize + config.lastColumnFontSizeAdjustment,
      colorRule: config.colorRule,
      barChartParams,
      barChartTemplate: config.barChartTemplate,
      secondColumnDecimalPlaces: config.secondColumnDecimalPlaces,
      unifiedZeroAxisOffset: config.unifiedZeroAxisOffset,
      svgWidth: layout.svgWidth,
      padding: layout.padding,
      config: {
        gradientDeepColor: config.gradientDeepColor,
        positiveBarColor: config.positiveBarColor,
        negativeBarColor: config.negativeBarColor
      }
    })

    // 15. 渲染水印
    renderWatermark(containerElement, layout)

    // 16. 渲染版权文案和底部Logo
    renderCopyright(containerElement, layout, config.copyright)

    console.log('SVG信息图生成完成')
  }

  return {
    svgContainer,
    generateInfoGraphic
  }
}
