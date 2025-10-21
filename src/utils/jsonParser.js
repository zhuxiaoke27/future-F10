/**
 * JSON数据解析工具
 */

/**
 * 解析JSON数据
 * @param {string} jsonString - JSON字符串
 * @returns {Promise<Object>} - 解析结果
 */
export function parseJsonData(jsonString) {
  return new Promise((resolve, reject) => {
    try {
      // 解析JSON字符串
      const jsonData = JSON.parse(jsonString)

      // 验证数据结构
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('JSON数据格式无效')
      }

      if (!jsonData.table_datas || !Array.isArray(jsonData.table_datas)) {
        throw new Error('JSON数据中缺少table_datas数组')
      }

      if (jsonData.table_datas.length === 0) {
        throw new Error('table_datas数组为空')
      }

      // 获取第一行数据来确定列名
      const firstRow = jsonData.table_datas[0]
      const headers = Object.keys(firstRow)

      if (headers.length < 2) {
        throw new Error('数据至少需要包含两列')
      }

      console.log('JSON数据解析成功:', {
        rows: jsonData.table_datas.length,
        columns: headers.length,
        headers: headers
      })

      // 返回与Excel解析相同格式的数据结构
      resolve({
        data: jsonData.table_datas,
        headers: headers,
        sheetName: 'JSON数据',
        rowCount: jsonData.table_datas.length,
        columnCount: headers.length
      })

    } catch (parseError) {
      console.error('解析JSON数据时出错:', parseError)
      reject(new Error('解析JSON数据失败: ' + parseError.message))
    }
  })
}
