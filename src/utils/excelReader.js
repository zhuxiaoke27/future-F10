/**
 * Excel文件读取工具
 */
import * as XLSX from 'xlsx'

/**
 * 检查XLSX库是否已加载
 * @returns {Promise<boolean>}
 */
export function checkXLSXLibrary() {
  return new Promise((resolve, reject) => {
    // 立即检查XLSX是否已定义
    if (typeof XLSX !== 'undefined' && XLSX.read && typeof XLSX.read === 'function') {
      resolve(true)
      return
    }

    // 等待一段时间后再次检查
    let attempts = 0
    const maxAttempts = 20
    const checkInterval = setInterval(() => {
      attempts++
      if (
        typeof XLSX !== 'undefined' &&
        XLSX.read && typeof XLSX.read === 'function' &&
        XLSX.utils && typeof XLSX.utils.sheet_to_json === 'function'
      ) {
        clearInterval(checkInterval)
        console.log('XLSX库检查通过，所有必要方法可用')
        resolve(true)
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        const errorMsg = typeof XLSX === 'undefined'
          ? 'XLSX库未加载'
          : 'XLSX库加载不完整，缺少必要方法'
        reject(new Error(`${errorMsg}，请检查网络连接或刷新页面重试`))
      }
    }, 300)
  })
}

/**
 * 验证Excel文件格式
 * @param {File} file - 文件对象
 * @returns {boolean}
 */
export function validateExcelFile(file) {
  const validExtensions = ['.xlsx', '.xls']
  const validMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/octet-stream'
  ]

  const fileName = file.name.toLowerCase()
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext))
  const hasValidMimeType = validMimeTypes.includes(file.type)

  if (!hasValidExtension && !hasValidMimeType) {
    throw new Error('请选择有效的Excel文件（.xlsx或.xls格式）')
  }

  // 检查文件大小（限制为50MB）
  const maxSize = 50 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error('文件大小超过限制（最大50MB）')
  }

  return true
}

/**
 * 读取Excel文件并解析数据
 * @param {File} file - Excel文件
 * @returns {Promise<Object>} - 解析结果
 */
export async function readExcelFile(file) {
  return new Promise(async (resolve, reject) => {
    let timeoutId = null

    try {
      // 设置总体超时机制（30秒）
      timeoutId = setTimeout(() => {
        reject(new Error('Excel文件处理超时，请检查文件大小或网络状况'))
      }, 30000)

      // 1. 验证文件格式
      validateExcelFile(file)

      // 2. 增强的浏览器兼容性检查
      if (!window.FileReader) {
        throw new Error('您的浏览器不支持文件读取功能，请使用Chrome 6+、Firefox 3.6+或Safari 6+')
      }

      // 3. 检查ArrayBuffer支持
      if (!window.ArrayBuffer) {
        throw new Error('您的浏览器不支持ArrayBuffer，请升级到更新版本的浏览器')
      }

      const reader = new FileReader()

      reader.onload = function(e) {
        try {
          // 清除超时定时器
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }

          const data = e.target.result

          // 验证读取的数据
          if (!data || data.byteLength === 0) {
            throw new Error('文件读取失败：文件内容为空')
          }

          // 使用ArrayBuffer读取
          let workbook
          try {
            workbook = XLSX.read(data, {
              type: 'array',
              cellDates: true,
              cellNF: true,
              cellText: true,
              bookVBA: false,
              password: undefined
            })
          } catch (xlsxError) {
            console.error('XLSX解析错误:', xlsxError)
            throw new Error(`Excel文件解析失败: ${xlsxError.message || '未知错误'}`)
          }

          // 检查工作簿是否有效
          if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error('Excel文件无效或不包含工作表')
          }

          // 获取第一个工作表
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          if (!worksheet) {
            throw new Error('无法读取工作表数据')
          }

          // 检查工作表是否为空
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1')
          if (range.e.r < range.s.r || range.e.c < range.s.c) {
            throw new Error('工作表为空，请确保Excel文件包含数据')
          }

          // 获取表头行并处理可能的换行符
          let rawHeaderRow
          try {
            const headerData = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: '',
              range: 0
            })
            rawHeaderRow = headerData[0] || []
          } catch (headerError) {
            console.warn('读取表头时出现问题:', headerError)
            rawHeaderRow = []
          }

          // 处理表头中可能的换行符
          const headerRow = rawHeaderRow.map(header => {
            if (header && typeof header === 'string') {
              return header.replace(/\r\n|\r|\n/g, '\n').trim()
            }
            return header
          })

          // 解析数据
          let jsonData
          try {
            jsonData = XLSX.utils.sheet_to_json(worksheet, {
              raw: false,
              defval: '',
              blankrows: false,
              dateNF: 'yyyy-mm-dd',
              cellText: true,
              cellDates: true
            })
          } catch (dataError) {
            console.error('数据解析错误详情:', dataError)
            throw new Error(`解析Excel数据时出错: ${dataError.message || '数据格式不支持'}`)
          }

          // 验证数据有效性
          if (!jsonData || jsonData.length === 0) {
            throw new Error('Excel文件中没有找到有效数据')
          }

          // 检查数据结构
          const firstRow = jsonData[0]
          const columnCount = Object.keys(firstRow).length
          if (columnCount < 2) {
            throw new Error('Excel文件至少需要包含两列数据')
          }

          console.log('Excel文件读取成功:', {
            rows: jsonData.length,
            columns: columnCount,
            headers: headerRow
          })

          // 返回包含数据和列名的对象
          resolve({
            data: jsonData,
            headers: headerRow,
            sheetName: firstSheetName,
            rowCount: jsonData.length,
            columnCount: columnCount
          })

        } catch (parseError) {
          console.error('解析Excel文件时出错:', parseError)
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
          reject(new Error(`解析Excel文件失败: ${parseError.message || '未知解析错误'}`))
        }
      }

      reader.onerror = function(error) {
        console.error('文件读取错误:', error)
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        reject(new Error('文件读取失败，可能是文件损坏或浏览器兼容性问题，请重试'))
      }

      reader.onabort = function() {
        console.warn('文件读取被中断')
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        reject(new Error('文件读取被中断'))
      }

      // 使用ArrayBuffer读取文件
      try {
        reader.readAsArrayBuffer(file)
      } catch (readError) {
        console.error('启动文件读取失败:', readError)
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        reject(new Error(`无法读取文件: ${readError.message || '浏览器不支持此文件格式'}`))
      }

    } catch (error) {
      console.error('readExcelFile初始化错误:', error)
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      reject(error)
    }
  })
}
