/**
 * 表头渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染表头背景
 */
export function renderTableHeaderBackground(container, layout) {
  const { padding, tableHeaderY, tableHeaderHeight, innerWidth } = layout

  const headerBg = createSVGElement('rect', {
    x: padding + 28,
    y: tableHeaderY,
    width: innerWidth - 56,
    height: tableHeaderHeight,
    fill: 'transparent',
    rx: 5,
    ry: 5
  })
  container.appendChild(headerBg)
}

/**
 * 渲染表头文字
 */
export function renderTableHeaderText(container, layout, columnWidths, excelData, columnNames, columns, overallFontSize, showCompanyLogos) {
  const {
    padding,
    svgWidth,
    tableHeaderY,
    headerLineHeight,
    headerLineSpacing,
    headerTopPadding
  } = layout

  const { colWidths, colPositions } = columnWidths
  const tableLeftX = padding + 28

  for (let i = 0; i < Math.min(columns.length, columnNames.length); i++) {
    const headerText = columnNames[i] || columns[i]
    const hasLineBreak = headerText.includes('\n')
    const headerLines = hasLineBreak ? headerText.split('\n') : [headerText]

    if (hasLineBreak) {
      // 多行表头
      const lineCount = headerLines.length
      const startY = tableHeaderY + headerTopPadding

      for (let lineIndex = 0; lineIndex < headerLines.length; lineIndex++) {
        const lineText = createSVGElement('text', {
          'font-size': overallFontSize,
          'font-weight': 'bold',
          'font-family': 'MiSans-Bold, sans-serif',
          fill: '#333',
          'dominant-baseline': 'middle'
        })

        // 计算X位置和对齐方式
        if (i === 0) {
          if (showCompanyLogos) {
            const logoRadius = 35
            const logoX = tableLeftX + colPositions[i] + logoRadius + 10
            const companyNameX = logoX + logoRadius + 15
            lineText.setAttribute('x', companyNameX)
            lineText.setAttribute('text-anchor', 'start')
          } else {
            // 不显示Logo时，文字左对齐，添加适当左边距
            lineText.setAttribute('x', tableLeftX + colPositions[i] + 20)
            lineText.setAttribute('text-anchor', 'start')
          }
        } else if (i === columns.length - 1) {
          const lastColRightX = tableLeftX + colPositions[i] + colWidths[i] - 10
          lineText.setAttribute('x', lastColRightX)
          lineText.setAttribute('text-anchor', 'end')
        } else {
          lineText.setAttribute('x', tableLeftX + colPositions[i] + colWidths[i] / 2)
          lineText.setAttribute('text-anchor', 'middle')
        }

        const lineY = startY + lineIndex * (headerLineHeight + headerLineSpacing) + headerLineHeight / 2
        lineText.setAttribute('y', lineY)
        lineText.textContent = headerLines[lineIndex]
        container.appendChild(lineText)
      }
    } else {
      // 单行表头
      const headerTextElement = createSVGElement('text', {
        y: tableHeaderY + 30,
        'font-size': overallFontSize,
        'font-weight': 'bold',
        'font-family': 'MiSans-Bold, sans-serif',
        fill: '#333',
        'dominant-baseline': 'middle'
      })

      // 计算X位置和对齐方式
      if (i === 0) {
        if (showCompanyLogos) {
          const logoRadius = 35
          const logoX = tableLeftX + colPositions[i] + logoRadius + 10
          const companyNameX = logoX + logoRadius + 15
          headerTextElement.setAttribute('x', companyNameX)
          headerTextElement.setAttribute('text-anchor', 'start')
        } else {
          // 不显示Logo时，文字左对齐，添加适当左边距
          headerTextElement.setAttribute('x', tableLeftX + colPositions[i] + 20)
          headerTextElement.setAttribute('text-anchor', 'start')
        }
      } else if (i === columns.length - 1) {
        const lastColRightX = tableLeftX + colPositions[i] + colWidths[i] - 10
        headerTextElement.setAttribute('x', lastColRightX)
        headerTextElement.setAttribute('text-anchor', 'end')
      } else {
        headerTextElement.setAttribute('x', tableLeftX + colPositions[i] + colWidths[i] / 2)
        headerTextElement.setAttribute('text-anchor', 'middle')
      }

      headerTextElement.textContent = headerText
      container.appendChild(headerTextElement)
    }
  }
}
