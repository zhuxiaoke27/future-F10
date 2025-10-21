/**
 * 柱状图渲染模块
 * 完全按照SVG柱状图渲染规则实现
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 计算柱状图参数（数据预处理）
 * 规则：二、数据预处理
 */
export function getBarChartParams(excelData, columns, barChartTemplate) {
  if (!excelData || !columns || columns.length < 2) {
    return {
      maxValue: 0,
      minValue: 0,
      maxAbsValue: 0,
      hasNegativeValues: false,
      hasPositiveValues: false
    }
  }

  // 2.1 计算数据范围
  const secondColumn = columns[1]
  const values = excelData.map(row => {
    const val = parseFloat(row[secondColumn])
    return isNaN(val) ? 0 : val  // 非数值转为0
  })

  // 计算最大值、最小值和最大绝对值
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  let maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue))

  // 如果最大绝对值很小（<10），向上取整
  if (maxAbsValue < 10) {
    maxAbsValue = Math.ceil(maxAbsValue)
  }

  return {
    maxValue,
    minValue,
    maxAbsValue,
    hasNegativeValues: minValue < 0,
    hasPositiveValues: maxValue > 0
  }
}

/**
 * 计算0轴位置（默认模板）
 * 规则：3.2 0轴位置计算逻辑
 */
function calculateDefaultZeroAxisX(colX, leftPadding, totalAvailWidth, maxValue, minValue) {
  let zeroAxisX

  if (maxValue > 0 && minValue < 0) {
    // 情况A：有正有负 - 0轴按比例分配位置
    const positiveRange = maxValue
    const negativeRange = Math.abs(minValue)
    const totalRange = positiveRange + negativeRange
    const negativeWidth = (negativeRange / totalRange) * totalAvailWidth
    zeroAxisX = colX + leftPadding + negativeWidth

  } else if (maxValue > 0) {
    // 情况B：只有正值 - 0轴在最左侧
    zeroAxisX = colX + leftPadding

  } else {
    // 情况C：只有负值 - 0轴在最右侧
    zeroAxisX = colX + leftPadding + totalAvailWidth
  }

  return zeroAxisX
}

/**
 * 计算柱状图位置和宽度（默认模板）
 * 规则：3.3 柱状图位置和宽度计算
 */
function calculateDefaultBarDimensions(numValue, colX, leftPadding, totalAvailWidth, zeroAxisX, maxValue, minValue) {
  let barX, barWidth

  if (numValue >= 0) {
    // 3.3.1 正值的计算
    barX = zeroAxisX

    if (maxValue > 0) {
      if (minValue < 0) {
        // 有正有负的情况
        const positiveRange = maxValue
        const negativeRange = Math.abs(minValue)
        const totalRange = positiveRange + negativeRange
        const positiveWidth = (positiveRange / totalRange) * totalAvailWidth
        barWidth = (numValue / maxValue) * positiveWidth
      } else {
        // 只有正值的情况
        barWidth = (numValue / maxValue) * totalAvailWidth
      }
    } else {
      barWidth = 0
    }
  } else {
    // 3.3.2 负值的计算
    if (minValue < 0) {
      if (maxValue > 0) {
        // 有正有负的情况
        const positiveRange = maxValue
        const negativeRange = Math.abs(minValue)
        const totalRange = positiveRange + negativeRange
        const negativeWidth = (negativeRange / totalRange) * totalAvailWidth
        barWidth = (Math.abs(numValue) / Math.abs(minValue)) * negativeWidth
      } else {
        // 只有负值的情况
        barWidth = (Math.abs(numValue) / Math.abs(minValue)) * totalAvailWidth
      }
    } else {
      barWidth = 0
    }

    // 负值柱子起始位置 = 0轴位置 - 柱宽（向左延伸）
    barX = zeroAxisX - barWidth
  }

  return { barX, barWidth }
}

/**
 * 计算柱状图位置和宽度（统一模板）
 * 规则：3.7 柱宽计算
 */
function calculateUnifiedBarDimensions(numValue, colX, leftPadding, totalAvailWidth, unifiedZeroAxisOffset, actualMaxAbsValue) {
  // 根据偏移百分比计算0轴位置
  const offsetWidth = (unifiedZeroAxisOffset / 100) * totalAvailWidth
  const zeroAxisX = colX + leftPadding + offsetWidth

  // 计算0轴右侧的剩余可用宽度
  const remainingWidth = totalAvailWidth - offsetWidth

  // 柱宽 = (当前值的绝对值 / 最大绝对值) × 剩余宽度
  const barWidth = (Math.abs(numValue) / actualMaxAbsValue) * remainingWidth

  // 柱子起始位置永远是0轴位置（向右延伸）
  const barX = zeroAxisX

  return { barX, barWidth, zeroAxisX }
}

/**
 * 渲染柱状图SVG元素
 * 规则：四、柱状图SVG元素绘制
 */
function renderBarElement(container, barX, barY, barWidth, barHeight, barColor) {
  const bar = createSVGElement('rect', {
    x: barX,
    y: barY,
    width: barWidth,
    height: barHeight,
    fill: barColor
  })
  container.appendChild(bar)
}

/**
 * 计算文本位置和颜色（默认模板）
 * 规则：5.2 默认模板的文本位置规则
 */
function calculateDefaultTextPosition(numValue, barX, barWidth, zeroAxisX, colWidth, gradientDeepColor) {
  const minWidthForInnerText = colWidth * 1 / 2
  let textX, textColor, textAnchor

  if (numValue >= 0 && barWidth >= minWidthForInnerText) {
    // 规则1：正值且柱子足够宽 → 文本显示在柱内右侧
    textX = barX + barWidth - 20
    textColor = '#FFFFFF'
    textAnchor = 'end'
  } else {
    // 规则2：柱子较窄或为负值 → 文本显示在0轴右侧
    if (numValue >= 0) {
      textX = barX + barWidth + 10
    } else {
      textX = zeroAxisX + 10
    }
    textColor = gradientDeepColor
    textAnchor = 'start'
  }

  return { textX, textColor, textAnchor }
}

/**
 * 计算文本位置和颜色（统一模板）
 * 规则：5.3 统一模板的文本位置规则
 */
function calculateUnifiedTextPosition(numValue, barX, barWidth, colWidth, positiveBarColor, negativeBarColor) {
  const minWidthForInnerText = colWidth * 1 / 2
  let textX, textColor, textAnchor

  if (barWidth >= minWidthForInnerText) {
    // 规则1：柱子足够宽 → 文本显示在柱内右侧
    textX = barX + barWidth - 20
    textColor = '#FFFFFF'
    textAnchor = 'end'
  } else {
    // 规则2：柱子较窄 → 文本显示在柱外右侧
    textX = barX + barWidth + 10
    textColor = numValue >= 0 ? positiveBarColor : negativeBarColor
    textAnchor = 'start'
  }

  return { textX, textColor, textAnchor }
}

/**
 * 格式化数值显示
 * 规则：5.4 数值格式化规则
 */
function formatValue(value, numValue, secondColumnDecimalPlaces) {
  let formattedValue = value

  if (typeof numValue === 'number' && !isNaN(numValue)) {
    // 检查原始值是否包含百分号
    const hasPercent = String(value).includes('%')

    // 格式化到指定小数位数
    formattedValue = numValue.toFixed(secondColumnDecimalPlaces)

    // 如果原始值有百分号，添加回去
    if (hasPercent) {
      formattedValue += '%'
    }
  }

  return formattedValue
}

/**
 * 渲染数值文本
 * 规则：5.5 文本SVG元素绘制
 */
function renderValueText(container, textX, textY, textContent, textColor, textAnchor, overallFontSize) {
  const valueText = createSVGElement('text', {
    x: textX,
    y: textY,
    'font-size': overallFontSize,
    'font-weight': 'bold',
    'font-family': 'MiSans-SemiBold, sans-serif',
    fill: textColor,
    'text-anchor': textAnchor,
    'dominant-baseline': 'middle'
  })
  valueText.textContent = textContent
  container.appendChild(valueText)
}

/**
 * 渲染非数值文本
 * 规则：六、非数值情况处理
 */
function renderNonNumericText(container, value, colX, colWidth, rowY, rowIndex, colIndex, overallFontSize) {
  const text = createSVGElement('text', {
    'font-size': overallFontSize,
    'font-weight': 'normal',
    'font-family': 'MiSans-Medium, sans-serif',
    fill: '#333333',
    'dominant-baseline': 'middle'
  })

  if (rowIndex === 0) {
    // 第一行：居中对齐
    text.setAttribute('x', colX + (colWidth / 2))
    text.setAttribute('y', rowY)
    text.setAttribute('text-anchor', 'middle')
    text.textContent = value
    container.appendChild(text)

    // 计算并保存第一行文本的左边界，用于其他行对齐
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    tempCtx.font = `normal ${overallFontSize}px MiSans-Medium, sans-serif`
    const textWidth = tempCtx.measureText(value).width

    if (!window.colLeftBoundaries) window.colLeftBoundaries = {}
    window.colLeftBoundaries[colIndex] = colX + (colWidth / 2) - (textWidth / 2)

  } else {
    // 其他行：与第一行的左边界对齐
    const leftBoundary = window.colLeftBoundaries && window.colLeftBoundaries[colIndex]
    if (leftBoundary) {
      text.setAttribute('x', leftBoundary)
      text.setAttribute('text-anchor', 'start')
    } else {
      // 回退到居中对齐
      text.setAttribute('x', colX + (colWidth / 2))
      text.setAttribute('text-anchor', 'middle')
    }
    text.setAttribute('y', rowY)
    text.textContent = value
    container.appendChild(text)
  }
}

/**
 * 渲染第二列（柱状图+数值）
 * 主渲染函数，整合所有规则
 */
export function renderSecondColumn(container, options) {
  const {
    excelData,
    columns,
    rowIndex,
    rowY,
    colPositions,
    colWidths,
    tableLeftX,
    barChartTemplate,
    secondColumnDecimalPlaces,
    unifiedZeroAxisOffset,
    overallFontSize,
    barChartParams
  } = options

  const row = excelData[rowIndex]
  const value = row[columns[1]]
  const numValue = parseFloat(value)

  // 获取配置参数
  const config = options.config || {}
  const gradientDeepColor = config.gradientDeepColor || '#ff6b6b'
  const positiveBarColor = config.positiveBarColor || '#bd2427'
  const negativeBarColor = config.negativeBarColor || '#28a745'

  // 基础配置参数
  const colX = tableLeftX + colPositions[1]
  const colWidth = colWidths[1]
  const totalAvailWidth = colWidth - 20
  const leftPadding = 10
  const barHeight = options.layout?.rowHeight || 60
  const rowCenterY = rowY

  // 2.2 数值验证
  const { maxAbsValue, maxValue, minValue } = barChartParams

  if (!isNaN(numValue) && maxAbsValue > 0) {
    // 绘制柱状图
    let barX, barWidth, zeroAxisX, barColor, textX, textColor, textAnchor

    if (barChartTemplate === 'unified') {
      // ========== 统一模板 ==========
      // 重新计算当前数据集的最大绝对值（确保准确性）
      const currentDataValues = excelData.map(row => {
        const val = parseFloat(row[columns[1]])
        return isNaN(val) ? 0 : val
      })
      const actualMaxAbsValue = Math.max(...currentDataValues.map(v => Math.abs(v)))

      // 计算柱状图位置和宽度
      const barDimensions = calculateUnifiedBarDimensions(
        numValue,
        colX,
        leftPadding,
        totalAvailWidth,
        unifiedZeroAxisOffset,
        actualMaxAbsValue
      )
      barX = barDimensions.barX
      barWidth = barDimensions.barWidth
      zeroAxisX = barDimensions.zeroAxisX

      // 颜色设置
      barColor = numValue >= 0 ? 'url(#positiveBarGradient)' : 'url(#negativeBarGradient)'

      // 计算文本位置和颜色
      const textPosition = calculateUnifiedTextPosition(
        numValue,
        barX,
        barWidth,
        colWidth,
        positiveBarColor,
        negativeBarColor
      )
      textX = textPosition.textX
      textColor = textPosition.textColor
      textAnchor = textPosition.textAnchor

    } else {
      // ========== 默认模板 ==========
      // 计算0轴位置
      zeroAxisX = calculateDefaultZeroAxisX(
        colX,
        leftPadding,
        totalAvailWidth,
        maxValue,
        minValue
      )

      // 计算柱状图位置和宽度
      const barDimensions = calculateDefaultBarDimensions(
        numValue,
        colX,
        leftPadding,
        totalAvailWidth,
        zeroAxisX,
        maxValue,
        minValue
      )
      barX = barDimensions.barX
      barWidth = barDimensions.barWidth

      // 颜色设置
      barColor = 'url(#barGradient)'

      // 计算文本位置和颜色
      const textPosition = calculateDefaultTextPosition(
        numValue,
        barX,
        barWidth,
        zeroAxisX,
        colWidth,
        gradientDeepColor
      )
      textX = textPosition.textX
      textColor = textPosition.textColor
      textAnchor = textPosition.textAnchor
    }

    // 渲染柱状图
    renderBarElement(
      container,
      barX,
      rowCenterY - (barHeight / 2),
      barWidth,
      barHeight,
      barColor
    )

    // 格式化数值
    const formattedValue = formatValue(value, numValue, secondColumnDecimalPlaces)

    // 渲染数值文本
    renderValueText(
      container,
      textX,
      rowCenterY,
      formattedValue,
      textColor,
      textAnchor,
      overallFontSize
    )

  } else {
    // 非数值情况处理
    renderNonNumericText(
      container,
      value,
      colX,
      colWidth,
      rowCenterY,
      rowIndex,
      1, // colIndex
      overallFontSize
    )
  }
}
