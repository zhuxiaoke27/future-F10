/**
 * 文本区域渲染模块
 * 负责渲染副标题和主图片之间的文本内容
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染文本区域
 */
export function renderTextArea(container, layout, textAreaContent, textAreaFontSize) {
  if (!textAreaContent || !textAreaContent.trim()) {
    return
  }

  const { padding, textAreaY } = layout
  const textAreaLines = textAreaContent.split('\n')

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
