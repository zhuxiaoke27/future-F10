/**
 * 字体嵌入工具
 * 用于在SVG导出时嵌入字体
 */

/**
 * 将字体文件转换为base64
 */
async function fontToBase64(fontUrl) {
  try {
    const response = await fetch(fontUrl)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error(`Failed to load font: ${fontUrl}`, error)
    return null
  }
}

/**
 * 在SVG中嵌入字体样式
 */
export async function embedFontsInSVG(svgElement) {
  try {
    // 字体文件路径映射
    const fonts = [
      { family: 'MiSans-Bold', url: '/MiSans/MiSans-Bold.ttf', weight: 700 },
      { family: 'MiSans-DemiBold', url: '/MiSans/MiSans-Demibold.ttf', weight: 600 },
      { family: 'MiSans-SemiBold', url: '/MiSans/MiSans-Semibold.ttf', weight: 600 },
      { family: 'MiSans-Medium', url: '/MiSans/MiSans-Medium.ttf', weight: 500 }
    ]

    // 转换所有字体为base64
    console.log('开始嵌入字体...')
    const fontPromises = fonts.map(async (font) => {
      const base64 = await fontToBase64(font.url)
      if (base64) {
        return `
          @font-face {
            font-family: '${font.family}';
            src: url('${base64}') format('truetype');
            font-weight: ${font.weight};
            font-style: normal;
          }
        `
      }
      return ''
    })

    const fontFaces = await Promise.all(fontPromises)
    const fontCSS = fontFaces.filter(f => f).join('\n')

    if (!fontCSS) {
      console.warn('未能加载任何字体')
      return
    }

    // 查找或创建defs元素
    let defs = svgElement.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      svgElement.insertBefore(defs, svgElement.firstChild)
    }

    // 创建style元素并添加字体定义
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    style.setAttribute('type', 'text/css')
    style.textContent = fontCSS

    // 将style元素插入到defs的最前面
    defs.insertBefore(style, defs.firstChild)

    console.log('字体嵌入完成')
  } catch (error) {
    console.error('嵌入字体时出错:', error)
    throw error
  }
}
