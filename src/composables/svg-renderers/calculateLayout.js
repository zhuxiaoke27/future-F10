/**
 * 布局计算模块
 * 负责计算SVG各区域的Y坐标和高度
 */
import { wrapText } from '@/utils/textMeasure'

/**
 * 计算SVG各区域布局
 * @param {Object} options - 配置选项
 * @returns {Object} - 布局信息
 */
export function calculateLayout(options) {
  const {
    excelData,
    excelHeaders,
    textAreaContent,
    textAreaFontSize,
    showMainImage,
    overallFontSize,
    headerLineSpacing,
    headerTopPadding,
    headerBottomPadding
  } = options

  const svgWidth = 1181
  const padding = 65
  const innerWidth = svgWidth - (padding * 2)

  // 头部区域
  const headerY = padding + 60
  const headerHeight = 60

  // 标题区域
  const titleY = headerY + headerHeight + 160
  const titleHeight = 130

  // 文本区域
  const textAreaY = titleY + titleHeight + 30
  let textAreaHeight = 0
  if (textAreaContent && textAreaContent.trim()) {
    // 计算文本区域的最大宽度
    // 文字起始位置 x = padding + 28
    // 右边界 = svgWidth - padding - 安全边距
    // 可用宽度 = 右边界 - 起始位置
    const textStartX = padding + 28
    const rightBoundary = svgWidth - padding - 40 // 额外40px安全边距，防止字体渲染溢出
    const maxTextWidth = rightBoundary - textStartX

    // 使用自动换行函数计算实际行数
    const textAreaLines = wrapText(textAreaContent, maxTextWidth, textAreaFontSize)
    const validLines = textAreaLines.filter(line => line.trim()).length
    textAreaHeight = validLines * (textAreaFontSize + 5) + 20
  }

  // 图片区域
  const imageY = textAreaY + textAreaHeight + (textAreaHeight > 0 ? 30 : 0)
  const imageHeight = 450
  const imageWidth = innerWidth - 56

  // 装饰线
  const decorativeLineY = showMainImage
    ? (imageY + imageHeight + 30)
    : (textAreaY + textAreaHeight + 30)

  // 检查是否存在换行的表头
  let hasMultilineHeader = false
  let maxHeaderLines = 1
  if (excelHeaders && excelHeaders.length > 0) {
    for (const header of excelHeaders) {
      if (header && typeof header === 'string' && header.includes('\n')) {
        hasMultilineHeader = true
        const lineCount = header.split('\n').length
        maxHeaderLines = Math.max(maxHeaderLines, lineCount)
      }
    }
  }

  // 表头参数
  const headerLineHeight = 30
  const tableHeaderY = decorativeLineY + 30

  // 计算表头总高度
  const tableHeaderTextHeight = maxHeaderLines * headerLineHeight +
    (maxHeaderLines - 1) * headerLineSpacing
  const tableHeaderHeight = hasMultilineHeader
    ? (headerTopPadding + tableHeaderTextHeight + headerBottomPadding)
    : 50

  // 数据区域
  const dataY = tableHeaderY + tableHeaderHeight + 20
  const rowHeight = Math.max(60, 88 * (overallFontSize / 30))
  const rowSpacing = 10

  // 数据表格总高度
  const dataTableHeight = (excelData.length * (rowHeight + rowSpacing)) - rowSpacing + 30

  // SVG总高度
  const extraSpaceForCopyright = 100
  const textAreaAdjustment = (textAreaContent && textAreaContent.trim()) ? textAreaHeight : 0
  const svgHeight = dataY + dataTableHeight + padding + extraSpaceForCopyright + textAreaAdjustment
  const innerHeight = svgHeight - (padding * 2) - extraSpaceForCopyright

  // 小票底部Y坐标
  const ticketBottomY = padding + innerHeight

  return {
    svgWidth,
    svgHeight,
    padding,
    innerWidth,
    innerHeight,

    // 各区域坐标
    headerY,
    headerHeight,
    titleY,
    titleHeight,
    textAreaY,
    textAreaHeight,
    imageY,
    imageHeight,
    imageWidth,
    decorativeLineY,

    // 表格相关
    tableHeaderY,
    tableHeaderHeight,
    tableHeaderTextHeight,
    headerLineHeight,
    hasMultilineHeader,
    maxHeaderLines,
    dataY,
    rowHeight,
    rowSpacing,
    dataTableHeight,

    // 其他
    ticketBottomY
  }
}
