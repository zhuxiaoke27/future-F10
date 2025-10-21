/**
 * 数据解析组合式函数
 */
import { ref } from 'vue'
import { readExcelFile } from '@/utils/excelReader'
import { parseJsonData } from '@/utils/jsonParser'
import { preloadImage } from '@/utils/imageProcessor'

export function useDataParser() {
  // 数据状态
  const parsedData = ref(null)
  const companyLogosMap = ref(new Map())
  const mainImageSrc = ref(null)
  const isLoading = ref(false)
  const loadingMessage = ref('')
  const loadingProgress = ref('')

  /**
   * 更新加载进度
   */
  const updateLoadingProgress = (message, progress) => {
    loadingMessage.value = message
    loadingProgress.value = progress
  }

  /**
   * 读取图片为DataURL
   */
  const readImageAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * 解析公司Logo数据
   */
  const parseCompanyLogos = (logosDataString) => {
    if (!logosDataString || !logosDataString.trim()) {
      return { logosMap: new Map(), logoUrls: [] }
    }

    try {
      const companyLogos = JSON.parse(logosDataString)
      const logosMap = new Map()
      const logoUrls = []

      companyLogos.forEach(company => {
        if (company.name && company.company_logo) {
          logosMap.set(company.name, company.company_logo)
          logoUrls.push(company.company_logo)
        }
      })

      return { logosMap, logoUrls }
    } catch (error) {
      console.error('解析公司Logo数据时出错:', error)
      throw new Error('公司Logo数据格式有误，请检查JSON格式')
    }
  }

  /**
   * 处理数据源（Excel或JSON）
   */
  const processDataSource = async (dataSource, excelFile, jsonDataString) => {
    if (dataSource === 'excel') {
      if (!excelFile) {
        throw new Error('请上传Excel数据文件')
      }
      updateLoadingProgress('正在读取Excel文件...', '解析Excel数据')
      return await readExcelFile(excelFile)
    } else if (dataSource === 'json') {
      if (!jsonDataString || !jsonDataString.trim()) {
        throw new Error('请输入JSON数据')
      }
      updateLoadingProgress('正在解析JSON数据...', '处理JSON格式数据')
      return await parseJsonData(jsonDataString)
    }
  }

  /**
   * 解析所有数据
   */
  const parseAllData = async (options) => {
    const {
      dataSource,
      excelFile,
      jsonDataString,
      mainImageFile,
      companyLogosData
    } = options

    isLoading.value = true

    try {
      updateLoadingProgress('正在处理文件...', '验证文件格式完成')

      // 验证图片文件（如果有）
      if (mainImageFile) {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (!validImageTypes.includes(mainImageFile.type)) {
          throw new Error('请选择有效的图片文件（JPG、PNG、GIF或WebP格式）')
        }

        const maxImageSize = 10 * 1024 * 1024
        if (mainImageFile.size > maxImageSize) {
          throw new Error('图片文件大小超过限制（最大10MB）')
        }
      }

      // 解析公司Logo数据
      const { logosMap, logoUrls } = parseCompanyLogos(companyLogosData)
      companyLogosMap.value = logosMap

      // 处理图片、数据和预加载Logo
      const promises = [
        mainImageFile ? (() => {
          updateLoadingProgress('正在读取图片...', '处理主图片文件')
          return readImageAsDataURL(mainImageFile)
        })() : Promise.resolve(null),
        processDataSource(dataSource, excelFile, jsonDataString),
        // 预加载所有公司Logo图片
        ...logoUrls.map((url, index) => {
          if (index === 0) {
            updateLoadingProgress('正在加载公司Logo...', `加载Logo图片 (${logoUrls.length}个)`)
          }
          return preloadImage(url).catch(() => null)
        })
      ]

      const results = await Promise.all(promises)

      mainImageSrc.value = results[0]
      const dataResult = results[1]

      // 验证返回的数据结构
      if (!dataResult || typeof dataResult !== 'object') {
        throw new Error('数据解析结果无效')
      }

      // 检查数据是否有效
      if (!dataResult.data || !Array.isArray(dataResult.data) || dataResult.data.length === 0) {
        const dataSourceName = dataSource === 'excel' ? 'Excel文件' : 'JSON数据'
        throw new Error(`${dataSourceName}中没有找到有效数据，请检查数据内容`)
      }

      // 检查数据列数
      if (dataResult.columnCount < 2) {
        const dataSourceName = dataSource === 'excel' ? 'Excel文件' : 'JSON数据'
        throw new Error(`${dataSourceName}至少需要包含两列数据，当前只有${dataResult.columnCount}列`)
      }

      // 验证表头数据
      if (!dataResult.headers || !Array.isArray(dataResult.headers)) {
        console.warn('表头数据无效，使用默认表头')
        dataResult.headers = Object.keys(dataResult.data[0])
      }

      parsedData.value = dataResult

      updateLoadingProgress('数据处理完成', '准备渲染')

      return {
        data: dataResult,
        mainImageSrc: mainImageSrc.value,
        companyLogosMap: companyLogosMap.value
      }

    } catch (error) {
      console.error('解析数据时出错:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    parsedData,
    companyLogosMap,
    mainImageSrc,
    isLoading,
    loadingMessage,
    loadingProgress,
    parseAllData,
    updateLoadingProgress
  }
}
