/**
 * 表格数据行渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'
import { renderSecondColumn } from './renderBarChart'

/**
 * 判断列是否需要应用颜色规则
 */
function shouldApplyColorRule(excelData, columns, colIndex, colorRule) {
  if (colorRule === 2) {
    // 规则2: 始终应用颜色
    return true
  }

  // 规则1: 仅当列有正负值混合时区分颜色
  let hasPositive = false
  let hasNegative = false

  for (const row of excelData) {
    const value = row[columns[colIndex]]
    const numValue = parseFloat(String(value).replace(/[%,]/g, ''))

    if (!isNaN(numValue)) {
      if (numValue > 0) hasPositive = true
      if (numValue < 0) hasNegative = true
      if (hasPositive && hasNegative) break
    }
  }

  return hasPositive && hasNegative
}

/**
 * 获取数值颜色
 */
function getValueColor(value, applyColor) {
  if (!applyColor) return '#333'

  const numValue = parseFloat(String(value).replace(/[%,]/g, ''))
  if (isNaN(numValue)) return '#333'

  return numValue >= 0 ? '#bd2427' : '#008000'
}

/**
 * 渲染行背景
 */
function renderRowBackground(container, rowY, rowHeight, rowBgGradientId, tableLeftX, tableWidth) {
  const rowBg = createSVGElement('rect', {
    x: tableLeftX,
    y: rowY - rowHeight / 2,
    width: tableWidth,
    height: rowHeight,
    fill: `url(#${rowBgGradientId})`,
    rx: 8,
    ry: 8
  })
  container.appendChild(rowBg)
}

/**
 * 渲染公司Logo
 */
function renderCompanyLogo(container, companyName, companyLogosMap, logoX, logoY, logoRadius) {
  const logoUrl = companyLogosMap.get(companyName)
  if (!logoUrl) return

  // Logo圆形
  const circle = createSVGElement('circle', {
    cx: logoX,
    cy: logoY,
    r: logoRadius,
    fill: '#f0f0f0',
    stroke: '#ddd',
    'stroke-width': '1'
  })
  container.appendChild(circle)

  // Logo图片（使用clipPath实现圆形裁剪）
  const clipPathId = `logoClip_${companyName.replace(/\s/g, '_')}`
  const clipPath = createSVGElement('clipPath', { id: clipPathId })
  const clipCircle = createSVGElement('circle', {
    cx: logoX,
    cy: logoY,
    r: logoRadius
  })
  clipPath.appendChild(clipCircle)
  container.appendChild(clipPath)

  const logoImage = createSVGElement('image', {
    x: logoX - logoRadius,
    y: logoY - logoRadius,
    width: logoRadius * 2,
    height: logoRadius * 2,
    href: logoUrl,
    preserveAspectRatio: 'xMidYMid slice',
    'clip-path': `url(#${clipPathId})`
  })
  container.appendChild(logoImage)
}

/**
 * 渲染公司名称
 */
function renderCompanyName(container, companyName, textX, textY, fontSize) {
  const text = createSVGElement('text', {
    x: textX,
    y: textY,
    'font-size': fontSize,
    'font-weight': '600',
    'font-family': 'MiSans-DemiBold, sans-serif',
    fill: '#333',
    'text-anchor': 'start',
    'dominant-baseline': 'middle'
  })
  text.textContent = companyName
  container.appendChild(text)
}

/**
 * 渲染其他列数据
 */
function renderOtherColumns(container, row, columns, colPositions, colWidths, tableLeftX, rowY, overallFontSize, lastColumnFontSize, colorRule, excelData, svgWidth, padding) {
  for (let colIndex = 2; colIndex < columns.length; colIndex++) {
    const value = row[columns[colIndex]]
    const isLastColumn = colIndex === columns.length - 1

    // 判断是否应用颜色规则
    const applyColor = shouldApplyColorRule(excelData, columns, colIndex, colorRule)
    const textColor = getValueColor(value, applyColor)

    const text = createSVGElement('text', {
      y: rowY,
      'font-size': isLastColumn ? lastColumnFontSize : overallFontSize,
      'font-weight': '500',
      'font-family': 'MiSans-Medium, sans-serif',
      fill: textColor,
      'dominant-baseline': 'middle'
    })

    // 最后一列右对齐
    if (isLastColumn) {
      // 使用列的实际右边界，留出10px右边距
      const lastColRightX = tableLeftX + colPositions[colIndex] + colWidths[colIndex] - 10
      text.setAttribute('x', lastColRightX)
      text.setAttribute('text-anchor', 'end')
    } else {
      text.setAttribute('x', tableLeftX + colPositions[colIndex] + colWidths[colIndex] / 2)
      text.setAttribute('text-anchor', 'middle')
    }

    text.textContent = value
    container.appendChild(text)
  }
}

/**
 * 渲染单个数据行
 */
export function renderDataRow(container, options) {
  const {
    excelData,
    columns,
    rowIndex,
    layout,
    columnWidths,
    rowBgGradientId,
    showCompanyLogos,
    companyLogosMap,
    overallFontSize,
    lastColumnFontSize,
    colorRule,
    barChartParams,
    barChartTemplate,
    secondColumnDecimalPlaces,
    unifiedZeroAxisOffset,
    svgWidth,
    padding
  } = options

  const { dataY, rowHeight, rowSpacing } = layout
  const { colWidths, colPositions } = columnWidths

  const row = excelData[rowIndex]
  const rowY = dataY + (rowIndex * (rowHeight + rowSpacing)) + rowHeight / 2
  const tableLeftX = padding + 28

  // 计算表格宽度：最后一列的右边界
  const lastColRightEdge = columnWidths.colPositions[columns.length - 1] + columnWidths.colWidths[columns.length - 1]
  const tableWidth = lastColRightEdge

  // 1. 渲染行背景
  renderRowBackground(container, rowY, rowHeight, rowBgGradientId, tableLeftX, tableWidth)

  // 2. 渲染第一列（公司Logo + 名称）
  const companyName = row[columns[0]]

  if (showCompanyLogos) {
    // Logo中心位置：确保logo完全在边界内
    const logoRadius = 35
    const logoX = tableLeftX + colPositions[0] + logoRadius + 10  // logo左边距10px
    const logoY = rowY

    renderCompanyLogo(container, companyName, companyLogosMap, logoX, logoY, logoRadius)

    // 公司名称起始位置
    const companyNameX = logoX + logoRadius + 15
    renderCompanyName(container, companyName, companyNameX, rowY, overallFontSize)
  } else {
    // 不显示Logo时，文字左对齐，添加适当左边距
    const companyNameX = tableLeftX + colPositions[0] + 20
    const text = createSVGElement('text', {
      x: companyNameX,
      y: rowY,
      'font-size': overallFontSize,
      'font-weight': '600',
      'font-family': 'MiSans-DemiBold, sans-serif',
      fill: '#333',
      'text-anchor': 'start',
      'dominant-baseline': 'middle'
    })
    text.textContent = companyName
    container.appendChild(text)
  }

  // 3. 渲染第二列（柱状图 + 数值）
  renderSecondColumn(container, {
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
    barChartParams,
    layout,
    config: options.config
  })

  // 4. 渲染其他列
  if (columns.length > 2) {
    renderOtherColumns(container, row, columns, colPositions, colWidths, tableLeftX, rowY, overallFontSize, lastColumnFontSize, colorRule, excelData, svgWidth, padding)
  }
}

/**
 * 渲染所有数据行
 */
export function renderAllDataRows(container, options) {
  const { excelData } = options

  for (let i = 0; i < excelData.length; i++) {
    renderDataRow(container, {
      ...options,
      rowIndex: i,
      rowBgGradientId: `rowGradient-${i}` // 每行使用独立的渐变ID
    })
  }
}
