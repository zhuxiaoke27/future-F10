/**
 * 头部Logo渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染账号Logo
 */
export function renderAccountLogo(container, layout, accountLogoSrc) {
  const { padding, headerY, svgWidth } = layout

  const logoImage = createSVGElement('image', {
    x: padding + 28,
    y: headerY + 20,
    width: svgWidth - (padding + 28) * 2,
    height: 50,
    href: accountLogoSrc,
    preserveAspectRatio: 'xMinYMid meet'
  })
  container.appendChild(logoImage)
}
