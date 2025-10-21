/**
 * 图片处理工具
 * 将图片URL转换为Base64数据
 */

/**
 * 将图片URL转换为base64数据
 * @param {string} imageUrl - 图片URL
 * @returns {Promise<string>} - Base64数据URL
 */
export function convertImageToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    // 如果已经是base64格式，直接返回
    if (imageUrl && imageUrl.startsWith('data:image')) {
      resolve(imageUrl)
      return
    }

    // 确保使用HTTPS协议
    let processedUrl = imageUrl
    if (imageUrl && imageUrl.startsWith('http://')) {
      processedUrl = imageUrl.replace('http://', 'https://')
      console.log('已将HTTP URL转换为HTTPS:', processedUrl)
    }

    // 对于本地文件使用XMLHttpRequest加载
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        const reader = new FileReader()
        reader.onloadend = function() {
          resolve(reader.result)
        }
        reader.onerror = function() {
          console.error('无法转换图片:', processedUrl)
          // 如果转换失败，返回原始URL
          resolve(imageUrl)
        }
        reader.readAsDataURL(xhr.response)
      } else {
        console.error('图片加载失败，状态码:', xhr.status, processedUrl)
        resolve(imageUrl)
      }
    }
    xhr.onerror = function() {
      console.error('无法加载图片:', processedUrl)
      // 如果HTTPS加载失败且原始是HTTP，尝试使用原始URL
      if (processedUrl !== imageUrl) {
        console.log('HTTPS加载失败，尝试使用原始HTTP URL')
        // 递归调用，但这次使用原始URL
        convertImageToBase64(imageUrl).then(resolve).catch(() => resolve(imageUrl))
      } else {
        // 如果加载失败，返回原始URL
        resolve(imageUrl)
      }
    }

    try {
      xhr.open('GET', processedUrl)
      xhr.responseType = 'blob'
      // 设置超时时间
      xhr.timeout = 10000 // 10秒超时
      xhr.ontimeout = function() {
        console.error('图片加载超时:', processedUrl)
        resolve(imageUrl)
      }
      xhr.send()
    } catch (e) {
      console.error('请求图片出错:', e)
      resolve(imageUrl)
    }
  })
}

/**
 * 内联SVG中的所有图片
 * @param {SVGElement} svgElement - SVG元素
 * @returns {Promise<SVGElement>} - 处理后的SVG元素
 */
export async function inlineAllImages(svgElement) {
  if (!svgElement || svgElement.tagName !== 'svg') {
    throw new Error('提供的元素不是有效的SVG元素')
  }

  // 获取所有图片元素
  const images = svgElement.querySelectorAll('image')

  // 转换所有图片
  const imagePromises = Array.from(images).map(async (img) => {
    const href = img.getAttribute('href') || img.getAttribute('xlink:href')
    if (!href) return

    try {
      const dataUrl = await convertImageToBase64(href)
      // 更新图片链接为base64数据
      img.setAttribute('href', dataUrl)
      if (img.hasAttribute('xlink:href')) {
        img.setAttribute('xlink:href', dataUrl)
      }
    } catch (error) {
      console.error('转换图片失败:', href, error)
    }
  })

  // 等待所有图片转换完成
  await Promise.all(imagePromises)

  return svgElement
}

/**
 * 将SVG字符串中的图片内联化
 * @param {string} svgString - SVG字符串
 * @returns {Promise<string>} - 处理后的SVG字符串
 */
export async function inlineSVGString(svgString) {
  // 解析SVG字符串为DOM
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgElement = svgDoc.documentElement

  // 内联所有图片
  await inlineAllImages(svgElement)

  // 序列化回字符串
  const serializer = new XMLSerializer()
  return serializer.serializeToString(svgElement)
}

/**
 * 预加载图片
 * @param {string} src - 图片源
 * @returns {Promise<string>} - 图片源
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => reject(new Error(`无法加载图片: ${src}`))
    img.src = src
  })
}
