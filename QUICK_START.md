# 🚀 快速启动指南

## 一、环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 二、快速开始

### 1. 安装依赖（首次运行）
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问: http://localhost:3000

### 3. 测试功能

#### 方式一：使用示例数据（最快）
1. 点击"填充示例JSON数据"按钮
2. 切换数据输入方式为"JSON数据输入"
3. 点击"填充示例数据"填充Logo（可选）
4. 点击"生成信息图"
5. 查看右侧SVG预览
6. 点击"导出为PNG"下载

#### 方式二：使用Excel文件
1. 准备Excel文件（至少2列数据）
2. 上传Excel文件
3. 调整配置参数
4. 点击"生成信息图"
5. 点击"导出为PNG"

### 4. 构建生产版本
```bash
npm run build
```

构建产物在 `dist/` 目录

### 5. 预览生产构建
```bash
npm run preview
```

## 三、常用配置

### 修改端口
编辑 `vite.config.js`：
```javascript
export default defineConfig({
  server: {
    port: 3001, // 改为你想要的端口
    open: true
  }
})
```

### 修改默认配置
编辑 `src/constants/defaultConfig.js`

### 修改配色模板
编辑 `src/constants/colorTemplates.js`

## 四、常见问题

### Q1: npm install 失败
**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Q2: 端口被占用
**解决方案：**
- 关闭占用3000端口的其他程序
- 或修改vite.config.js中的端口号

### Q3: 字体显示异常
**确认字体文件存在：**
```bash
ls public/MiSans/
```
应该看到：
- MiSans-Bold.ttf
- MiSans-Demibold.ttf
- MiSans-Semibold.ttf
- MiSans-Medium.ttf

### Q4: Excel文件无法解析
**检查项：**
- 文件格式为.xlsx或.xls
- 文件大小<50MB
- 至少包含2列数据
- 第一行为表头

### Q5: 图片无法加载
**检查项：**
- 图片格式为JPG/PNG/GIF/WebP
- 图片大小<10MB
- 网络图片URL可访问（或使用本地上传）

## 五、开发技巧

### 热模块替换（HMR）
修改任何`.vue`、`.js`、`.css`文件后，浏览器会自动更新，无需刷新！

### Vue DevTools
安装Vue DevTools浏览器扩展，可以：
- 查看组件树
- 检查响应式状态
- 调试事件
- 性能分析

### 调试技巧
在代码中添加：
```javascript
console.log('当前配置:', config)
console.log('解析数据:', parsedData)
```

### 常用命令
```bash
# 开发
npm run dev

# 构建
npm run build

# 预览
npm run preview

# 清理
rm -rf node_modules dist
```

## 六、文件结构速查

```
F10_for_options_v2/
├── src/
│   ├── main.js              # 入口
│   ├── App.vue              # 主组件
│   ├── components/          # UI组件
│   ├── composables/         # 业务逻辑
│   ├── utils/               # 工具函数
│   ├── constants/           # 常量
│   └── styles/              # 样式
├── public/                  # 静态资源
│   └── MiSans/              # 字体文件
├── index.html               # HTML入口
├── vite.config.js           # Vite配置
├── package.json             # 项目配置
├── README_VUE.md            # 完整文档
├── TESTING_GUIDE.md         # 测试指南
├── REFACTOR_SUMMARY.md      # 重构总结
└── QUICK_START.md           # 本文件
```

## 七、下一步

1. 阅读 `README_VUE.md` 了解完整功能
2. 阅读 `TESTING_GUIDE.md` 进行全面测试
3. 根据需求修改配置和样式
4. 享受Vue 3带来的开发体验！

## 八、获取帮助

- 查看浏览器控制台错误信息
- 检查终端输出日志
- 阅读文档目录下的所有.md文件
- 检查代码中的注释

---

**祝你使用愉快！** 🎉
