/**
 * 背景渲染模块
 * 负责渲染外层背景、小票路径、渐变和滤镜定义
 */
import { createSVGElement, createTicketPath, createLinearGradient, createShadowFilter, createImagePattern } from '@/utils/svgHelpers'

/**
 * 创建SVG定义（渐变、滤镜、图案）
 */
export function createSVGDefs(container, layout, colors, insideBgSrc, positiveBarColor, negativeBarColor) {
  const { innerWidth, innerHeight } = layout
  const { gradientDeepColor, gradientLightColor } = colors

  const defs = createSVGElement('defs')

  // 内层背景图片模式
  const insideBgPattern = createImagePattern('insideBg', insideBgSrc, innerWidth, innerHeight)
  defs.appendChild(insideBgPattern)

  // 阴影滤镜
  const shadowFilter = createShadowFilter('ticketShadow')
  defs.appendChild(shadowFilter)

  // 副标题渐变（垂直）
  const subtitleGradient = createLinearGradient('subtitleGradient', gradientDeepColor, gradientLightColor, 'vertical')
  defs.appendChild(subtitleGradient)

  // 柱状图渐变（水平）
  const barGradient = createLinearGradient('barGradient', gradientDeepColor, gradientLightColor, 'horizontal')
  defs.appendChild(barGradient)

  // 正值柱状图渐变
  const positiveBarGradient = createLinearGradient('positiveBarGradient', positiveBarColor, positiveBarColor + 'CC', 'horizontal')
  defs.appendChild(positiveBarGradient)

  // 负值柱状图渐变
  const negativeBarGradient = createLinearGradient('negativeBarGradient', negativeBarColor, negativeBarColor + 'CC', 'horizontal')
  defs.appendChild(negativeBarGradient)

  container.appendChild(defs)
}

/**
 * 渲染外层背景
 */
export function renderOuterBackground(container, layout, outerBgColor) {
  const { svgWidth, svgHeight } = layout

  const outerBackground = createSVGElement('rect', {
    width: svgWidth,
    height: svgHeight,
    fill: outerBgColor
  })
  container.appendChild(outerBackground)
}

/**
 * 渲染内层小票背景
 */
export function renderInnerTicket(container, layout, toothSize, decorativeLineY) {
  const { padding, innerWidth, innerHeight } = layout

  const ticketPath = createTicketPath(padding, padding, innerWidth, innerHeight, toothSize, decorativeLineY)
  const innerBackground = createSVGElement('path', {
    d: ticketPath,
    fill: 'url(#insideBg)',
    filter: 'url(#ticketShadow)'
  })
  container.appendChild(innerBackground)
}
