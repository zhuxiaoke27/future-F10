/**
 * 标题渲染模块
 * 负责渲染主标题和副标题（支持[[文本]]格式的渐变色标记）
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 解析标题中的特殊标记
 * @param {string} text - 标题文本
 * @returns {Array} - 解析后的文本段落数组
 */
function parseTitleWithHighlight(text) {
  const parts = []
  const regex = /\[\[(.*?)\]\]/g
  let match
  let lastIndex = 0

  while ((match = regex.exec(text)) !== null) {
    // 添加标记前的普通文本
    if (match.index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, match.index),
        isHighlighted: false
      })
    }

    // 添加高亮文本
    parts.push({
      text: match[1],
      isHighlighted: true
    })

    lastIndex = match.index + match[0].length
  }

  // 添加剩余的普通文本
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      isHighlighted: false
    })
  }

  // 如果没有特殊标记，返回整个文本
  if (parts.length === 0) {
    parts.push({
      text: text,
      isHighlighted: false
    })
  }

  return parts
}

/**
 * 渲染主标题
 */
export function renderMainTitle(container, layout, mainTitle, titleFontSize) {
  const { padding, titleY } = layout

  const mainTitleParts = parseTitleWithHighlight(mainTitle)

  const mainTitleElement = createSVGElement('text', {
    x: padding + 28,
    y: titleY,
    'font-size': titleFontSize,
    'font-weight': 'bold',
    'font-family': 'MiSans-Bold, sans-serif'
  })

  mainTitleParts.forEach(part => {
    const tspan = createSVGElement('tspan')
    tspan.textContent = part.text
    tspan.setAttribute('fill', part.isHighlighted ? 'url(#subtitleGradient)' : '#000000')
    mainTitleElement.appendChild(tspan)
  })

  container.appendChild(mainTitleElement)
}

/**
 * 渲染副标题
 */
export function renderSubtitle(container, layout, subtitle, subtitleFontSize) {
  const { padding, titleY } = layout

  const subtitleParts = parseTitleWithHighlight(subtitle)

  const subtitleElement = createSVGElement('text', {
    x: padding + 28,
    y: titleY + 130,
    'font-size': subtitleFontSize,
    'font-weight': 'bold',
    'font-family': 'MiSans-Bold, sans-serif'
  })

  subtitleParts.forEach(part => {
    const tspan = createSVGElement('tspan')
    tspan.textContent = part.text
    tspan.setAttribute('fill', part.isHighlighted ? 'url(#subtitleGradient)' : '#000000')
    subtitleElement.appendChild(tspan)
  })

  container.appendChild(subtitleElement)
}
