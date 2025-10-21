/**
 * 列宽计算模块
 * 负责计算表格各列的宽度和位置
 */
import { calculateColumnTextLength } from '@/utils/textMeasure'

/**
 * 计算列宽和列位置
 * @param {Object} options - 配置选项
 * @returns {Object} - 列宽信息
 */
export function calculateColumnWidths(options) {
  const {
    excelData,
    columns,
    columnNames,
    showCompanyLogos,
    innerWidth,
    overallFontSize,
    lastColumnFontSize
  } = options

  // 1. 确定第一列宽度
  const firstColWidth = showCompanyLogos ? 250 : 170

  // 2. 判断最后一列是否为文本列
  const isLastColText = columns.length > 1 && (() => {
    let textCount = 0
    const sampleSize = Math.min(excelData.length, 5)
    for (let j = 0; j < sampleSize; j++) {
      const value = excelData[j][columns[columns.length - 1]]
      if (value && isNaN(parseFloat(value))) {
        textCount++
      }
    }
    return textCount > sampleSize / 2
  })()

  // 3. 初始化列宽数组
  const colWidths = new Array(columns.length).fill(0)

  // 步骤1：先处理第一列和最后一列
  colWidths[0] = firstColWidth

  // 步骤1续：计算最后一列宽度
  if (columns.length > 1) {
    const lastColIndex = columns.length - 1
    const lastColTextLength = calculateColumnTextLength(
      lastColIndex,
      columnNames,
      columns,
      excelData,
      overallFontSize,
      lastColumnFontSize
    )
    const widthScaleFactor = lastColumnFontSize / overallFontSize
    const minWidth = (150 * overallFontSize / 30) * widthScaleFactor
    colWidths[lastColIndex] = Math.max(lastColTextLength, minWidth)

    // 为最后一列增加额外的右边距
    const extraRightPadding = Math.max(20 * (overallFontSize / 30), 15)
    colWidths[lastColIndex] += extraRightPadding
  }

  // 步骤2：处理除第二列外的其他列
  for (let i = 2; i < columns.length - 1; i++) {
    const colTextLength = calculateColumnTextLength(
      i,
      columnNames,
      columns,
      excelData,
      overallFontSize,
      lastColumnFontSize
    )

    if (i === 2) {
      const baseMinWidth = 180
      const adjustedMinWidth = baseMinWidth * (overallFontSize / 30)
      colWidths[i] = Math.max(colTextLength, adjustedMinWidth)
    } else if (i === 3) {
      const baseMinWidth = 200
      const adjustedMinWidth = baseMinWidth * (overallFontSize / 30)
      colWidths[i] = Math.max(colTextLength, adjustedMinWidth)
    } else {
      const minWidth = 150 * overallFontSize / 30
      colWidths[i] = Math.max(colTextLength, minWidth)
    }

    // 为倒数第二列增加额外的右边距
    if (i === columns.length - 2) {
      const extraRightPadding = Math.max(15 * (overallFontSize / 30), 10)
      colWidths[i] += extraRightPadding
    }
  }

  // 步骤3：计算间距总和
  const baseColumnSpacing = 10
  const fontSizeRatio = overallFontSize / 30
  const dynamicColumnSpacing = Math.max(baseColumnSpacing * fontSizeRatio, 8)
  const lastTwoColumnsSpacing = Math.max(20 * fontSizeRatio, 15)

  // 计算总间距（第一列和第二列之间没有间距）
  let totalSpacing = 0
  for (let i = 1; i < columns.length - 1; i++) {
    if (i === columns.length - 2) {
      totalSpacing += lastTwoColumnsSpacing
    } else {
      totalSpacing += dynamicColumnSpacing
    }
  }

  // 步骤4：计算第二列宽度（填充剩余空间）
  const otherColsWidth = colWidths.reduce((sum, width) => sum + width, 0)
  const availableWidth = innerWidth - 56
  const secondColWidth = availableWidth - otherColsWidth - totalSpacing
  colWidths[1] = Math.max(secondColWidth, 150)

  // 步骤5：计算每列的起始位置（相对于表格左边缘）
  const colPositions = []
  let currentPos = 0

  for (let i = 0; i < columns.length; i++) {
    colPositions[i] = currentPos
    currentPos += colWidths[i]

    if (i < columns.length - 1) {
      if (i === columns.length - 2) {
        currentPos += lastTwoColumnsSpacing
      } else if (i >= 1) {
        currentPos += dynamicColumnSpacing
      }
    }
  }

  return {
    colWidths,
    colPositions,
    firstColWidth,
    isLastColText
  }
}
