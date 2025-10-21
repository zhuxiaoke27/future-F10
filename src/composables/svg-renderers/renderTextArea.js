/**
 * 文本区域渲染模块
 * 负责渲染副标题和主图片之间的文本内容
 */
import { createSVGElement } from '@/utils/svgHelpers'
import { wrapText } from '@/utils/textMeasure'

/**
 * 渲染文本区域
 */
export function renderTextArea(container, layout, textAreaContent, textAreaFontSize) {
  if (!textAreaContent || !textAreaContent.trim()) {
    return
  }

  const { padding, textAreaY, svgWidth } = layout

  // 计算文本区域的最大宽度
  // 文字起始位置 x = padding + 28
  // 右边界 = svgWidth - padding - 安全边距
  // 可用宽度 = 右边界 - 起始位置
  const textStartX = padding + 28
  const rightBoundary = svgWidth - padding - 40 // 额外40px安全边距，防止字体渲染溢出
  const maxTextWidth = rightBoundary - textStartX

  // 使用自动换行函数处理文本
  const textAreaLines = wrapText(textAreaContent, maxTextWidth, textAreaFontSize)

  textAreaLines.forEach((line, index) => {
    if (line.trim()) {
      const textAreaElement = createSVGElement('text', {
        x: padding + 28,
        y: textAreaY + (index * (textAreaFontSize + 5)) + textAreaFontSize,
        'font-size': textAreaFontSize,
        'font-weight': 'normal',
        'font-family': 'MiSans-Medium, sans-serif',
        fill: 'url(#subtitleGradient)'
      })
      textAreaElement.textContent = line
      container.appendChild(textAreaElement)
    }
  })
}
