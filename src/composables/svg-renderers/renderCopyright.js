/**
 * 版权文案渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染版权文案和底部Logo
 */
export function renderCopyright(container, layout, copyright) {
  const { svgWidth, padding, ticketBottomY } = layout

  // 计算版权文案位置(在小票外层背景上)
  const copyrightY = ticketBottomY + 40
  const copyrightLines = copyright.split('\n').filter(line => line.trim())
  const copyrightHeight = copyrightLines.length * 25
  const copyrightCenterY = copyrightY + (copyrightHeight / 2) - 12

  // 渲染版权文案(白色文字)
  copyrightLines.forEach((line, index) => {
    const text = createSVGElement('text', {
      x: padding + 28,
      y: copyrightY + (index * 25),
      'font-size': '16',
      'font-family': 'MiSans-Medium, sans-serif',
      fill: '#ffffff',
      'text-anchor': 'start'
    })
    text.textContent = line
    container.appendChild(text)
  })

  // 渲染右下角底部Logo(竖向logo)
  const logoHeight = 80
  const logoWidth = 80
  const bottomLogo = createSVGElement('image', {
    x: svgWidth - padding - 120,
    y: copyrightCenterY - (logoHeight / 2),
    width: logoWidth,
    height: logoHeight,
    href: 'https://u.thsi.cn/imgsrc/share/adf57bcec02bb904eaf1c23cfc9fa841.png',
    preserveAspectRatio: 'xMidYMid meet'
  })
  container.appendChild(bottomLogo)
}
