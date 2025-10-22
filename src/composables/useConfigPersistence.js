/**
 * 配置持久化工具
 * 负责配置的保存、恢复、导入、导出功能
 */

const STORAGE_KEY = 'f10-config-v1'
const CONFIG_VERSION = '1.0.0'

// 需要排除的字段（文件对象和大文本数据）
const EXCLUDED_FIELDS = [
  'mainImageFile',
  'excelFile',
  'jsonDataInput',
  'companyLogosInput'
]

/**
 * 过滤配置对象，移除不需要保存的字段
 */
function filterConfig(config) {
  const filtered = {}

  for (const key in config) {
    // 跳过排除的字段
    if (EXCLUDED_FIELDS.includes(key)) {
      continue
    }

    // 只保存基本类型和简单对象
    const value = config[key]
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      filtered[key] = value
    }
  }

  return filtered
}

/**
 * 保存配置到 LocalStorage
 */
export function saveConfig(config) {
  try {
    const filteredConfig = filterConfig(config)
    const configData = {
      version: CONFIG_VERSION,
      timestamp: new Date().toISOString(),
      config: filteredConfig
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(configData))
    console.log('✅ 配置已保存到 LocalStorage')
    return { success: true }
  } catch (error) {
    console.error('❌ 保存配置失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 从 LocalStorage 恢复配置
 */
export function loadConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      console.log('ℹ️ 未找到保存的配置')
      return { success: false, data: null }
    }

    const configData = JSON.parse(stored)

    // 版本检查（未来可以做配置迁移）
    if (configData.version !== CONFIG_VERSION) {
      console.warn('⚠️ 配置版本不匹配，使用默认配置')
      return { success: false, data: null }
    }

    console.log(`✅ 配置已恢复（保存于 ${configData.timestamp}）`)
    return { success: true, data: configData.config }
  } catch (error) {
    console.error('❌ 恢复配置失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 导出配置为 JSON 文件
 */
export function exportConfigFile(config) {
  try {
    const filteredConfig = filterConfig(config)
    const configData = {
      version: CONFIG_VERSION,
      timestamp: new Date().toISOString(),
      config: filteredConfig
    }

    const jsonStr = JSON.stringify(configData, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    // 创建下载链接
    const link = document.createElement('a')
    link.href = url
    link.download = `f10-config-${new Date().getTime()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 释放 URL
    URL.revokeObjectURL(url)

    console.log('✅ 配置文件已导出')
    return { success: true }
  } catch (error) {
    console.error('❌ 导出配置失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 从文件导入配置
 */
export function importConfigFile(file) {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const configData = JSON.parse(e.target.result)

          // 验证配置格式
          if (!configData.version || !configData.config) {
            throw new Error('配置文件格式不正确')
          }

          // 版本检查
          if (configData.version !== CONFIG_VERSION) {
            console.warn('⚠️ 配置文件版本不匹配，尝试导入')
          }

          console.log(`✅ 配置文件已导入（创建于 ${configData.timestamp}）`)
          resolve({ success: true, data: configData.config })
        } catch (error) {
          console.error('❌ 解析配置文件失败:', error)
          resolve({ success: false, error: error.message })
        }
      }

      reader.onerror = () => {
        console.error('❌ 读取文件失败')
        resolve({ success: false, error: '读取文件失败' })
      }

      reader.readAsText(file)
    } catch (error) {
      console.error('❌ 导入配置失败:', error)
      resolve({ success: false, error: error.message })
    }
  })
}

/**
 * 清除保存的配置
 */
export function clearConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('✅ 已清除保存的配置')
    return { success: true }
  } catch (error) {
    console.error('❌ 清除配置失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 检查是否有保存的配置
 */
export function hasStoredConfig() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}
