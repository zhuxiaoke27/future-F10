/**
 * 水印渲染模块
 */
import { createSVGElement } from '@/utils/svgHelpers'

/**
 * 渲染平铺图片水印
 */
export function renderWatermark(container, layout) {
  const { svgWidth, svgHeight } = layout

  // 水印图片URL
  const watermarkUrl = 'https://u.thsi.cn/imgsrc/share/e43810d2b6ab0a3b19a85e29a8643e54.png'

  // 创建水印组
  const watermarkGroup = createSVGElement('g', {
    'pointer-events': 'none'
  })
  container.appendChild(watermarkGroup)

  // 加载水印图片并平铺
  const tempImg = new Image()
  tempImg.onload = function() {
    const watermarkWidth = svgWidth
    const watermarkHeight = tempImg.height * (svgWidth / tempImg.width)
    const numWatermarks = Math.ceil(svgHeight / watermarkHeight)

    for (let i = 0; i < numWatermarks; i++) {
      const watermark = createSVGElement('image', {
        x: 0,
        y: i * watermarkHeight,
        width: watermarkWidth,
        height: watermarkHeight,
        href: watermarkUrl
      })

      // 如果是最后一个水印且超出边界,添加裁剪
      if (i === numWatermarks - 1 && (i + 1) * watermarkHeight > svgHeight) {
        const clipPathId = `watermark-clip-${i}`
        const clipPath = createSVGElement('clipPath', { id: clipPathId })

        const clipRect = createSVGElement('rect', {
          x: 0,
          y: i * watermarkHeight,
          width: watermarkWidth,
          height: svgHeight - (i * watermarkHeight)
        })

        clipPath.appendChild(clipRect)
        container.appendChild(clipPath)

        watermark.setAttribute('clip-path', `url(#${clipPathId})`)
      }

      watermarkGroup.appendChild(watermark)
    }
  }

  tempImg.onerror = function() {
    // 加载失败时显示单个水印
    const watermark = createSVGElement('image', {
      x: 0,
      y: 0,
      width: svgWidth,
      height: svgHeight,
      href: watermarkUrl
    })
    watermarkGroup.appendChild(watermark)
  }

  tempImg.src = watermarkUrl
}
