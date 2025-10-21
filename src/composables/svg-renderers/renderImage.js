/**
 * 主图片渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染主图片
 */
export function renderMainImage(container, layout, mainImageSrc, showMainImage) {
  if (!mainImageSrc || !showMainImage) {
    return
  }

  const { padding, imageY, imageWidth, imageHeight } = layout

  // 添加圆角剪裁路径
  const clipPath = createSVGElement('clipPath', { id: 'roundedCorner' })
  const clipRect = createSVGElement('rect', {
    x: padding + 28,
    y: imageY,
    width: imageWidth,
    height: imageHeight,
    rx: 20,
    ry: 20
  })
  clipPath.appendChild(clipRect)
  container.appendChild(clipPath)

  // 主图片
  const mainImage = createSVGElement('image', {
    x: padding + 28,
    y: imageY,
    width: imageWidth,
    height: imageHeight,
    href: mainImageSrc,
    preserveAspectRatio: 'xMidYMid meet',
    'clip-path': 'url(#roundedCorner)'
  })
  container.appendChild(mainImage)
}

/**
 * 渲染装饰线
 */
export function renderDecorativeLine(container, layout) {
  const { padding, decorativeLineY, svgWidth } = layout

  const decorativeLine = createSVGElement('line', {
    x1: padding + 28,
    y1: decorativeLineY,
    x2: svgWidth - padding - 30,
    y2: decorativeLineY,
    stroke: '#aaa',
    'stroke-width': '2',
    'stroke-dasharray': '5,3'
  })
  container.appendChild(decorativeLine)
}
