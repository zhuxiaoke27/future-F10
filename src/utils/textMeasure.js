/**
 * 文本测量工具函数
 */

/**
 * 估算文本宽度，区分中文和英文字符
 * @param {string} text - 文本内容
 * @param {number} chineseCharWidth - 中文字符宽度
 * @param {number} englishCharWidth - 英文字符宽度
 * @returns {number} - 估算的文本宽度
 */
export function estimateTextWidth(text, chineseCharWidth, englishCharWidth) {
  let width = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i)
    // 检查是否为中文字符（Unicode范围）
    if (/[\u4e00-\u9fa5]/.test(char)) {
      width += chineseCharWidth
    } else if (/[,、，.。:：;；!！?？]/.test(char)) {
      // 标点符号给予额外宽度
      width += englishCharWidth * 1.2
    } else {
      width += englishCharWidth
    }
  }

  // 检查是否包含多个连续的非中文字符（如"社保基金、养老金"）
  if (/[,、，.。:：;；]/.test(text)) {
    // 有标点符号的文本，给予额外宽度以确保显示
    width += 20
  }
  return width
}

/**
 * 计算单列文本内容长度
 * @param {number} colIndex - 列索引
 * @param {Array} columnNames - 列名数组
 * @param {Array} columns - 列键数组
 * @param {Array} excelData - Excel数据
 * @param {number} overallFontSize - 整体字体大小
 * @param {number} lastColumnFontSize - 最后一列字体大小
 * @returns {number} - 计算的列宽度
 */
export function calculateColumnTextLength(
  colIndex,
  columnNames,
  columns,
  excelData,
  overallFontSize,
  lastColumnFontSize
) {
  const titleText = columnNames[colIndex] || ''

  // 处理多行表头，取最长的一行计算宽度
  let maxTitleLength = 0
  if (titleText.includes('\n')) {
    const titleLines = titleText.split('\n')
    for (const line of titleLines) {
      const lineLength = estimateTextWidth(line, overallFontSize, overallFontSize / 2)
      maxTitleLength = Math.max(maxTitleLength, lineLength)
    }
  } else {
    // 中文字符宽度估算根据整体字体大小调整
    maxTitleLength = estimateTextWidth(titleText, overallFontSize, overallFontSize / 2)
  }

  // 计算数据最大长度
  let maxDataLength = 0
  excelData.forEach(row => {
    const dataStr = String(row[columns[colIndex]] || '')

    // 检测文本中是否含有特殊模式（如"芯片、算力"这样的组合）
    const containsSpecialPattern = /[、，,]/.test(dataStr)

    // 中文字符宽度估算根据整体字体大小调整
    // 针对最后一列，按照字体大小的比例调整宽度
    const charWidthScaleFactor = colIndex === columns.length - 1 ? (lastColumnFontSize / overallFontSize) : 1
    const chineseCharWidth = (overallFontSize * 0.87) * charWidthScaleFactor // 约为字体大小的0.87倍
    const englishCharWidth = (overallFontSize * 0.43) * charWidthScaleFactor // 约为字体大小的0.43倍
    let dataLength = estimateTextWidth(dataStr, chineseCharWidth, englishCharWidth)

    // 对于特殊模式，增加额外宽度以避免文本重叠
    if (containsSpecialPattern) {
      const extraPadding = Math.min(dataStr.length * 3 * charWidthScaleFactor, overallFontSize * charWidthScaleFactor)
      dataLength += extraPadding
    }

    maxDataLength = Math.max(maxDataLength, dataLength)
  })

  // 使用标题和数据的最大长度，加上内边距
  // 根据整体字体大小动态调整列内边距
  const basePadding = 20 // 基础内边距
  const fontSizeRatio = overallFontSize / 30 // 字体大小比例（30为基准）
  const dynamicPadding = Math.max(basePadding * fontSizeRatio, 15) // 最小15px内边距
  return Math.max(maxTitleLength, maxDataLength) + dynamicPadding
}
