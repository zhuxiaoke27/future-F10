/**
 * 颜色处理工具函数
 */

/**
 * 检查是否为有效的十六进制颜色代码
 * @param {string} color - 颜色值
 * @returns {boolean}
 */
export function isValidHexColor(color) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color)
}

/**
 * 从十六进制输入更新颜色选择器
 * @param {string} hexValue - 十六进制颜色值
 * @returns {string} - 格式化后的颜色值
 */
export function updateColorFromHexInput(hexValue) {
  let value = hexValue

  // 如果不以#开头，添加#
  if (value && !value.startsWith('#')) {
    value = '#' + value
  }

  return value
}

/**
 * 格式化十六进制输入
 * @param {string} hexValue - 十六进制颜色值
 * @param {string} fallback - 回退颜色值
 * @returns {string} - 格式化后的颜色值
 */
export function formatHexInput(hexValue, fallback) {
  let value = hexValue.trim()

  // 如果为空，使用回退值
  if (!value) {
    return fallback
  }

  // 如果不以#开头，添加#
  if (!value.startsWith('#')) {
    value = '#' + value
  }

  // 验证是否为有效的颜色代码
  if (isValidHexColor(value)) {
    return value.toLowerCase() // 统一使用小写
  } else {
    // 如果无效，返回回退值
    return fallback
  }
}
