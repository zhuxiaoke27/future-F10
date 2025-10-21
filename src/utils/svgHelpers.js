/**
 * SVG辅助函数
 */

/**
 * 创建SVG元素
 * @param {string} tagName - SVG标签名
 * @param {Object} attributes - 属性对象
 * @returns {SVGElement} - SVG元素
 */
export function createSVGElement(tagName, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName)
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  return element
}

/**
 * 创建小票锯齿边缘的路径
 * @param {number} x - 起始x坐标
 * @param {number} y - 起始y坐标
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {number} toothSize - 锯齿大小
 * @param {number} decorativeLineY - 装饰线Y坐标
 * @returns {string} - SVG路径字符串
 */
export function createTicketPath(x, y, width, height, toothSize, decorativeLineY) {
  // 固定锯齿深度为常量，不随toothSize变化
  const toothDepth = 20

  // 为了确保两侧都完全对称，计算锯齿数量时需要注意
  // 两端都应该是锯齿的"峰"
  // 计算需要绘制的完整"峰-谷-峰"单元数量
  const fullToothCount = Math.floor((width) / toothSize)

  // 调整实际锯齿大小以均匀分布
  const adjustedToothSize = width / fullToothCount

  // 从左上角开始路径（第一个峰的顶点）
  let path = `M ${x},${y}`

  // 遍历绘制所有锯齿
  for (let i = 0; i < fullToothCount; i++) {
    // 计算当前锯齿的起始x坐标
    const startX = x + (i * adjustedToothSize)

    // 绘制从峰到谷（向下）
    path += ` L ${startX + (adjustedToothSize / 2)},${y + toothDepth}`

    // 绘制从谷到下一个峰（向上），如果不是最后一个周期
    if (i < fullToothCount - 1) {
      path += ` L ${startX + adjustedToothSize},${y}`
    } else {
      // 如果是最后一个周期，直接连接到右上角点
      path += ` L ${x + width},${y}`
    }
  }

  // 计算半圆缺口相对于小票顶部的位置
  const notchY = decorativeLineY ? (decorativeLineY - y) : 0
  // 半圆缺口的半径
  const notchRadius = 15

  // 右侧垂直线（添加半圆缺口）
  if (decorativeLineY && notchY > 0 && notchY < height) {
    // 从右上角到缺口上方
    path += ` L ${x + width},${y + notchY - notchRadius}`
    // 绘制右侧半圆缺口（顺时针弧）- 向内凹的半圆
    path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x + width},${y + notchY + notchRadius}`
    // 从缺口下方到右下角
    path += ` L ${x + width},${y + height}`
  } else {
    // 没有缺口，直接绘制右侧垂直线
    path += ` L ${x + width},${y + height}`
  }

  // 底部水平线
  path += ` L ${x},${y + height}`

  // 左侧垂直线（添加半圆缺口）
  if (decorativeLineY && notchY > 0 && notchY < height) {
    // 从左下角到缺口下方
    path += ` L ${x},${y + notchY + notchRadius}`
    // 绘制左侧半圆缺口（顺时针弧）- 向内凹的半圆
    path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x},${y + notchY - notchRadius}`
    // 从缺口上方到左上角
    path += ` L ${x},${y}`
  } else {
    // 没有缺口，直接回到起点
    path += ` L ${x},${y}`
  }

  // 闭合路径
  path += ` Z`

  return path
}

/**
 * 创建线性渐变
 * @param {string} id - 渐变ID
 * @param {string} deepColor - 深色
 * @param {string} lightColor - 浅色
 * @param {string} direction - 渐变方向 ('vertical' | 'horizontal')
 * @returns {SVGLinearGradientElement}
 */
export function createLinearGradient(id, deepColor, lightColor, direction = 'vertical') {
  const gradient = createSVGElement('linearGradient', { id })

  if (direction === 'vertical') {
    gradient.setAttribute('x1', '0%')
    gradient.setAttribute('y1', '0%')
    gradient.setAttribute('x2', '0%')
    gradient.setAttribute('y2', '100%')
  } else if (direction === 'horizontal') {
    gradient.setAttribute('x1', '100%')
    gradient.setAttribute('y1', '0%')
    gradient.setAttribute('x2', '0%')
    gradient.setAttribute('y2', '0%')
  }

  const stop1 = createSVGElement('stop', {
    offset: '0%',
    style: `stop-color:${deepColor}`
  })

  const stop2 = createSVGElement('stop', {
    offset: '100%',
    style: `stop-color:${lightColor}`
  })

  gradient.appendChild(stop1)
  gradient.appendChild(stop2)

  return gradient
}

/**
 * 创建阴影滤镜
 * @param {string} id - 滤镜ID
 * @returns {SVGFilterElement}
 */
export function createShadowFilter(id) {
  const filter = createSVGElement('filter', {
    id,
    x: '-20%',
    y: '-20%',
    width: '140%',
    height: '140%'
  })

  const shadow = createSVGElement('feDropShadow', {
    dx: '0',
    dy: '10',
    stdDeviation: '10',
    'flood-color': 'rgba(0,0,0,0.5)'
  })

  filter.appendChild(shadow)
  return filter
}

/**
 * 创建图片pattern
 * @param {string} id - pattern ID
 * @param {string} imageSrc - 图片源
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @returns {SVGPatternElement}
 */
export function createImagePattern(id, imageSrc, width, height) {
  const pattern = createSVGElement('pattern', {
    id,
    patternUnits: 'userSpaceOnUse',
    width,
    height
  })

  const image = createSVGElement('image', {
    href: imageSrc,
    width,
    height,
    preserveAspectRatio: 'xMidYMid slice'
  })

  pattern.appendChild(image)
  return pattern
}
