/**
 * PNG导出功能
 */
import { inlineAllImages } from '@/utils/imageProcessor'
import { embedFontsInSVG } from '@/utils/fontEmbed'

export function useExport() {
  /**
   * 导出SVG为PNG
   * @param {SVGElement} svgElement - SVG元素
   * @param {string} filename - 导出的文件名
   * @param {boolean} includeWatermark - 是否包含水印，默认为true
   */
  const exportToPNG = async (svgElement, filename = 'f10-infographic.png', includeWatermark = true) => {
    if (!svgElement) {
      throw new Error('SVG元素不存在')
    }

    try {
      // 1. 克隆SVG元素以避免修改原始元素
      const clonedSvg = svgElement.cloneNode(true)

      // 2. 嵌入字体到SVG
      await embedFontsInSVG(clonedSvg)

      // 3. 如果不包含水印，移除水印元素
      if (!includeWatermark) {
        // 查找所有g元素，移除pointer-events="none"的水印组
        const groups = clonedSvg.querySelectorAll('g[pointer-events="none"]')
        groups.forEach(group => {
          // 检查是否包含水印图片
          const images = group.querySelectorAll('image')
          images.forEach(img => {
            const href = img.getAttribute('href') || img.getAttribute('xlink:href')
            if (href && href.includes('e43810d2b6ab0a3b19a85e29a8643e54.png')) {
              // 这是水印元素，移除整个group
              group.remove()
            }
          })
        })
      }

      // 4. 内联所有图片
      await inlineAllImages(clonedSvg)

      // 5. 获取SVG的尺寸
      const svgWidth = parseFloat(clonedSvg.getAttribute('width'))
      const svgHeight = parseFloat(clonedSvg.getAttribute('height'))

      // 6. 序列化SVG
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(clonedSvg)

      // 7. 创建Blob
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      // 8. 创建Image对象
      const img = new Image()
      img.width = svgWidth
      img.height = svgHeight

      return new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            // 9. 创建Canvas
            const canvas = document.createElement('canvas')
            canvas.width = svgWidth
            canvas.height = svgHeight

            const ctx = canvas.getContext('2d')
            if (!ctx) {
              throw new Error('无法获取Canvas上下文')
            }

            // 10. 绘制图片到Canvas
            ctx.drawImage(img, 0, 0)

            // 11. 转换为PNG Blob
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error('无法生成PNG'))
                return
              }

              // 12. 创建下载链接
              const pngUrl = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = pngUrl
              link.download = filename
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)

              // 13. 清理URL
              URL.revokeObjectURL(url)
              URL.revokeObjectURL(pngUrl)

              resolve()
            }, 'image/png')
          } catch (error) {
            reject(error)
          }
        }

        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('SVG加载失败'))
        }

        img.src = url
      })
    } catch (error) {
      console.error('导出PNG失败:', error)
      throw error
    }
  }

  /**
   * 导出压缩版PNG（控制文件大小在900KB以下）
   * @param {SVGElement} svgElement - SVG元素
   * @param {string} filename - 导出的文件名
   * @param {boolean} includeWatermark - 是否包含水印，默认为true
   */
  const exportCompressedPNG = async (svgElement, filename = 'f10-infographic-compressed.png', includeWatermark = true) => {
    if (!svgElement) {
      throw new Error('SVG元素不存在')
    }

    const TARGET_SIZE = 900 * 1024 // 900KB

    try {
      // 1. 克隆SVG元素以避免修改原始元素
      const clonedSvg = svgElement.cloneNode(true)

      // 2. 嵌入字体到SVG
      await embedFontsInSVG(clonedSvg)

      // 3. 如果不包含水印，移除水印元素
      if (!includeWatermark) {
        const groups = clonedSvg.querySelectorAll('g[pointer-events="none"]')
        groups.forEach(group => {
          const images = group.querySelectorAll('image')
          images.forEach(img => {
            const href = img.getAttribute('href') || img.getAttribute('xlink:href')
            if (href && href.includes('e43810d2b6ab0a3b19a85e29a8643e54.png')) {
              group.remove()
            }
          })
        })
      }

      // 4. 内联所有图片
      await inlineAllImages(clonedSvg)

      // 5. 获取SVG的尺寸
      const svgWidth = parseFloat(clonedSvg.getAttribute('width'))
      const svgHeight = parseFloat(clonedSvg.getAttribute('height'))

      // 6. 序列化SVG
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(clonedSvg)

      // 7. 创建Blob
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)

      // 8. 创建Image对象
      const img = new Image()
      img.width = svgWidth
      img.height = svgHeight

      return new Promise((resolve, reject) => {
        img.onload = async () => {
          try {
            // 尝试不同的压缩策略
            let finalBlob = null
            let finalScale = 1.0

            // 策略1: 使用JPEG格式，从高质量开始迭代降低
            for (let quality = 0.95; quality >= 0.5; quality -= 0.05) {
              const canvas = document.createElement('canvas')
              canvas.width = svgWidth
              canvas.height = svgHeight

              const ctx = canvas.getContext('2d')
              if (!ctx) {
                throw new Error('无法获取Canvas上下文')
              }

              // 使用白色背景（JPEG不支持透明度）
              ctx.fillStyle = '#FFFFFF'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0)

              const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/jpeg', quality)
              })

              if (blob && blob.size <= TARGET_SIZE) {
                finalBlob = blob
                console.log(`压缩成功：质量=${quality.toFixed(2)}, 大小=${(blob.size / 1024).toFixed(2)}KB`)
                break
              }
            }

            // 策略2: 如果JPEG质量降低到0.5还不够，尝试降低分辨率
            if (!finalBlob) {
              for (let scale = 0.9; scale >= 0.6; scale -= 0.05) {
                const canvas = document.createElement('canvas')
                canvas.width = Math.floor(svgWidth * scale)
                canvas.height = Math.floor(svgHeight * scale)

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                  throw new Error('无法获取Canvas上下文')
                }

                ctx.fillStyle = '#FFFFFF'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                const blob = await new Promise((resolve) => {
                  canvas.toBlob(resolve, 'image/jpeg', 0.85)
                })

                if (blob && blob.size <= TARGET_SIZE) {
                  finalBlob = blob
                  finalScale = scale
                  console.log(`压缩成功：缩放=${scale.toFixed(2)}, 质量=0.85, 大小=${(blob.size / 1024).toFixed(2)}KB`)
                  break
                }
              }
            }

            // 如果还是没有合适的，使用最激进的压缩
            if (!finalBlob) {
              const canvas = document.createElement('canvas')
              canvas.width = Math.floor(svgWidth * 0.6)
              canvas.height = Math.floor(svgHeight * 0.6)

              const ctx = canvas.getContext('2d')
              if (!ctx) {
                throw new Error('无法获取Canvas上下文')
              }

              ctx.fillStyle = '#FFFFFF'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

              finalBlob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/jpeg', 0.6)
              })
              finalScale = 0.6
              console.log(`使用最激进压缩：缩放=0.6, 质量=0.6, 大小=${finalBlob ? (finalBlob.size / 1024).toFixed(2) : 'N/A'}KB`)
            }

            if (!finalBlob) {
              reject(new Error('无法生成压缩后的图片'))
              return
            }

            // 创建下载链接
            const pngUrl = URL.createObjectURL(finalBlob)
            const link = document.createElement('a')
            link.href = pngUrl
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // 清理URL
            URL.revokeObjectURL(url)
            URL.revokeObjectURL(pngUrl)

            // 返回压缩信息
            resolve({
              size: finalBlob.size,
              sizeKB: (finalBlob.size / 1024).toFixed(2),
              scale: finalScale
            })
          } catch (error) {
            reject(error)
          }
        }

        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('SVG加载失败'))
        }

        img.src = url
      })
    } catch (error) {
      console.error('导出压缩PNG失败:', error)
      throw error
    }
  }

  return {
    exportToPNG,
    exportCompressedPNG
  }
}
