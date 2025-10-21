# F10期权信息图生成器 - Vue 3版本

这是基于Vue 3 + Vite重构的版本，具有更好的代码组织和开发体验。

## 🎯 重构改进

### 代码组织
- ✅ 将2000+行单文件拆分为50+个模块化文件
- ✅ 清晰的职责分离：工具函数、业务逻辑、UI组件
- ✅ Vue 3 Composition API，逻辑复用性强
- ✅ 响应式状态管理，告别手动DOM操作

### 开发体验
- ⚡️ Vite热模块替换（HMR），修改即时生效
- 📦 ES模块化，按需加载
- 🔧 清晰的模块导入路径（@别名）
- 🎨 保持原有UI和样式100%不变

### 项目结构
```
src/
├── main.js                    # 入口文件
├── App.vue                    # 主应用组件
├── components/                # Vue组件
│   ├── InputPanel.vue         # 输入面板
│   └── PreviewPanel.vue       # SVG预览
├── composables/               # 组合式函数（业务逻辑）
│   ├── useConfig.js           # 配置管理
│   ├── useDataParser.js       # 数据解析
│   ├── useSVGRenderer.js      # SVG渲染引擎
│   ├── useExport.js           # PNG导出
│   └── svg-renderers/         # SVG子渲染模块
│       ├── calculateLayout.js
│       ├── calculateColumnWidths.js
│       ├── renderBackground.js
│       ├── renderHeader.js
│       ├── renderTitle.js
│       ├── renderTextArea.js
│       ├── renderImage.js
│       ├── renderTableHeader.js
│       ├── renderBarChart.js
│       ├── renderTableRows.js
│       └── renderCopyright.js
├── utils/                     # 工具函数
│   ├── colorUtils.js
│   ├── textMeasure.js
│   ├── svgHelpers.js
│   ├── imageProcessor.js
│   ├── excelReader.js
│   └── jsonParser.js
├── constants/                 # 常量定义
│   ├── colorTemplates.js
│   ├── defaultConfig.js
│   └── sampleData.js
└── styles/
    └── main.css               # 全局样式
```

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 即可看到应用

### 3. 构建生产版本
```bash
npm run build
```

构建产物在 `dist/` 目录

### 4. 预览生产构建
```bash
npm run preview
```

## 📝 使用说明

使用方式与原版完全相同：

1. 填写基本信息（主标题、副标题等）
2. 上传主图片（可选）
3. 上传Excel文件或输入JSON数据
4. 添加公司Logo数据（可选）
5. 选择配色模板或自定义颜色
6. 调整各项参数
7. 点击"生成信息图"
8. 点击"导出为PNG"保存结果

## 🔧 主要技术栈

- **框架**: Vue 3（Composition API）
- **构建工具**: Vite 5
- **语言**: JavaScript（ES6+）
- **Excel解析**: XLSX.js
- **样式**: 原生CSS

## 🎨 核心模块说明

### 1. 配置管理 (useConfig.js)
- 响应式配置状态
- 颜色模板切换
- 配置重置

### 2. 数据解析 (useDataParser.js)
- Excel文件解析
- JSON数据解析
- 公司Logo数据处理
- 图片预加载

### 3. SVG渲染引擎 (useSVGRenderer.js)
- 调用各个子渲染模块
- 布局计算
- 列宽计算
- 完整SVG生成

### 4. 子渲染模块 (svg-renderers/)
每个模块负责渲染SVG的一部分：
- **renderBackground**: 背景和小票路径
- **renderTitle**: 标题（支持[[文本]]渐变标记）
- **renderTable**: 表格渲染
- **renderBarChart**: 柱状图（两种模板）
- 等等...

### 5. PNG导出 (useExport.js)
- SVG图片内联化
- Canvas转换
- PNG下载

## 🐛 故障排除

### XLSX库加载失败
项目已配置多个CDN备份，如果仍然失败：
1. 检查网络连接
2. 刷新页面重试
3. 查看浏览器控制台错误信息

### 字体显示异常
字体文件需要在`public/MiSans/`目录下，确保：
- MiSans-Bold.ttf
- MiSans-Demibold.ttf
- MiSans-Semibold.ttf
- MiSans-Medium.ttf

### 图片无法显示
确保图片URL可访问，或使用本地图片上传。

## 📚 与原版对比

| 特性 | 原版 | Vue 3版 |
|------|------|---------|
| 代码行数 | 单文件2000+行 | 分散在50+个文件 |
| 开发体验 | 刷新页面查看变化 | 热模块替换，即时更新 |
| 状态管理 | 手动DOM操作 | Vue响应式系统 |
| 代码复用 | 困难 | Composable轻松复用 |
| 调试难度 | 高 | 低（模块清晰） |
| 可维护性 | 低 | 高 |
| 功能完整性 | ✅ | ✅（100%兼容） |

## 📖 开发指南

### 添加新功能
1. 在相应的composable中添加逻辑
2. 在InputPanel.vue中添加配置项
3. 在渲染模块中实现渲染逻辑
4. 测试功能是否正常

### 修改样式
1. 全局样式在`src/styles/main.css`
2. 组件样式在各个`.vue`文件的`<style>`块

### 调试技巧
- 使用Vue DevTools查看组件状态
- 在composable中添加console.log
- 使用浏览器开发者工具检查SVG结构

## 🎯 后续优化建议

1. **TypeScript迁移**: 添加类型安全
2. **单元测试**: 为工具函数添加测试
3. **性能优化**: 虚拟滚动处理大数据
4. **UI组件库**: 引入Element Plus等（可选）
5. **模板系统**: 支持保存和加载自定义模板

## 📄 许可证

与原项目保持一致

## 🙏 致谢

基于原F10期权信息图生成器重构
