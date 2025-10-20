document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const generateBtn = document.getElementById('generateBtn');
    const svgContainer = document.getElementById('infoGraphic');
    const bgColorOuter = document.getElementById('bgColorOuter');
    const bgColorOuterHex = document.getElementById('bgColorOuterHex');
    const fillSampleDataBtn = document.getElementById('fillSampleData');
    const gradientColorDeep = document.getElementById('gradientColorDeep');
    const gradientColorLight = document.getElementById('gradientColorLight');
    const gradientColorDeepHex = document.getElementById('gradientColorDeepHex');
    const gradientColorLightHex = document.getElementById('gradientColorLightHex');
    const rowBgColorDeep = document.getElementById('rowBgColorDeep');
    const rowBgColorLight = document.getElementById('rowBgColorLight');
    const rowBgColorDeepHex = document.getElementById('rowBgColorDeepHex');
    const rowBgColorLightHex = document.getElementById('rowBgColorLightHex');
    const toothSize = document.getElementById('toothSize');
    const toothSizeValue = document.getElementById('toothSizeValue');
    
    // 表头参数滑块控件
    const headerLineSpacing = document.getElementById('headerLineSpacing');
    const headerLineSpacingValue = document.getElementById('headerLineSpacingValue');
    const headerTopPadding = document.getElementById('headerTopPadding');
    const headerTopPaddingValue = document.getElementById('headerTopPaddingValue');
    const headerBottomPadding = document.getElementById('headerBottomPadding');
    const headerBottomPaddingValue = document.getElementById('headerBottomPaddingValue');
    
    // 整体字体大小滑块控件
    const overallFontSize = document.getElementById('overallFontSize');
    const overallFontSizeValue = document.getElementById('overallFontSizeValue');
    
    // 最后一列字体大小滑块控件
    const lastColumnFontSize = document.getElementById('lastColumnFontSize');
    const lastColumnFontSizeValue = document.getElementById('lastColumnFontSizeValue');
    
    // 主标题字号滑块控件
    const titleFontSize = document.getElementById('titleFontSize');
    const titleFontSizeValue = document.getElementById('titleFontSizeValue');
    
    // 副标题字号滑块控件
    const subtitleFontSize = document.getElementById('subtitleFontSize');
    const subtitleFontSizeValue = document.getElementById('subtitleFontSizeValue');
    
    // 文本区域相关控件
    const textArea = document.getElementById('textArea');
    const textAreaFontSize = document.getElementById('textAreaFontSize');
    const textAreaFontSizeValue = document.getElementById('textAreaFontSizeValue');
    const textAreaColor = document.getElementById('textAreaColor');
    const textAreaColorValue = document.getElementById('textAreaColorValue');
    
    // 调试：验证DOM元素获取
    console.log('=== DOM元素获取验证 ===');
    console.log('textArea元素:', textArea);
    console.log('textAreaFontSize元素:', textAreaFontSize);
    console.log('textAreaFontSizeValue元素:', textAreaFontSizeValue);
    console.log('textAreaColor元素:', textAreaColor);
    console.log('textAreaColorValue元素:', textAreaColorValue);
    if (!textArea) console.error('textArea元素未找到！');
    if (!textAreaFontSize) console.error('textAreaFontSize元素未找到！');
    if (!textAreaFontSizeValue) console.error('textAreaFontSizeValue元素未找到！');
    if (!textAreaColor) console.error('textAreaColor元素未找到！');
    if (!textAreaColorValue) console.error('textAreaColorValue元素未找到！');
    
    // 柱状图模板相关控件
    const barChartTemplate = document.getElementById('barChartTemplate');
    const unifiedTemplateColors = document.getElementById('unifiedTemplateColors');
    const positiveBarColor = document.getElementById('positiveBarColor');
    const positiveBarColorHex = document.getElementById('positiveBarColorHex');
    const negativeBarColor = document.getElementById('negativeBarColor');
    const negativeBarColorHex = document.getElementById('negativeBarColorHex');
    
    // 配色模板定义
    const colorTemplates = {
        default: {
            outerBg: '#f5f5f5',
            gradientDeep: '#0052cc',
            gradientLight: '#4169E1',
            rowBgColorDeep: '#f0f7ff',
            rowBgColorLight: '#ffffff'
        },
        red: {
            outerBg: '#902622',
            gradientDeep: '#bd1803',
            gradientLight: '#cb2914',
            rowBgColorDeep: '#fee8e8',
            rowBgColorLight: '#f8f2f2'
        },
        blue: {
            outerBg: '#24439a',
            gradientDeep: '#1e3dba',
            gradientLight: '#0f41d8',
            rowBgColorDeep: '#e8f0fe',
            rowBgColorLight: '#f3f5f9'
        },
        purple: {
            outerBg: '#2b0b52',
            gradientDeep: '#7520be',
            gradientLight: '#64149e',
            rowBgColorDeep: '#ebdff0',
            rowBgColorLight: '#fcf8fe'
        }
    };
    
    // 选择模板按钮事件监听
    const templateButtons = document.querySelectorAll('.template-btn');
    templateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他按钮的active类
            templateButtons.forEach(b => b.classList.remove('active'));
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 获取选中的模板
            const template = this.getAttribute('data-template');
            applyColorTemplate(template);
        });
    });
    
    // 应用颜色模板
    function applyColorTemplate(templateName) {
        if (!colorTemplates[templateName]) return;
        
        const template = colorTemplates[templateName];
        
        // 更新颜色选择器和十六进制输入框
        bgColorOuter.value = template.outerBg;
        bgColorOuterHex.value = template.outerBg;
        
        gradientColorDeep.value = template.gradientDeep;
        gradientColorDeepHex.value = template.gradientDeep;
        
        gradientColorLight.value = template.gradientLight;
        gradientColorLightHex.value = template.gradientLight;
        
        rowBgColorDeep.value = template.rowBgColorDeep;
        rowBgColorDeepHex.value = template.rowBgColorDeep;
        
        rowBgColorLight.value = template.rowBgColorLight;
        rowBgColorLightHex.value = template.rowBgColorLight;
    }
    
    // 设置默认模板为激活状态
    const defaultTemplateBtn = document.querySelector('.template-btn[data-template="default"]');
    if (defaultTemplateBtn) {
        defaultTemplateBtn.classList.add('active');
    }
    
    // 账号logo路径和内层背景图片路径
    const accountLogoSrc = 'https://u.thsi.cn/imgsrc/share/601f542538b90239fff12bf6be76e054.png';
    const insideBgSrc = 'https://u.thsi.cn/imgsrc/share/88671c9f8628b670e18d89d9620dca4c.jpg';
    
    // 事件监听器
    generateBtn.addEventListener('click', generateInfoGraphic);
    
    // 颜色选择器事件监听
    bgColorOuter.addEventListener('input', function() {
        bgColorOuterHex.value = this.value;
        clearTemplateSelection();
    });
    
    gradientColorDeep.addEventListener('input', function() {
        gradientColorDeepHex.value = this.value;
        clearTemplateSelection();
    });
    
    gradientColorLight.addEventListener('input', function() {
        gradientColorLightHex.value = this.value;
        clearTemplateSelection();
    });
    
    rowBgColorDeep.addEventListener('input', function() {
        rowBgColorDeepHex.value = this.value;
        clearTemplateSelection();
    });
    
    rowBgColorLight.addEventListener('input', function() {
        rowBgColorLightHex.value = this.value;
        clearTemplateSelection();
    });
    
    // 颜色十六进制输入框事件监听
    bgColorOuterHex.addEventListener('input', function() {
        updateColorFromHexInput(this, bgColorOuter);
        clearTemplateSelection();
    });
    bgColorOuterHex.addEventListener('blur', function() {
        formatHexInput(this, bgColorOuter);
    });
    
    gradientColorDeepHex.addEventListener('input', function() {
        updateColorFromHexInput(this, gradientColorDeep);
        clearTemplateSelection();
    });
    gradientColorDeepHex.addEventListener('blur', function() {
        formatHexInput(this, gradientColorDeep);
    });
    
    gradientColorLightHex.addEventListener('input', function() {
        updateColorFromHexInput(this, gradientColorLight);
        clearTemplateSelection();
    });
    gradientColorLightHex.addEventListener('blur', function() {
        formatHexInput(this, gradientColorLight);
    });
    
    rowBgColorDeepHex.addEventListener('input', function() {
        updateColorFromHexInput(this, rowBgColorDeep);
        clearTemplateSelection();
    });
    rowBgColorDeepHex.addEventListener('blur', function() {
        formatHexInput(this, rowBgColorDeep);
    });
    
    rowBgColorLightHex.addEventListener('input', function() {
        updateColorFromHexInput(this, rowBgColorLight);
        clearTemplateSelection();
    });
    rowBgColorLightHex.addEventListener('blur', function() {
        formatHexInput(this, rowBgColorLight);
    });
    
    // 锯齿大小滑块事件监听
    if (toothSize && toothSizeValue) {
        toothSize.addEventListener('input', function() {
            toothSizeValue.textContent = this.value;
        });
    }
    
    // 表头参数滑块事件监听
    if (headerLineSpacing && headerLineSpacingValue) {
        headerLineSpacing.addEventListener('input', function() {
            headerLineSpacingValue.textContent = this.value;
        });
    }
    
    if (headerTopPadding && headerTopPaddingValue) {
        headerTopPadding.addEventListener('input', function() {
            headerTopPaddingValue.textContent = this.value;
        });
    }
    
    if (headerBottomPadding && headerBottomPaddingValue) {
        headerBottomPadding.addEventListener('input', function() {
            headerBottomPaddingValue.textContent = this.value;
        });
    }
    
    // 第二列数值小数位数滑块事件监听
    const secondColumnDecimalPlaces = document.getElementById('secondColumnDecimalPlaces');
    const secondColumnDecimalPlacesValue = document.getElementById('secondColumnDecimalPlacesValue');
    if (secondColumnDecimalPlaces && secondColumnDecimalPlacesValue) {
        secondColumnDecimalPlaces.addEventListener('input', function() {
            secondColumnDecimalPlacesValue.textContent = this.value;
        });
    }
    
    // 整体字体大小滑块事件监听
    if (overallFontSize && overallFontSizeValue) {
        overallFontSize.addEventListener('input', function() {
            overallFontSizeValue.textContent = this.value;
        });
    }
    
    // 最后一列字体大小滑块事件监听
    if (lastColumnFontSize && lastColumnFontSizeValue) {
        lastColumnFontSize.addEventListener('input', function() {
            lastColumnFontSizeValue.textContent = this.value;
        });
    }
    
    // 主标题字号滑块事件监听
    if (titleFontSize && titleFontSizeValue) {
        titleFontSize.addEventListener('input', function() {
            titleFontSizeValue.textContent = this.value;
        });
    }
    
    // 副标题字号滑块事件监听
    if (subtitleFontSize && subtitleFontSizeValue) {
        subtitleFontSize.addEventListener('input', function() {
            subtitleFontSizeValue.textContent = this.value;
        });
    }
    
    // 文本区域字号滑块事件监听
    if (textAreaFontSize && textAreaFontSizeValue) {
        textAreaFontSize.addEventListener('input', function() {
            textAreaFontSizeValue.textContent = this.value;
        });
    }
    
    // 文本区域颜色选择器事件监听
    if (textAreaColor && textAreaColorValue) {
        textAreaColor.addEventListener('input', function() {
            textAreaColorValue.textContent = this.value;
        });
    }
    
    // 柱状图模板选择事件监听
    if (barChartTemplate) {
        barChartTemplate.addEventListener('change', function() {
            const isUnified = this.value === 'unified';
            if (unifiedTemplateColors) {
                unifiedTemplateColors.style.display = isUnified ? 'block' : 'none';
            }
        });
    }
    
    // 统一模板颜色选择器事件监听
    if (positiveBarColor && positiveBarColorHex) {
        positiveBarColor.addEventListener('input', function() {
            positiveBarColorHex.value = this.value;
        });
        
        positiveBarColorHex.addEventListener('input', function() {
            updateColorFromHexInput(this, positiveBarColor);
        });
        positiveBarColorHex.addEventListener('blur', function() {
            formatHexInput(this, positiveBarColor);
        });
    }
    
    if (negativeBarColor && negativeBarColorHex) {
        negativeBarColor.addEventListener('input', function() {
            negativeBarColorHex.value = this.value;
        });
        
        negativeBarColorHex.addEventListener('input', function() {
            updateColorFromHexInput(this, negativeBarColor);
        });
        negativeBarColorHex.addEventListener('blur', function() {
            formatHexInput(this, negativeBarColor);
        });
    }
    
    // 统一模板0轴偏移滑块事件监听
    const unifiedZeroAxisOffset = document.getElementById('unifiedZeroAxisOffset');
    const unifiedZeroAxisOffsetValue = document.getElementById('unifiedZeroAxisOffsetValue');
    if (unifiedZeroAxisOffset && unifiedZeroAxisOffsetValue) {
        unifiedZeroAxisOffset.addEventListener('input', function() {
            unifiedZeroAxisOffsetValue.textContent = this.value;
        });
    }
    
    // 清除模板选择状态的函数
    function clearTemplateSelection() {
        templateButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    // 辅助函数：验证并更新颜色选择器
    function updateColorFromHexInput(hexInput, colorPicker) {
        let value = hexInput.value;
        
        // 如果不以#开头，添加#
        if (value && !value.startsWith('#')) {
            value = '#' + value;
            hexInput.value = value;
        }
        
        // 验证是否为有效的颜色代码
        if (isValidHexColor(value)) {
            colorPicker.value = value;
        }
    }
    
    // 辅助函数：在失焦时格式化十六进制输入
    function formatHexInput(hexInput, colorPicker) {
        let value = hexInput.value.trim();
        
        // 如果为空，使用颜色选择器的当前值
        if (!value) {
            hexInput.value = colorPicker.value;
            return;
        }
        
        // 如果不以#开头，添加#
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        
        // 验证是否为有效的颜色代码
        if (isValidHexColor(value)) {
            colorPicker.value = value;
            hexInput.value = value.toLowerCase(); // 统一使用小写
        } else {
            // 如果无效，恢复为颜色选择器的值
            hexInput.value = colorPicker.value;
        }
    }
    
    // 辅助函数：检查是否为有效的十六进制颜色代码
    function isValidHexColor(color) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    }
    
    // 填充示例数据按钮事件监听
    if (fillSampleDataBtn) {
        fillSampleDataBtn.addEventListener('click', fillSampleLogoData);
    }
    
    // 数据源选择事件监听
    const dataSource = document.getElementById('dataSource');
    const excelInputGroup = document.getElementById('excelInputGroup');
    const jsonInputGroup = document.getElementById('jsonInputGroup');
    const fillSampleJsonDataBtn = document.getElementById('fillSampleJsonData');
    
    if (dataSource) {
        dataSource.addEventListener('change', function() {
            const selectedSource = this.value;
            if (selectedSource === 'excel') {
                excelInputGroup.style.display = 'block';
                jsonInputGroup.style.display = 'none';
            } else if (selectedSource === 'json') {
                excelInputGroup.style.display = 'none';
                jsonInputGroup.style.display = 'block';
            }
        });
    }
    
    // 填充示例JSON数据按钮事件监听
    if (fillSampleJsonDataBtn) {
        fillSampleJsonDataBtn.addEventListener('click', fillSampleJsonData);
    }
    
    // 填充示例Logo数据
    function fillSampleLogoData() {
        const sampleData = [
            {
                "name": "德邦科技",
                "code": "688035",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/68dcd335-95d5-48f2-bd1b-d6e1e73c5457.png"
            },
            {
                "name": "中电港",
                "code": "001287",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/a92da8fc-aa92-402a-aaba-9e95039f859e.png"
            },
            {
                "name": "北斗星通",
                "code": "002151",
                "company_logo": "http://o.thsi.cn/dc-d-common-global.company-logo/d3f1edc2-7924-4c50-aa0c-df9d912aceef.png"
            }
        ];
        
        const companyLogosTextarea = document.getElementById('companyLogos');
        if (companyLogosTextarea) {
            companyLogosTextarea.value = JSON.stringify(sampleData, null, 2);
        }
    }
    
    // 填充示例JSON数据
    function fillSampleJsonData() {
        const sampleJsonData = {
            "table_datas": [
                {
                    "期权名称": "创业板ETF购9月2950",
                    "价格": 0.0633,
                    "涨幅": "84.55%",
                    "剩余天数": 19,
                    "对应标的": "创业板ETF",
                    "标的涨跌幅": "3.85%"
                },
                {
                    "期权名称": "创业板ETF购9月2850",
                    "价格": 0.0901,
                    "涨幅": "56.7%",
                    "剩余天数": 19,
                    "对应标的": "创业板ETF",
                    "标的涨跌幅": "3.85%"
                },
                {
                    "期权名称": "创业板ETF购9月2750",
                    "价格": 0.1501,
                    "涨幅": "53.95%",
                    "剩余天数": 19,
                    "对应标的": "创业板ETF",
                    "标的涨跌幅": "3.85%"
                },
                {
                    "期权名称": "沪深300 2509购4300",
                    "价格": 125.8,
                    "涨幅": "31.04%",
                    "剩余天数": 14,
                    "对应标的": "沪深300",
                    "标的涨跌幅": "0.96%"
                },
                {
                    "期权名称": "中证500ETF购9月2700",
                    "价格": 0.0763,
                    "涨幅": "29.32%",
                    "剩余天数": 19,
                    "对应标的": "中证500ETF",
                    "标的涨跌幅": "1.62%"
                }
            ]
        };
        
        const jsonDataTextarea = document.getElementById('jsonData');
        if (jsonDataTextarea) {
            jsonDataTextarea.value = JSON.stringify(sampleJsonData, null, 2);
        }
    }
    
    // JSON数据解析函数
    function parseJsonData(jsonString) {
        return new Promise((resolve, reject) => {
            try {
                // 解析JSON字符串
                const jsonData = JSON.parse(jsonString);
                
                // 验证数据结构
                if (!jsonData || typeof jsonData !== 'object') {
                    throw new Error('JSON数据格式无效');
                }
                
                if (!jsonData.table_datas || !Array.isArray(jsonData.table_datas)) {
                    throw new Error('JSON数据中缺少table_datas数组');
                }
                
                if (jsonData.table_datas.length === 0) {
                    throw new Error('table_datas数组为空');
                }
                
                // 获取第一行数据来确定列名
                const firstRow = jsonData.table_datas[0];
                const headers = Object.keys(firstRow);
                
                if (headers.length < 2) {
                    throw new Error('数据至少需要包含两列');
                }
                
                console.log('JSON数据解析成功:', {
                    rows: jsonData.table_datas.length,
                    columns: headers.length,
                    headers: headers
                });
                
                // 返回与Excel解析相同格式的数据结构
                resolve({
                    data: jsonData.table_datas,
                    headers: headers,
                    sheetName: 'JSON数据',
                    rowCount: jsonData.table_datas.length,
                    columnCount: headers.length
                });
                
            } catch (parseError) {
                console.error('解析JSON数据时出错:', parseError);
                reject(new Error('解析JSON数据失败: ' + parseError.message));
            }
        });
    }
    
    // 预加载图片
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`无法加载图片: ${src}`));
            img.src = src;
        });
    }
    
    // 生成信息图
    function generateInfoGraphic() {
        // 获取用户输入
        const mainTitleText = document.getElementById('mainTitleInput').value || '同花顺期货通'; // 获取主标题，提供默认值
        const subtitle = document.getElementById('subtitle').value || '[[F10信息长图]]';
        const copyright = document.getElementById('copyright').value || '版权所有 © 同花顺期货通 ';
        
        // 调试：检查文本区域DOM元素和值
        console.log('=== 文本区域调试信息 ===');
        console.log('textArea元素:', textArea);
        console.log('textAreaFontSize元素:', textAreaFontSize);
        if (textArea) {
            console.log('textArea.value:', textArea.value);
            console.log('textArea.value长度:', textArea.value.length);
        }
        if (textAreaFontSize) {
            console.log('textAreaFontSize.value:', textAreaFontSize.value);
        }
        
        // 获取是否显示公司Logo的选项
        const showCompanyLogos = document.getElementById('showCompanyLogos').checked;
        
        // 获取是否显示主图片的选项
        const showMainImage = document.getElementById('showMainImage').checked;
        
        // 获取颜色值 - 优先使用输入框中的值，如果无效则使用颜色选择器的值
        const outerBgColor = isValidHexColor(bgColorOuterHex.value) ? bgColorOuterHex.value : bgColorOuter.value;
        const gradientDeepColor = isValidHexColor(gradientColorDeepHex.value) ? gradientColorDeepHex.value : gradientColorDeep.value;
        const gradientLightColor = isValidHexColor(gradientColorLightHex.value) ? gradientColorLightHex.value : gradientColorLight.value;
        const rowBgColorDeepValue = isValidHexColor(rowBgColorDeepHex.value) ? rowBgColorDeepHex.value : rowBgColorDeep.value;
        const rowBgColorLightValue = isValidHexColor(rowBgColorLightHex.value) ? rowBgColorLightHex.value : rowBgColorLight.value;
        
        // 获取颜色规则
        const colorRule = document.getElementById('colorRule') ? parseInt(document.getElementById('colorRule').value) : 1;
        
        // 获取锯齿大小
        const toothSizeValue = document.getElementById('toothSize') ? parseInt(document.getElementById('toothSize').value) : 40;
        
        // 获取表头参数设置
        const headerLineSpacingValue = document.getElementById('headerLineSpacing') ? 
            parseInt(document.getElementById('headerLineSpacing').value) : 10;
        const headerTopPaddingValue = document.getElementById('headerTopPadding') ? 
            parseInt(document.getElementById('headerTopPadding').value) : 10;
        const headerBottomPaddingValue = document.getElementById('headerBottomPadding') ? 
            parseInt(document.getElementById('headerBottomPadding').value) : 10;
            
        // 获取主标题字号
        const titleFontSizeValue = document.getElementById('titleFontSize') ? 
            parseInt(document.getElementById('titleFontSize').value) : 130;
            
        // 获取副标题字号
        const subtitleFontSizeValue = document.getElementById('subtitleFontSize') ? 
            parseInt(document.getElementById('subtitleFontSize').value) : 130;
            
        // 获取整体字体大小
        const overallFontSizeValue = document.getElementById('overallFontSize') ? 
            parseInt(document.getElementById('overallFontSize').value) : 30;
            
        // 获取最后一列字体大小调整值
        const lastColumnFontSizeAdjustment = document.getElementById('lastColumnFontSize') ? 
            parseInt(document.getElementById('lastColumnFontSize').value) : 0;
            
        // 计算最后一列的实际字体大小
        const lastColumnFontSizeValue = overallFontSizeValue + lastColumnFontSizeAdjustment;
            
        // 获取第二列数值小数位数
        const secondColumnDecimalPlacesValue = document.getElementById('secondColumnDecimalPlaces') ? 
            parseInt(document.getElementById('secondColumnDecimalPlaces').value) : 1;
            
        // 获取柱状图模板选择
        const barChartTemplateValue = document.getElementById('barChartTemplate') ? 
            document.getElementById('barChartTemplate').value : 'default';
            
        // 获取统一模板的颜色配置
        const positiveBarColorValue = isValidHexColor(positiveBarColorHex?.value) ? 
            positiveBarColorHex.value : (positiveBarColor?.value || '#bd2427');
        const negativeBarColorValue = isValidHexColor(negativeBarColorHex?.value) ? 
            negativeBarColorHex.value : (negativeBarColor?.value || '#28a745');
            
        // 获取统一模板0轴偏移
        const unifiedZeroAxisOffsetValue = document.getElementById('unifiedZeroAxisOffset') ? 
            parseInt(document.getElementById('unifiedZeroAxisOffset').value) : 0;
        
        // 获取主图片
        const mainImageFile = document.getElementById('mainImage').files[0];
        
        // 获取Excel文件
        const excelFile = document.getElementById('excelFile').files[0];
        
        // 获取公司Logo数据
        const companyLogosData = document.getElementById('companyLogos').value;
        let companyLogosMap = new Map(); // 用于存储公司名称到logo URL的映射
        let logoUrls = []; // 存储需要预加载的logo URL
        
        // 如果有公司Logo数据，解析JSON
        if (companyLogosData.trim()) {
            try {
                const companyLogos = JSON.parse(companyLogosData);
                // 创建公司名称到logo URL的映射
                companyLogos.forEach(company => {
                    if (company.name && company.company_logo) {
                        companyLogosMap.set(company.name, company.company_logo);
                        logoUrls.push(company.company_logo);
                    }
                });
            } catch (error) {
                console.error('解析公司Logo数据时出错:', error);
                alert('公司Logo数据格式有误，请检查JSON格式');
                return;
            }
        }
        
        // 获取数据源选择
        const dataSource = document.getElementById('dataSource').value;
        
        // 根据数据源类型检查输入
        if (dataSource === 'excel') {
            if (!excelFile) {
                alert('请上传Excel数据文件');
                return;
            }
        } else if (dataSource === 'json') {
            const jsonData = document.getElementById('jsonData').value.trim();
            if (!jsonData) {
                alert('请输入JSON数据');
                return;
            }
        }
        
        // 显示加载提示
        const loadingDiv = document.createElement('div');
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 25px 30px;
            background: rgba(0,0,0,0.8);
            color: white;
            border-radius: 8px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            min-width: 300px;
        `;
        
        // 创建加载动画和文本
        loadingDiv.innerHTML = `
            <div style="margin-bottom: 15px;">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                "></div>
            </div>
            <div id="loadingText">正在处理文件...</div>
            <div id="loadingProgress" style="font-size: 12px; color: #ccc; margin-top: 10px;">检查文件格式</div>
        `;
        
        // 添加CSS动画
        if (!document.getElementById('loadingAnimation')) {
            const style = document.createElement('style');
            style.id = 'loadingAnimation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(loadingDiv);
        
        // 更新加载进度的函数
        function updateLoadingProgress(text, progress) {
            const progressElement = document.getElementById('loadingProgress');
            if (progressElement) {
                progressElement.textContent = progress;
            }
            const textElement = document.getElementById('loadingText');
            if (textElement) {
                textElement.textContent = text;
            }
        }
        
        // 验证文件类型
        try {
            // 验证图片文件（如果有）
            if (mainImageFile) {
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!validImageTypes.includes(mainImageFile.type)) {
                    throw new Error('请选择有效的图片文件（JPG、PNG、GIF或WebP格式）');
                }
                
                // 验证图片文件大小（限制为10MB）
                const maxImageSize = 10 * 1024 * 1024;
                if (mainImageFile.size > maxImageSize) {
                    throw new Error('图片文件大小超过限制（最大10MB）');
                }
            }
        } catch (validationError) {
            document.body.removeChild(loadingDiv);
            alert(validationError.message);
            return;
        }
        
        // 更新进度
        updateLoadingProgress('正在读取文件...', '验证文件格式完成');
        
        // 处理图片、数据和预加载Logo
        Promise.all([
            mainImageFile ? (() => {
                updateLoadingProgress('正在读取图片...', '处理主图片文件');
                return readImageAsDataURL(mainImageFile);
            })() : Promise.resolve(null),
            (() => {
                if (dataSource === 'excel') {
                    updateLoadingProgress('正在读取Excel文件...', '解析Excel数据');
                    return readExcelFile(excelFile);
                } else if (dataSource === 'json') {
                    updateLoadingProgress('正在解析JSON数据...', '处理JSON格式数据');
                    const jsonData = document.getElementById('jsonData').value.trim();
                    return parseJsonData(jsonData);
                }
            })(),
            // 预加载所有公司Logo图片，忽略加载失败的图片
            ...logoUrls.map((url, index) => {
                if (index === 0) {
                    updateLoadingProgress('正在加载公司Logo...', `加载Logo图片 (${logoUrls.length}个)`);
                }
                return preloadImage(url).catch(() => null);
            })
        ]).then(results => {
            updateLoadingProgress('正在生成图表...', '数据处理完成，开始渲染');
            // 移除加载提示
            document.body.removeChild(loadingDiv);
            
            const mainImageSrc = results[0];
            const excelResult = results[1];
            
            // 验证返回的数据结构
            if (!excelResult || typeof excelResult !== 'object') {
                throw new Error('数据解析结果无效');
            }
            
            const excelData = excelResult.data;
            const excelHeaders = excelResult.headers;
            
            // 检查数据是否有效
            if (!excelData || !Array.isArray(excelData) || excelData.length === 0) {
                const dataSourceName = dataSource === 'excel' ? 'Excel文件' : 'JSON数据';
                alert(`${dataSourceName}中没有找到有效数据，请检查数据内容`);
                return;
            }
            
            // 检查数据列数（使用新的返回结构）
            if (excelResult.columnCount < 2) {
                const dataSourceName = dataSource === 'excel' ? 'Excel文件' : 'JSON数据';
                alert(`${dataSourceName}至少需要包含两列数据，当前只有${excelResult.columnCount}列`);
                return;
            }
            
            // 验证表头数据
            if (!excelHeaders || !Array.isArray(excelHeaders)) {
                console.warn('表头数据无效，使用默认表头');
                excelResult.headers = Object.keys(excelData[0]);
            }
            
            console.log('开始创建SVG信息图，数据概览:', {
                rows: excelResult.rowCount,
                columns: excelResult.columnCount,
                sheetName: excelResult.sheetName
            });
            
            // 调试：检查传递给createSVGInfoGraphic的文本区域参数
            const textAreaContentParam = textArea ? textArea.value : '';
            const textAreaFontSizeParam = textAreaFontSize ? parseInt(textAreaFontSize.value) : 30;
            const textAreaColorParam = textAreaColor ? textAreaColor.value : '#333333';
            console.log('传递给createSVGInfoGraphic的参数:');
            console.log('textAreaContent:', textAreaContentParam);
            console.log('textAreaFontSize:', textAreaFontSizeParam);
            console.log('textAreaColor:', textAreaColorParam);
            
            // 生成SVG信息图
            createSVGInfoGraphic(svgContainer, {
                mainTitle: mainTitleText, // 传递主标题
                subtitle,
                mainImageSrc,
                copyright,
                excelData,
                excelHeaders,
                outerBgColor,
                gradientDeepColor,
                gradientLightColor,
                rowBgColorDeep: rowBgColorDeepValue,
                rowBgColorLight: rowBgColorLightValue,
                companyLogosMap,
                toothSize: toothSizeValue,
                colorRule: colorRule,
                headerLineSpacing: headerLineSpacingValue,
                headerTopPadding: headerTopPaddingValue,
                headerBottomPadding: headerBottomPaddingValue,
                titleFontSize: titleFontSizeValue, // 传递主标题字号
                subtitleFontSize: subtitleFontSizeValue,
                textAreaContent: textAreaContentParam, // 传递文本区域内容
                textAreaFontSize: textAreaFontSizeParam, // 传递文本区域字号
                textAreaColor: textAreaColorParam, // 传递文本区域颜色
                showCompanyLogos: showCompanyLogos, // 传递显示公司Logo的选项
                showMainImage: showMainImage, // 传递显示主图片的选项
                overallFontSize: overallFontSizeValue, // 传递整体字体大小
                lastColumnFontSize: lastColumnFontSizeValue, // 传递最后一列字体大小
                secondColumnDecimalPlaces: secondColumnDecimalPlacesValue, // 传递第二列数值小数位数
                barChartTemplate: barChartTemplateValue, // 传递柱状图模板选择
                positiveBarColor: positiveBarColorValue, // 传递正值柱状图颜色
                negativeBarColor: negativeBarColorValue, // 传递负值柱状图颜色
                unifiedZeroAxisOffset: unifiedZeroAxisOffsetValue // 传递统一模板0轴偏移
            });
        }).catch(error => {
            // 移除加载提示
            if (document.body.contains(loadingDiv)) {
                document.body.removeChild(loadingDiv);
            }
            
            console.error('生成信息图时出错:', error);
            
            // 根据错误类型提供更具体的错误信息
            let errorMessage = '生成信息图时出错';
            if (error.message) {
                errorMessage = error.message;
            } else if (error.name === 'NetworkError') {
                errorMessage = '网络连接错误，请检查网络后重试';
            } else if (error.name === 'SecurityError') {
                errorMessage = '文件访问被阻止，请检查浏览器安全设置';
            } else if (error.name === 'TypeError') {
                errorMessage = '数据格式错误，请检查Excel文件格式';
            } else if (error.toString().includes('XLSX')) {
                errorMessage = 'Excel处理库加载失败，请刷新页面重试';
            }
            
            alert(errorMessage);
        });
    }
    
    // 读取图片为DataURL
    function readImageAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // 检查XLSX库是否已加载（增强版）
    function checkXLSXLibrary() {
        return new Promise((resolve, reject) => {
            // 立即检查XLSX是否已定义
            if (typeof XLSX !== 'undefined' && XLSX.read && typeof XLSX.read === 'function') {
                resolve(true);
                return;
            }
            
            // 等待一段时间后再次检查，增加检查频率和总时长
            let attempts = 0;
            const maxAttempts = 20; // 增加最大尝试次数
            const checkInterval = setInterval(() => {
                attempts++;
                // 更严格的检查：确保XLSX对象及其关键方法都存在
                if (typeof XLSX !== 'undefined' && 
                    XLSX.read && typeof XLSX.read === 'function' &&
                    XLSX.utils && typeof XLSX.utils.sheet_to_json === 'function') {
                    clearInterval(checkInterval);
                    console.log('XLSX库检查通过，所有必要方法可用');
                    resolve(true);
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    const errorMsg = typeof XLSX === 'undefined' ? 
                        'XLSX库未加载' : 'XLSX库加载不完整，缺少必要方法';
                    reject(new Error(`${errorMsg}，请检查网络连接或刷新页面重试`));
                }
            }, 300); // 减少检查间隔，提高响应速度
        });
    }
    
    // 验证文件格式
    function validateExcelFile(file) {
        const validExtensions = ['.xlsx', '.xls'];
        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'application/octet-stream' // 某些情况下Excel文件可能被识别为此类型
        ];
        
        const fileName = file.name.toLowerCase();
        const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
        const hasValidMimeType = validMimeTypes.includes(file.type);
        
        if (!hasValidExtension && !hasValidMimeType) {
            throw new Error('请选择有效的Excel文件（.xlsx或.xls格式）');
        }
        
        // 检查文件大小（限制为50MB）
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('文件大小超过限制（最大50MB）');
        }
        
        return true;
    }
    
    // 读取Excel文件并解析数据（Chrome兼容性增强版）
    function readExcelFile(file) {
        return new Promise(async (resolve, reject) => {
            let timeoutId = null;
            
            try {
                // 设置总体超时机制（30秒）
                timeoutId = setTimeout(() => {
                    reject(new Error('Excel文件处理超时，请检查文件大小或网络状况'));
                }, 30000);
                
                // 1. 检查XLSX库是否加载
                await checkXLSXLibrary();
                
                // 2. 验证文件格式
                validateExcelFile(file);
                
                // 3. 增强的浏览器兼容性检查
                if (!window.FileReader) {
                    throw new Error('您的浏览器不支持文件读取功能，请使用Chrome 6+、Firefox 3.6+或Safari 6+');
                }
                
                // 4. 检查ArrayBuffer支持（Chrome兼容性关键）
                if (!window.ArrayBuffer) {
                    throw new Error('您的浏览器不支持ArrayBuffer，请升级到更新版本的Chrome浏览器');
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    try {
                        // 清除超时定时器
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            timeoutId = null;
                        }
                        
                        const data = e.target.result;
                        
                        // 验证读取的数据
                        if (!data || data.byteLength === 0) {
                            throw new Error('文件读取失败：文件内容为空');
                        }
                        
                        // 使用ArrayBuffer替代BinaryString，提高Chrome兼容性
                        let workbook;
                        try {
                            workbook = XLSX.read(data, { 
                                type: 'array',
                                cellDates: true,
                                cellNF: true,   // 改为true以保留数字格式信息
                                cellText: true,  // 改为true以保留原始文本格式
                                // 增加Chrome兼容性选项
                                bookVBA: false,
                                password: undefined
                            });
                        } catch (xlsxError) {
                            console.error('XLSX解析错误:', xlsxError);
                            throw new Error(`Excel文件解析失败: ${xlsxError.message || '未知错误'}`);
                        }
                        
                        // 检查工作簿是否有效
                        if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
                            throw new Error('Excel文件无效或不包含工作表');
                        }
                        
                        // 获取第一个工作表
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        if (!worksheet) {
                            throw new Error('无法读取工作表数据');
                        }
                        
                        // 检查工作表是否为空
                        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
                        if (range.e.r < range.s.r || range.e.c < range.s.c) {
                            throw new Error('工作表为空，请确保Excel文件包含数据');
                        }
                        
                        // 尝试获取表头行并处理可能的换行符
                        let rawHeaderRow;
                        try {
                            const headerData = XLSX.utils.sheet_to_json(worksheet, { 
                                header: 1, 
                                defval: '',
                                range: 0 // 只读取第一行作为表头
                            });
                            rawHeaderRow = headerData[0] || [];
                        } catch (headerError) {
                            console.warn('读取表头时出现问题:', headerError);
                            rawHeaderRow = [];
                        }
                        
                        // 处理表头中可能的换行符
                        const headerRow = rawHeaderRow.map(header => {
                            if (header && typeof header === 'string') {
                                // 统一将各种可能的换行符替换为标准的"\n"
                                return header.replace(/\r\n|\r|\n/g, '\n').trim();
                            }
                            return header;
                        });
                        
                        // 使用更安全的选项解析数据
                        let jsonData;
                        try {
                            jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                                raw: false,
                                defval: '',
                                blankrows: false,
                                // Chrome兼容性增强选项
                                dateNF: 'yyyy-mm-dd',
                                cellText: true,  // 改为true以保留原始文本格式（包括百分比）
                                cellDates: true
                            });
                        } catch (dataError) {
                            console.error('数据解析错误详情:', dataError);
                            throw new Error(`解析Excel数据时出错: ${dataError.message || '数据格式不支持'}`);
                        }
                        
                        // 验证数据有效性
                        if (!jsonData || jsonData.length === 0) {
                            throw new Error('Excel文件中没有找到有效数据');
                        }
                        
                        // 检查数据结构
                        const firstRow = jsonData[0];
                        const columnCount = Object.keys(firstRow).length;
                        if (columnCount < 2) {
                            throw new Error('Excel文件至少需要包含两列数据');
                        }
                        
                        console.log('Excel文件读取成功:', {
                            rows: jsonData.length,
                            columns: columnCount,
                            headers: headerRow
                        });
                        
                        // 返回包含数据和列名的对象
                        resolve({
                            data: jsonData,
                            headers: headerRow,
                            sheetName: firstSheetName,
                            rowCount: jsonData.length,
                            columnCount: columnCount
                        });
                        
                    } catch (parseError) {
                        console.error('解析Excel文件时出错:', parseError);
                        // 清除超时定时器
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            timeoutId = null;
                        }
                        reject(new Error(`解析Excel文件失败: ${parseError.message || '未知解析错误'}`));
                    }
                };
                
                reader.onerror = function(error) {
                    console.error('文件读取错误:', error);
                    // 清除超时定时器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    reject(new Error('文件读取失败，可能是文件损坏或浏览器兼容性问题，请重试'));
                };
                
                reader.onabort = function() {
                    console.warn('文件读取被中断');
                    // 清除超时定时器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    reject(new Error('文件读取被中断'));
                };
                
                // 添加读取进度监控（可选）
                reader.onprogress = function(event) {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        console.log(`文件读取进度: ${percentComplete.toFixed(1)}%`);
                    }
                };
                
                // 使用ArrayBuffer读取文件，提高Chrome兼容性
                try {
                    reader.readAsArrayBuffer(file);
                } catch (readError) {
                    console.error('启动文件读取失败:', readError);
                    // 清除超时定时器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    reject(new Error(`无法读取文件: ${readError.message || '浏览器不支持此文件格式'}`));
                }
                
            } catch (error) {
                console.error('readExcelFile初始化错误:', error);
                // 清除超时定时器
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                reject(error);
            }
        });
    }
    
    // 创建小票锯齿边缘的路径
    function createTicketPath(x, y, width, height, toothSize, decorativeLineY) {
        // 固定锯齿深度为常量，不随toothSize变化
        const toothDepth = 20;
        
        // 为了确保两侧都完全对称，计算锯齿数量时需要注意
        // 两端都应该是锯齿的"峰"
        // 计算需要绘制的完整"峰-谷-峰"单元数量
        const fullToothCount = Math.floor((width) / toothSize);
        
        // 调整实际锯齿大小以均匀分布
        const adjustedToothSize = width / fullToothCount;
        
        // 从左上角开始路径（第一个峰的顶点）
        let path = `M ${x},${y}`;
        
        // 遍历绘制所有锯齿
        for (let i = 0; i < fullToothCount; i++) {
            // 计算当前锯齿的起始x坐标
            const startX = x + (i * adjustedToothSize);
            
            // 绘制从峰到谷（向下）
            path += ` L ${startX + (adjustedToothSize/2)},${y + toothDepth}`;
            
            // 绘制从谷到下一个峰（向上），如果不是最后一个周期
            if (i < fullToothCount - 1) {
                path += ` L ${startX + adjustedToothSize},${y}`;
            } else {
                // 如果是最后一个周期，直接连接到右上角点
                path += ` L ${x + width},${y}`;
            }
        }
        
        // 计算半圆缺口相对于小票顶部的位置
        const notchY = decorativeLineY ? (decorativeLineY - y) : 0;
        // 半圆缺口的半径
        const notchRadius = 15;
        
        // 右侧垂直线（添加半圆缺口）
        if (decorativeLineY && notchY > 0 && notchY < height) {
            // 从右上角到缺口上方
            path += ` L ${x + width},${y + notchY - notchRadius}`;
            // 绘制右侧半圆缺口（顺时针弧）- 向内凹的半圆
            path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x + width},${y + notchY + notchRadius}`;
            // 从缺口下方到右下角
            path += ` L ${x + width},${y + height}`;
        } else {
            // 没有缺口，直接绘制右侧垂直线
            path += ` L ${x + width},${y + height}`;
        }
        
        // 底部水平线
        path += ` L ${x},${y + height}`;
        
        // 左侧垂直线（添加半圆缺口）
        if (decorativeLineY && notchY > 0 && notchY < height) {
            // 从左下角到缺口下方
            path += ` L ${x},${y + notchY + notchRadius}`;
            // 绘制左侧半圆缺口（顺时针弧）- 向内凹的半圆
            path += ` A ${notchRadius} ${notchRadius} 0 0 0 ${x},${y + notchY - notchRadius}`;
            // 从缺口上方到左上角
            path += ` L ${x},${y}`;
        } else {
            // 没有缺口，直接回到起点
            path += ` L ${x},${y}`;
        }
        
        // 闭合路径
        path += ` Z`;
        
        return path;
    }
    
    // 创建SVG信息图
    function createSVGInfoGraphic(container, options) {
        // 调试：检查createSVGInfoGraphic接收到的参数
        console.log('=== createSVGInfoGraphic接收到的参数 ===');
        console.log('options:', options);
        console.log('textAreaContent:', options.textAreaContent);
        console.log('textAreaFontSize:', options.textAreaFontSize);
        
        const {
            mainTitle, // 接收主标题
            subtitle,
            mainImageSrc,
            copyright,
            excelData,
            excelHeaders,
            outerBgColor,
            gradientDeepColor,
            gradientLightColor,
            rowBgColorDeep,
            rowBgColorLight,
            companyLogosMap,
            toothSize,
            colorRule,
            headerLineSpacing = 10,
            headerTopPadding = 10,
            headerBottomPadding = 10,
            titleFontSize = 130, // 主标题字号，默认为130
            subtitleFontSize = 130,
            textAreaContent = '', // 文本区域内容
            textAreaFontSize = 30, // 文本区域字号，默认为30
            textAreaColor = '#333333', // 文本区域颜色，默认为深灰色
            showCompanyLogos = true, // 默认为true，表示显示公司Logo
            showMainImage = true, // 默认为true，表示显示主图片
            overallFontSize = 30, // 默认为30，整体字体大小
            lastColumnFontSize = 30, // 默认为30，最后一列的字体大小
            secondColumnDecimalPlaces = 1, // 默认为1，第二列数值小数位数
            barChartTemplate = 'default', // 柱状图模板选择
            positiveBarColor = '#bd2427', // 正值柱状图颜色
            negativeBarColor = '#28a745', // 负值柱状图颜色
            unifiedZeroAxisOffset = 0 // 统一模板0轴偏移，默认为0
        } = options;
        
        // 清空容器
        container.innerHTML = '';
        
        // SVG宽度 (固定)
        const svgWidth = 1181;
        const padding = 65;
        const innerWidth = svgWidth - (padding * 2);
        
        // 定义各区域的固定高度和位置
        const headerY = padding + 60;
        const headerHeight = 60;
        
        const titleY = headerY + headerHeight + 160; 
        const titleHeight = 130;
        
        // 文本区域位置和高度
        const textAreaY = titleY + titleHeight + 30;
        
        // 根据文本行数动态计算高度
        let textAreaHeight = 0;
        if (textAreaContent && textAreaContent.trim()) {
            const textAreaLines = textAreaContent.split('\n');
            const validLines = textAreaLines.filter(line => line.trim()).length;
            textAreaHeight = validLines * (textAreaFontSize + 5) + 20; // 每行高度 + 上下边距
        }
        
        // 调试：Y坐标计算
        console.log('=== Y坐标计算调试 ===');
        console.log('headerY:', headerY);
        console.log('headerHeight:', headerHeight);
        console.log('titleY:', titleY);
        console.log('titleHeight:', titleHeight);
        console.log('textAreaY:', textAreaY);
        console.log('textAreaHeight:', textAreaHeight);
        
        const imageY = textAreaY + textAreaHeight + (textAreaHeight > 0 ? 30 : 0); // 如果有文本区域则增加间距
        const imageHeight = 450;
        const imageWidth = innerWidth - 56;
        
        // 图片区域与数据表格间的装饰线位置
        const decorativeLineY = showMainImage ? (imageY + imageHeight + 30) : (textAreaY + textAreaHeight + 30);
        
        // 检查是否存在换行的表头
        let hasMultilineHeader = false;
        let maxHeaderLines = 1;
        if (excelHeaders && excelHeaders.length > 0) {
            for (const header of excelHeaders) {
                if (header && typeof header === 'string' && header.includes('\n')) {
                    hasMultilineHeader = true;
                    const lineCount = header.split('\n').length;
                    maxHeaderLines = Math.max(maxHeaderLines, lineCount);
                }
            }
        }
        
        // 表头相关参数 - 使用用户从界面设置的值
        const headerLineHeight = 30;   // 每行文字高度
        // 使用用户从UI传入的值
        // 行间距、上边距、下边距
        
        // 表头起始位置
        const tableHeaderY = decorativeLineY + 30; 
        
        // 计算表头总高度
        // 表头高度 = 上边距 + (行数 * 行高 + (行数-1) * 行间距) + 下边距
        const tableHeaderTextHeight = maxHeaderLines * headerLineHeight + 
                                    (maxHeaderLines - 1) * headerLineSpacing;
        const tableHeaderHeight = hasMultilineHeader ? 
            (headerTopPadding + tableHeaderTextHeight + headerBottomPadding) : 50;
        
        // 数据区域根据表头高度下移
        const dataY = tableHeaderY + tableHeaderHeight + 20;
        // 根据整体字体大小调整行高，字体越小行高越小
        const rowHeight = Math.max(60, 88 * (overallFontSize / 30)); // 基础行高88px，根据字体大小比例调整
        const rowSpacing = 10; // 行间距10px
        
        // 计算数据表格的总高度（考虑行间距）
        const dataTableHeight = (excelData.length * (rowHeight + rowSpacing)) - rowSpacing + 30; // 额外空间用于底部间距，减去最后一行的行间距
        
        // 计算SVG总高度 = 上面所有内容的高度 + 底部边距 + 额外空间用于小票外的版权区域
        const extraSpaceForCopyright = 100; // 为小票区域外的版权区域预留空间
        // 考虑文本区域高度：如果有文本内容，需要将文本区域高度加入总高度计算
        const textAreaAdjustment = (textAreaContent && textAreaContent.trim()) ? textAreaHeight : 0;
        const svgHeight = dataY + dataTableHeight + padding + extraSpaceForCopyright + textAreaAdjustment; // 减少内部高度，去掉copyrightHeight
        const innerHeight = svgHeight - (padding * 2) - extraSpaceForCopyright; // 确保内层小票不包含额外空间
        
        // 设置SVG属性
        container.setAttribute('width', svgWidth);
        container.setAttribute('height', svgHeight);
        container.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
        
        // 创建渐变定义
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        container.appendChild(defs);
        
        // 创建内层背景图片模式
        const insideBgPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        insideBgPattern.setAttribute('id', 'insideBg');
        insideBgPattern.setAttribute('patternUnits', 'userSpaceOnUse');
        insideBgPattern.setAttribute('width', innerWidth);
        insideBgPattern.setAttribute('height', innerHeight);
        
        const insideBgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        insideBgImage.setAttribute('href', insideBgSrc);
        insideBgImage.setAttribute('width', innerWidth);
        insideBgImage.setAttribute('height', innerHeight);
        insideBgImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        
        insideBgPattern.appendChild(insideBgImage);
        defs.appendChild(insideBgPattern);
        
        // 创建阴影滤镜
        const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        shadowFilter.setAttribute('id', 'ticketShadow');
        shadowFilter.setAttribute('x', '-20%');
        shadowFilter.setAttribute('y', '-20%');
        shadowFilter.setAttribute('width', '140%');
        shadowFilter.setAttribute('height', '140%');
        
        const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '10');
        feDropShadow.setAttribute('stdDeviation', '10');
        feDropShadow.setAttribute('flood-color', 'rgba(0,0,0,0.5)');
        
        shadowFilter.appendChild(feDropShadow);
        defs.appendChild(shadowFilter);
        
        // 创建副标题渐变（从上到下）
        const subtitleGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        subtitleGradient.setAttribute('id', 'subtitleGradient');
        subtitleGradient.setAttribute('x1', '0%');
        subtitleGradient.setAttribute('y1', '0%');
        subtitleGradient.setAttribute('x2', '0%');
        subtitleGradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', `stop-color:${gradientDeepColor}`);
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', `stop-color:${gradientLightColor}`);
        
        subtitleGradient.appendChild(stop1);
        subtitleGradient.appendChild(stop2);
        defs.appendChild(subtitleGradient);
        
        // 创建柱状图渐变（从右到左）
        const barGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        barGradient.setAttribute('id', 'barGradient');
        barGradient.setAttribute('x1', '100%');
        barGradient.setAttribute('y1', '0%');
        barGradient.setAttribute('x2', '0%');
        barGradient.setAttribute('y2', '0%');
        
        const barStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        barStop1.setAttribute('offset', '0%');
        barStop1.setAttribute('style', `stop-color:${gradientDeepColor}`);
        
        const barStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        barStop2.setAttribute('offset', '100%');
        barStop2.setAttribute('style', `stop-color:${gradientLightColor}`);
        
        barGradient.appendChild(barStop1);
        barGradient.appendChild(barStop2);
        defs.appendChild(barGradient);
        
        // 创建正值柱状图渐变（统一模板用）
        const positiveBarGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        positiveBarGradient.setAttribute('id', 'positiveBarGradient');
        positiveBarGradient.setAttribute('x1', '100%');
        positiveBarGradient.setAttribute('y1', '0%');
        positiveBarGradient.setAttribute('x2', '0%');
        positiveBarGradient.setAttribute('y2', '0%');
        
        const posBarStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        posBarStop1.setAttribute('offset', '0%');
        posBarStop1.setAttribute('style', `stop-color:${positiveBarColor}`);
        
        const posBarStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        posBarStop2.setAttribute('offset', '100%');
        posBarStop2.setAttribute('style', `stop-color:${positiveBarColor}CC`); // 添加透明度
        
        positiveBarGradient.appendChild(posBarStop1);
        positiveBarGradient.appendChild(posBarStop2);
        defs.appendChild(positiveBarGradient);
        
        // 创建负值柱状图渐变（统一模板用）
        const negativeBarGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        negativeBarGradient.setAttribute('id', 'negativeBarGradient');
        negativeBarGradient.setAttribute('x1', '100%');
        negativeBarGradient.setAttribute('y1', '0%');
        negativeBarGradient.setAttribute('x2', '0%');
        negativeBarGradient.setAttribute('y2', '0%');
        
        const negBarStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        negBarStop1.setAttribute('offset', '0%');
        negBarStop1.setAttribute('style', `stop-color:${negativeBarColor}`);
        
        const negBarStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        negBarStop2.setAttribute('offset', '100%');
        negBarStop2.setAttribute('style', `stop-color:${negativeBarColor}CC`); // 添加透明度
        
        negativeBarGradient.appendChild(negBarStop1);
        negativeBarGradient.appendChild(negBarStop2);
        defs.appendChild(negativeBarGradient);
        
        // 外层背景
        const outerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        outerBackground.setAttribute('width', svgWidth);
        outerBackground.setAttribute('height', svgHeight);
        outerBackground.setAttribute('fill', outerBgColor);
        container.appendChild(outerBackground);
        
        // 内层小票样式背景
        const ticketPath = createTicketPath(padding, padding, innerWidth, innerHeight, toothSize, decorativeLineY);
        const innerBackground = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerBackground.setAttribute('d', ticketPath);
        innerBackground.setAttribute('fill', 'url(#insideBg)');
        innerBackground.setAttribute('filter', 'url(#ticketShadow)'); // 添加阴影效果
        container.appendChild(innerBackground);
        
        // 移除单独添加的圆形覆盖层，改为让阴影效果自然应用于整个小票路径
        
        // 头部区域（账号名称和Logo）
        // 账号Logo
        const logoImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        logoImage.setAttribute('x', padding + 28);
        logoImage.setAttribute('y', headerY +20 ); // 稍微向上调整位置
        logoImage.setAttribute('width', svgWidth - (padding + 28) * 2); // 宽度设为整个可用区域
        logoImage.setAttribute('height', 50); // 增加高度以保持比例
        logoImage.setAttribute('href', accountLogoSrc);
        logoImage.setAttribute('preserveAspectRatio', 'xMinYMid meet'); // 左对齐显示并保持比例
        container.appendChild(logoImage);
        
        // 主标题处理（支持特殊标记的颜色）
        // 解析主标题中的特殊标记 [[文本]] 来应用渐变色
        const mainTitleParts = [];
        let mainTitleCurrentIndex = 0;
        const mainTitleRegex = /\[\[(.*?)\]\]/g;
        let mainTitleMatch;
        let mainTitleLastIndex = 0;
        
        // 解析主标题中的特殊标记
        while ((mainTitleMatch = mainTitleRegex.exec(mainTitle)) !== null) {
            // 添加标记前的普通文本
            if (mainTitleMatch.index > mainTitleLastIndex) {
                mainTitleParts.push({
                    text: mainTitle.substring(mainTitleLastIndex, mainTitleMatch.index),
                    isHighlighted: false
                });
            }
            
            // 添加高亮文本
            mainTitleParts.push({
                text: mainTitleMatch[1],
                isHighlighted: true
            });
            
            mainTitleLastIndex = mainTitleMatch.index + mainTitleMatch[0].length;
        }
        
        // 添加剩余的普通文本
        if (mainTitleLastIndex < mainTitle.length) {
            mainTitleParts.push({
                text: mainTitle.substring(mainTitleLastIndex),
                isHighlighted: false
            });
        }
        
        // 创建主标题元素
        const mainTitleSvgElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mainTitleSvgElement.setAttribute('x', padding + 28);
        mainTitleSvgElement.setAttribute('y', titleY);
        mainTitleSvgElement.setAttribute('font-size', titleFontSize);
        mainTitleSvgElement.setAttribute('font-weight', 'bold');
        mainTitleSvgElement.setAttribute('font-family', 'MiSans-Bold, sans-serif');
        
        // 为每个部分创建tspan元素
        mainTitleParts.forEach(part => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = part.text;
            
            // 应用颜色：高亮文本使用渐变色，普通文本使用黑色
            if (part.isHighlighted) {
                tspan.setAttribute('fill', 'url(#subtitleGradient)');
            } else {
                tspan.setAttribute('fill', '#000000');
            }
            
            mainTitleSvgElement.appendChild(tspan);
        });
        
        container.appendChild(mainTitleSvgElement);
        
        // 副标题处理（支持特殊标记的颜色）
        // 解析副标题中的特殊标记 [[文本]] 来应用渐变色
        const subTitleParts = [];
        let currentIndex = 0;
        const regex = /\[\[(.*?)\]\]/g;
        let match;
        let lastIndex = 0;
        
        // 解析副标题中的特殊标记
        while ((match = regex.exec(subtitle)) !== null) {
            // 添加标记前的普通文本
            if (match.index > lastIndex) {
                subTitleParts.push({
                    text: subtitle.substring(lastIndex, match.index),
                    isHighlighted: false
                });
            }
            
            // 添加需要高亮的文本（去掉标记）
            subTitleParts.push({
                text: match[1],
                isHighlighted: true
            });
            
            lastIndex = match.index + match[0].length;
        }
        
        // 添加最后一部分普通文本
        if (lastIndex < subtitle.length) {
            subTitleParts.push({
                text: subtitle.substring(lastIndex),
                isHighlighted: false
            });
        }
        
        // 如果没有特殊标记，就整体作为一个部分
        if (subTitleParts.length === 0) {
            subTitleParts.push({
                text: subtitle,
                isHighlighted: false
            });
        }
        
        // 创建单个text元素，使用tspan实现部分高亮
        const subTitleElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subTitleElement.setAttribute('x', padding + 28);
        subTitleElement.setAttribute('y', titleY + 130);
        subTitleElement.setAttribute('font-size', subtitleFontSize); // 使用传入的字号
        subTitleElement.setAttribute('font-weight', 'bold');
        subTitleElement.setAttribute('font-family', 'MiSans-Bold, sans-serif');
        
        // 添加各部分文本作为tspan
        subTitleParts.forEach(part => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = part.text;
            
            // 应用颜色：高亮文本使用渐变色，普通文本使用黑色
            if (part.isHighlighted) {
                tspan.setAttribute('fill', 'url(#subtitleGradient)');
            } else {
                tspan.setAttribute('fill', '#000000');
            }
            
            subTitleElement.appendChild(tspan);
        });
        
        container.appendChild(subTitleElement);
        

        // 文本区域（在副标题和主图片之间）
        console.log('=== 文本区域渲染调试 ===');
        console.log('textAreaContent:', textAreaContent);
        console.log('textAreaContent.trim():', textAreaContent ? textAreaContent.trim() : 'null');
        console.log('textAreaY:', textAreaY);
        console.log('textAreaFontSize:', textAreaFontSize);
        
        if (textAreaContent && textAreaContent.trim()) {
            console.log('开始渲染文本区域内容');
            const textAreaLines = textAreaContent.split('\n');
            console.log('文本区域行数:', textAreaLines.length);
            console.log('文本区域各行:', textAreaLines);
            
            textAreaLines.forEach((line, index) => {
                console.log(`处理第${index + 1}行:`, line);
                if (line.trim()) {
                    const textAreaElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    const x = padding + 28;
                    const y = textAreaY + (index * (textAreaFontSize + 5)) + textAreaFontSize;
                    
                    console.log(`创建文本元素 - x: ${x}, y: ${y}, 字号: ${textAreaFontSize}`);
                    
                    textAreaElement.setAttribute('x', x);
                    textAreaElement.setAttribute('y', y);
                    textAreaElement.setAttribute('font-size', textAreaFontSize);
                    textAreaElement.setAttribute('font-weight', 'normal');
                    textAreaElement.setAttribute('font-family', 'MiSans-Medium, sans-serif');
                    textAreaElement.setAttribute('fill', 'url(#subtitleGradient)');
                    textAreaElement.textContent = line;
                    container.appendChild(textAreaElement);
                    console.log(`文本元素已添加到容器:`, textAreaElement);
                }
            });
        } else {
            console.log('文本区域内容为空，跳过渲染');
        }
        
        // 图片区域
        if (mainImageSrc && showMainImage) {
            const mainImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            mainImage.setAttribute('x', padding + 28);
            mainImage.setAttribute('y', imageY);
            mainImage.setAttribute('width', imageWidth);
            mainImage.setAttribute('height', imageHeight);
            mainImage.setAttribute('href', mainImageSrc);
            mainImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // 添加圆角效果
            const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            clipPath.setAttribute('id', 'roundedCorner');
            const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            clipRect.setAttribute('x', padding + 28);
            clipRect.setAttribute('y', imageY);
            clipRect.setAttribute('width', imageWidth);
            clipRect.setAttribute('height', imageHeight);
            clipRect.setAttribute('rx', 20);
            clipRect.setAttribute('ry', 20);
            clipPath.appendChild(clipRect);
            container.appendChild(clipPath);
            
            mainImage.setAttribute('clip-path', 'url(#roundedCorner)');
            container.appendChild(mainImage);
        }
        
        // 装饰线 - 图片区域和数据表格之间
        const decorativeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        decorativeLine.setAttribute('x1', padding + 28);
        decorativeLine.setAttribute('y1', decorativeLineY);
        decorativeLine.setAttribute('x2', svgWidth - padding - 30);
        decorativeLine.setAttribute('y2', decorativeLineY);
        decorativeLine.setAttribute('stroke', '#aaa');
        decorativeLine.setAttribute('stroke-width', '2');
        decorativeLine.setAttribute('stroke-dasharray', '5,3');
        container.appendChild(decorativeLine);
        
        // 渲染数据表格头
        if (excelData && excelData.length > 0) {
            const columns = Object.keys(excelData[0]);
            
            // 动态生成列名，从Excel的字段名获取
            let columnNames = [];
            
            // 如果有Excel表头，使用它们作为列名
            if (excelHeaders && excelHeaders.length > 0) {
                columnNames = excelHeaders;
            } else {
                // 如果没有表头或获取失败，使用默认列名
                for (let i = 0; i < columns.length; i++) {
                    if (i === 0) {
                        columnNames.push('公司名称');
                    } else if (i === 1) {
                        columnNames.push('资本开支(亿元)');
                    } else if (i === 2) {
                        columnNames.push('资本开支同比变化(%)');
                    } else {
                        columnNames.push(`数据${i}`);
                    }
                }
            }
            
            // 新的列宽分配逻辑 - 按照用户要求的处理顺序
            // 1. 确定第一列宽度（固定值或根据是否显示logo调整）
            const firstColWidth = showCompanyLogos ? 250 : 170; // 不显示logo时减少第一列宽度
            
            // 2. 判断最后一列是否为文本列
            const isLastColText = columns.length > 1 && (() => {
                let textCount = 0;
                const sampleSize = Math.min(excelData.length, 5);
                for (let j = 0; j < sampleSize; j++) {
                    const value = excelData[j][columns[columns.length - 1]];
                    if (value && isNaN(parseFloat(value))) {
                        textCount++;
                    }
                }
                return textCount > sampleSize / 2;
            })();
            
            // 3. 初始化列宽数组
            const colWidths = new Array(columns.length).fill(0);
            
            // 步骤1：先处理第一列和最后一列
            colWidths[0] = firstColWidth;
            
            // 辅助函数：计算单列文本内容长度
            function calculateColumnTextLength(colIndex) {
                const titleText = columnNames[colIndex] || '';
                
                // 处理多行表头，取最长的一行计算宽度
                let maxTitleLength = 0;
                if (titleText.includes('\n')) {
                    const titleLines = titleText.split('\n');
                    for (const line of titleLines) {
                        const lineLength = estimateTextWidth(line, overallFontSize, overallFontSize / 2);
                        maxTitleLength = Math.max(maxTitleLength, lineLength);
                    }
                } else {
                    // 中文字符宽度估算根据整体字体大小调整
                    maxTitleLength = estimateTextWidth(titleText, overallFontSize, overallFontSize / 2);
                }
                
                // 计算数据最大长度
                let maxDataLength = 0;
                excelData.forEach(row => {
                    const dataStr = String(row[columns[colIndex]] || '');
                    
                    // 检测文本中是否含有特殊模式（如"芯片、算力"这样的组合）
                    const containsSpecialPattern = /[、，,]/.test(dataStr);
                    
                    // 中文字符宽度估算根据整体字体大小调整
                    // 针对最后一列，按照字体大小的比例调整宽度
                    const charWidthScaleFactor = colIndex === columns.length - 1 ? (lastColumnFontSize / overallFontSize) : 1;
                    const chineseCharWidth = (overallFontSize * 0.87) * charWidthScaleFactor; // 约为字体大小的0.87倍
                    const englishCharWidth = (overallFontSize * 0.43) * charWidthScaleFactor; // 约为字体大小的0.43倍
                    let dataLength = estimateTextWidth(dataStr, chineseCharWidth, englishCharWidth);
                    
                    // 对于特殊模式，增加额外宽度以避免文本重叠
                    if (containsSpecialPattern) {
                        const extraPadding = Math.min(dataStr.length * 3 * charWidthScaleFactor, overallFontSize * charWidthScaleFactor); // 根据文本长度增加额外填充
                        dataLength += extraPadding;
                    }
                    
                    maxDataLength = Math.max(maxDataLength, dataLength);
                });
                
                // 使用标题和数据的最大长度，加上内边距
                // 根据整体字体大小动态调整列内边距
                const basePadding = 20; // 基础内边距
                const fontSizeRatio = overallFontSize / 30; // 字体大小比例（30为基准）
                const dynamicPadding = Math.max(basePadding * fontSizeRatio, 15); // 最小15px内边距
                return Math.max(maxTitleLength, maxDataLength) + dynamicPadding;
            }
            
            // 步骤1续：计算最后一列宽度
            if (columns.length > 1) {
                const lastColIndex = columns.length - 1;
                const lastColTextLength = calculateColumnTextLength(lastColIndex);
                const widthScaleFactor = lastColumnFontSize / overallFontSize; // 字体大小比例
                const minWidth = (150 * overallFontSize / 30) * widthScaleFactor; // 根据整体字体大小调整基础最小宽度
                colWidths[lastColIndex] = Math.max(lastColTextLength, minWidth);
                
                // 为最后一列增加额外的右边距，避免与倒数第二列重叠
                const extraRightPadding = Math.max(20 * (overallFontSize / 30), 15);
                colWidths[lastColIndex] += extraRightPadding;
            }
            
            // 辅助函数：估算文本宽度，区分中文和英文字符
            function estimateTextWidth(text, chineseCharWidth, englishCharWidth) {
                let width = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text.charAt(i);
                    // 检查是否为中文字符（Unicode范围）
                    if (/[\u4e00-\u9fa5]/.test(char)) {
                        width += chineseCharWidth;
                    } else if (/[,、，.。:：;；!！?？]/.test(char)) {
                        // 标点符号给予额外宽度
                        width += englishCharWidth * 1.2;
                    } else {
                        width += englishCharWidth;
                    }
                }
                
                // 检查是否包含多个连续的非中文字符（如"社保基金、养老金"）
                if (/[,、，.。:：;；]/.test(text)) {
                    // 有标点符号的文本，给予额外宽度以确保显示
                    width += 20;
                }
                return width;
            }
            
            // 步骤2：处理除第二列外的其他列（第三列到倒数第二列）
            for (let i = 2; i < columns.length - 1; i++) {
                const colTextLength = calculateColumnTextLength(i);
                
                // 确保每列至少有一个最小宽度，第三列和第四列需要更大的最小宽度
                if (i === 2) {
                    // 第三列（行业/概念列）需要更大的最小宽度，根据字体大小调整
                    const baseMinWidth = 180;
                    const adjustedMinWidth = baseMinWidth * (overallFontSize / 30);
                    colWidths[i] = Math.max(colTextLength, adjustedMinWidth);
                } else if (i === 3) {
                    // 第四列（机构名称列）可能包含较长文本，给予更大的最小宽度，根据字体大小调整
                    const baseMinWidth = 200;
                    const adjustedMinWidth = baseMinWidth * (overallFontSize / 30);
                    colWidths[i] = Math.max(colTextLength, adjustedMinWidth);
                } else {
                    // 其他列使用标准最小宽度，根据整体字体大小调整
                    const minWidth = 150 * overallFontSize / 30; // 根据整体字体大小调整最小宽度
                    colWidths[i] = Math.max(colTextLength, minWidth);
                }
                
                // 为倒数第二列增加额外的右边距，避免与最后一列重叠
                if (i === columns.length - 2) {
                    const extraRightPadding = Math.max(15 * (overallFontSize / 30), 10);
                    colWidths[i] += extraRightPadding;
                }
            }
            
            // 步骤3：计算第二列宽度（填充剩余空间）
            const otherColsWidth = colWidths.reduce((sum, width) => sum + width, 0);
            const secondColWidth = innerWidth - 56 - otherColsWidth;
            colWidths[1] = Math.max(secondColWidth, 150); // 确保第二列有最小宽度
            
            // 步骤4：计算每列的起始位置，添加动态列间距
            const colPositions = [];
            let currentPos = padding + 28; // 表格左边缘位置
            
            // 根据字体大小动态调整列间距
            const baseColumnSpacing = 10; // 基础列间距
            const fontSizeRatio = overallFontSize / 30; // 字体大小比例
            const dynamicColumnSpacing = Math.max(baseColumnSpacing * fontSizeRatio, 8); // 动态列间距，最小8px
            
            // 最后两列之间的特殊间距，避免文字重叠
            const lastTwoColumnsSpacing = Math.max(20 * fontSizeRatio, 15); // 最后两列间距更大
            
            for (let i = 0; i < columns.length; i++) {
                colPositions[i] = currentPos;
                currentPos += colWidths[i];
                
                // 添加列间距
                if (i < columns.length - 1) {
                    if (i === columns.length - 2) {
                        // 倒数第二列和最后一列之间使用更大的间距
                        currentPos += lastTwoColumnsSpacing;
                    } else if (i >= 1) {
                        // 第三列及以后的列之间添加标准间距（前两列保持紧密排列）
                        currentPos += dynamicColumnSpacing;
                    }
                }
            }
            
            // 头部表格背景
            const headerBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            headerBg.setAttribute('x', padding + 28);
            headerBg.setAttribute('y', tableHeaderY);
            headerBg.setAttribute('width', innerWidth - 56);
            headerBg.setAttribute('height', tableHeaderHeight);
            headerBg.setAttribute('fill', 'transparent');
            headerBg.setAttribute('rx', 5);
            headerBg.setAttribute('ry', 5);
            container.appendChild(headerBg);
            
            // 表格头部文字
            for (let i = 0; i < Math.min(columns.length, columnNames.length); i++) {
                const headerText = columnNames[i] || columns[i];
                // 检查是否包含换行符
                const hasLineBreak = headerText.includes('\n');
                const headerLines = hasLineBreak ? headerText.split('\n') : [headerText];
                
                if (hasLineBreak) {
                    // 如果有换行符，为每一行创建单独的文本元素
                    const lineCount = headerLines.length;
                    
                    // 计算多行文本的总高度
                    const totalTextHeight = lineCount * headerLineHeight + 
                                           (lineCount - 1) * headerLineSpacing;
                    
                    // 计算第一行的起始位置 (使整体垂直居中)
                    const startY = tableHeaderY + headerTopPadding;
                    
                    for (let lineIndex = 0; lineIndex < headerLines.length; lineIndex++) {
                        const lineText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        
                        if (i === 0) {
                            if (showCompanyLogos) {
                                // 第一列表头与公司名称文本对齐，显示logo时
                                const logoX = colPositions[i] + 45; // logo中心点x坐标
                                const logoRadius = 35; // logo半径
                                const companyNameX = logoX + logoRadius + 15; // 公司名称文本的x位置
                                lineText.setAttribute('x', companyNameX);
                                lineText.setAttribute('text-anchor', 'start'); // 左对齐
                            } else {
                                // 不显示logo时，第一列表头居中
                                lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                                lineText.setAttribute('text-anchor', 'middle');
                            }
                        } else if (i === columns.length - 1) {
                            // 最后一列右对齐，无论是否为文本列
                            lineText.setAttribute('x', svgWidth - padding - 28 - 10); // 距离右边缘10px
                            lineText.setAttribute('text-anchor', 'end');
                        } else {
                            // 其他列(包括第二列)居中对齐
                            lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                            lineText.setAttribute('text-anchor', 'middle');
                        }
                        
                        // 每一行的Y位置计算：起始位置 + 行号*(行高+行间距) + 行高/2(文字垂直居中)
                        const lineY = startY + lineIndex * (headerLineHeight + headerLineSpacing) + headerLineHeight/2;
                        lineText.setAttribute('y', lineY);
                        lineText.setAttribute('dominant-baseline', 'middle');
                        lineText.setAttribute('font-size', overallFontSize); // 使用整体字体大小
                        lineText.setAttribute('font-weight', 'bold');
                        lineText.setAttribute('font-family', 'MiSans-DemiBold, sans-serif');
                        lineText.setAttribute('fill', '#333333');
                        lineText.textContent = headerLines[lineIndex];
                        container.appendChild(lineText);
                    }
                } else {
                    // 单行表头处理逻辑 - 保持顶端对齐
                    const lineText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    
                    if (i === 0) {
                        if (showCompanyLogos) {
                            // 第一列表头与公司名称文本对齐，显示logo时
                            const logoX = colPositions[i] + 45; // logo中心点x坐标
                            const logoRadius = 35; // logo半径
                            const companyNameX = logoX + logoRadius + 15; // 公司名称文本的x位置
                            lineText.setAttribute('x', companyNameX);
                            lineText.setAttribute('text-anchor', 'start'); // 左对齐
                        } else {
                            // 不显示logo时，第一列表头居中
                            lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                            lineText.setAttribute('text-anchor', 'middle');
                        }
                    } else if (i === columns.length - 1) {
                        // 最后一列右对齐，无论是否为文本列
                        lineText.setAttribute('x', svgWidth - padding - 28 - 10); // 距离右边缘10px
                        lineText.setAttribute('text-anchor', 'end');
                    } else {
                        // 其他列(包括第二列)居中对齐
                        lineText.setAttribute('x', colPositions[i] + colWidths[i] / 2);
                        lineText.setAttribute('text-anchor', 'middle');
                    }
                    
                    // 单行表头与多行表头的第一行保持位置一致
                    const singleLineY = tableHeaderY + headerTopPadding + headerLineHeight/2;
                    
                    lineText.setAttribute('y', singleLineY);
                    lineText.setAttribute('dominant-baseline', 'middle');
                    lineText.setAttribute('font-size', overallFontSize); // 使用整体字体大小
                    lineText.setAttribute('font-weight', 'bold');
                    lineText.setAttribute('font-family', 'MiSans-DemiBold, sans-serif');
                    lineText.setAttribute('fill', '#333333');
                    lineText.textContent = headerText;
                    container.appendChild(lineText);
                }
            }
            
            // 计算第二列的最大值用于柱状图比例（如果有第二列的话）
            let maxValue = 0;
            let minValue = 0;
            let maxAbsValue = 0;
            if (columns.length > 1) {
                const secondColumn = columns[1];
                
                // 计算数据中的最大值、最小值和最大绝对值
                const values = excelData.map(row => {
                    const val = parseFloat(row[secondColumn]);
                    return isNaN(val) ? 0 : val;
                });
                
                maxValue = Math.max(...values);
                minValue = Math.min(...values);
                maxAbsValue = Math.max(Math.abs(maxValue), Math.abs(minValue));
                
                // 如果最大绝对值很小，设置一个合理的最小值以避免柱状图太短
                if (maxAbsValue < 10) {
                    // 向上取整到最接近的整数
                    maxAbsValue = Math.ceil(maxAbsValue);
                }
            }
            
            // 预处理数据列，检查每列是否存在负数
            const columnsWithNegativeValues = {};
            const columnsAllPositive = {};
            const columnsAllNegative = {};
            
            columns.forEach((col, colIdx) => {
                if (colIdx < 2) return; // 只处理第三列及以后
                
                // 检查该列是否存在负数以及是否全为正数或负数
                let hasPositive = false;
                let hasNegative = false;
                
                excelData.forEach(dataRow => {
                    const valueStr = String(dataRow[col]);
                    // 对百分比格式进行特殊处理
                    const numericValue = parseFloat(valueStr.replace('%', ''));
                    if (!isNaN(numericValue)) {
                        if (numericValue > 0) hasPositive = true;
                        if (numericValue < 0) hasNegative = true;
                    }
                });
                
                // 规则1标记 - 只有当列中同时存在正负值时才标记
                columnsWithNegativeValues[col] = hasPositive && hasNegative;
                // 规则2标记 - 记录列是否全为正值或全为负值
                columnsAllPositive[col] = hasPositive && !hasNegative;
                columnsAllNegative[col] = !hasPositive && hasNegative;
            });
            
            // 判断数据行中第三列特殊对齐的条件
            const hasSpecialThirdColAlignment = (() => {
                // 检查是否是四列数据
                if (columns.length !== 4) return false;
                
                // 检查第三列是否为数字
                const thirdColIndex = 2; // 第三列索引
                let numberCount = 0;
                const sampleSize = Math.min(excelData.length, 5);
                for (let i = 0; i < sampleSize; i++) {
                    const value = excelData[i][columns[thirdColIndex]];
                    if (value) {
                        const valueStr = String(value);
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        if (!isNaN(numericValue)) {
                            numberCount++;
                        }
                    }
                }
                return numberCount > sampleSize / 2; // 大部分为数字则视为数字列
            })();
            
            // 存储第三列首行数字的右边界位置（用于其他行对齐）
            let thirdColFirstRowRightBoundary = null;
            
            // 渲染数据行
            excelData.forEach((row, rowIndex) => {
                const rowY = dataY + (rowIndex * (rowHeight + rowSpacing));
                const rowCenterY = rowY + (rowHeight / 2); // 行的垂直中心点
                
                // 创建每行背景，带从左到右的渐变效果
                const rowBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rowBg.setAttribute('x', padding + 28);
                rowBg.setAttribute('y', rowY);
                rowBg.setAttribute('width', innerWidth - 56);
                rowBg.setAttribute('height', rowHeight);
                rowBg.setAttribute('rx', 5);
                rowBg.setAttribute('ry', 5);
                
                // 创建渐变
                const gradientId = `rowGradient-${rowIndex}`;
                const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                gradient.setAttribute('id', gradientId);
                gradient.setAttribute('x1', '0%');
                gradient.setAttribute('y1', '0%');
                gradient.setAttribute('x2', '100%');
                gradient.setAttribute('y2', '0%');
                
                // 渐变起点 - 设置的行背景色
                const startColor = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                startColor.setAttribute('offset', '0%');
                startColor.setAttribute('stop-color', rowBgColorDeep || '#f0f7ff');
                
                // 渐变终点 - 使用设置的浅色
                const endColor = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                endColor.setAttribute('offset', '100%');
                endColor.setAttribute('stop-color', rowBgColorLight || '#ffffff');  // 使用用户设置的浅色
                
                gradient.appendChild(startColor);
                gradient.appendChild(endColor);
                
                // 添加渐变到SVG的defs区域
                const defs = container.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!container.querySelector('defs')) {
                    container.appendChild(defs);
                }
                defs.appendChild(gradient);
                
                // 应用渐变到行背景
                rowBg.setAttribute('fill', `url(#${gradientId})`);
                container.appendChild(rowBg);
                
                // 绘制表格单元格数据
                columns.forEach((col, colIndex) => {
                    const colX = colPositions[colIndex]; // 使用预计算的列位置
                    const colWidth = colWidths[colIndex];
                    const value = row[col];
                    
                    // 检查是否为数值和是否为文本
                    const isNumber = !isNaN(parseFloat(value));
                    const valueAsString = String(value).trim();
                    const hasExplicitSign = valueAsString.startsWith('+') || valueAsString.startsWith('-');
                    
                    // 判断是否为最后一列
                    const isLastColumn = colIndex === columns.length - 1;
                    
                    if (colIndex === 0) {
                        // Logo 和公司名称
                        const companyName = value;
                        const logoUrl = companyLogosMap && companyLogosMap.has(companyName) 
                            ? companyLogosMap.get(companyName) 
                            : null;
                        
                        // 计算行的中心点，确保一致的垂直对齐
                        const centerY = rowY + (rowHeight / 2);
                        
                        // 根据showCompanyLogos参数决定是否显示公司Logo
                        if (showCompanyLogos) {
                            // 调整logo位置，使其距离行左边缘有10px的距离
                            const logoX = colX + 45; // 从原来的x + 35调整为x + 45，增加10px的间距
                            
                            // 创建logo的圆形裁剪路径
                            const clipPathId = `company-logo-clip-${rowIndex}`;
                            const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                            clipPath.setAttribute('id', clipPathId);
                            const clipCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            const logoRadius = 35;
                            clipCircle.setAttribute('cx', logoX);
                            clipCircle.setAttribute('cy', centerY); // 使用同一个centerY确保对齐
                            clipCircle.setAttribute('r', logoRadius);
                            clipPath.appendChild(clipCircle);
                            container.appendChild(clipPath);
                            
                            // 添加白色圆底作为logo背景
                            const logoBackground = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                            logoBackground.setAttribute('cx', logoX);
                            logoBackground.setAttribute('cy', centerY); // 使用同一个centerY确保对齐
                            logoBackground.setAttribute('r', logoRadius);
                            logoBackground.setAttribute('fill', '#ffffff');
                            logoBackground.setAttribute('stroke', '#eeeeee');
                            logoBackground.setAttribute('stroke-width', '1');
                            container.appendChild(logoBackground);
                            
                            if (logoUrl) {
                                // 使用实际公司logo
                                const companyLogo = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                                const logoSize = logoRadius * 2;
                                companyLogo.setAttribute('x', logoX - logoRadius); // 中心点减去半径
                                companyLogo.setAttribute('y', centerY - logoRadius); // 使用同一个centerY确保对齐
                                companyLogo.setAttribute('width', logoSize);
                                companyLogo.setAttribute('height', logoSize);
                                companyLogo.setAttribute('href', logoUrl);
                                companyLogo.setAttribute('clip-path', `url(#${clipPathId})`);
                                companyLogo.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                                
                                // 添加加载错误处理
                                companyLogo.addEventListener('error', function() {
                                    // 加载失败时不添加任何占位图，直接移除失败的图像元素
                                    this.remove();
                                });
                                
                                container.appendChild(companyLogo);
                            }
                            
                            // 公司名称 - 显示Logo时的位置
                            const companyNameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            companyNameText.setAttribute('x', logoX + logoRadius + 15); // 调整为基于新的logo位置
                            companyNameText.setAttribute('y', centerY); // 使用同一个centerY确保对齐
                            companyNameText.setAttribute('font-size', overallFontSize);
                            companyNameText.setAttribute('font-weight', 'bold');
                            companyNameText.setAttribute('font-family', 'MiSans-SemiBold, sans-serif');
                            companyNameText.setAttribute('fill', '#333333');
                            companyNameText.setAttribute('dominant-baseline', 'middle'); // 确保垂直居中

                            // 检测是否为3个汉字的公司名称
                            // 假设标准的4字公司名称宽度约为144px(每个汉字约36px)
                            if (/^[\u4e00-\u9fa5]{3}$/.test(companyName)) {
                                // 设置textLength属性，使3个字的名称展示为与4个字相同的宽度
                                companyNameText.setAttribute('textLength', '144');
                                companyNameText.setAttribute('lengthAdjust', 'spacing');
                            }

                            companyNameText.textContent = companyName;
                            container.appendChild(companyNameText);
                        } else {
                            // 不显示Logo时，公司名称靠左对齐
                            const companyNameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            companyNameText.setAttribute('x', colX + 20); // 靠左对齐，留出合适的间距
                            companyNameText.setAttribute('y', centerY); // 使用同一个centerY确保对齐
                            companyNameText.setAttribute('font-size', overallFontSize);
                            companyNameText.setAttribute('font-weight', 'bold');
                            companyNameText.setAttribute('font-family', 'MiSans-SemiBold, sans-serif');
                            companyNameText.setAttribute('fill', '#333333');
                            companyNameText.setAttribute('dominant-baseline', 'middle'); // 确保垂直居中
                            companyNameText.textContent = companyName;
                            container.appendChild(companyNameText);
                        }
                    } else if (colIndex === 1) {
                        // 第二列：柱状图处理 - 使用剩余空间，支持正负值
                        // 检查是否为数值
                        const numValue = parseFloat(value);
                        
                        if (!isNaN(numValue) && maxAbsValue > 0) {
                            // 计算可用宽度（减去左右内边距）
                            const totalAvailWidth = colWidth - 20; // 总可用宽度
                            const leftPadding = 10; // 左内边距
                            
                            const barHeight = rowHeight;
                            let barX, barWidth, barColor, zeroAxisX;
                            
                            if (barChartTemplate === 'unified') {
                                // 统一模板：所有柱子向右延伸，0轴位置可调整
                                // 根据偏移百分比计算0轴位置
                                const offsetWidth = (unifiedZeroAxisOffset / 100) * totalAvailWidth;
                                zeroAxisX = colX + leftPadding + offsetWidth;
                                barX = zeroAxisX;
                                
                                // 计算柱状图宽度，基于实际数据的最大绝对值，确保最大值填充剩余可用宽度
                                // 重新计算当前数据的最大绝对值
                                const currentDataValues = excelData.map(row => {
                                    const val = parseFloat(row[columns[1]]);
                                    return isNaN(val) ? 0 : val;
                                });
                                const actualMaxAbsValue = Math.max(...currentDataValues.map(v => Math.abs(v)));
                                
                                // 计算0轴右侧的剩余可用宽度
                                const remainingWidth = totalAvailWidth - offsetWidth;
                                barWidth = (Math.abs(numValue) / actualMaxAbsValue) * remainingWidth;
                                
                                // 根据正负值设置渐变色
                                barColor = numValue >= 0 ? 'url(#positiveBarGradient)' : 'url(#negativeBarGradient)';
                            } else {
                                // 默认模板：0轴动态定位，正值向右负值向左
                                // 计算0轴位置：基于数值范围动态确定
                                if (maxValue > 0 && minValue < 0) {
                                    // 有正有负：0轴位置按比例分配
                                    const positiveRange = maxValue;
                                    const negativeRange = Math.abs(minValue);
                                    const totalRange = positiveRange + negativeRange;
                                    const negativeWidth = (negativeRange / totalRange) * totalAvailWidth;
                                    zeroAxisX = colX + leftPadding + negativeWidth;
                                } else if (maxValue > 0) {
                                    // 只有正值：0轴在最左侧
                                    zeroAxisX = colX + leftPadding;
                                } else {
                                    // 只有负值：0轴在最右侧
                                    zeroAxisX = colX + leftPadding + totalAvailWidth;
                                }
                                
                                if (numValue >= 0) {
                                    // 正值：从0轴向右延伸
                                    barX = zeroAxisX;
                                    if (maxValue > 0) {
                                        if (minValue < 0) {
                                            // 有正有负的情况
                                            const positiveRange = maxValue;
                                            const negativeRange = Math.abs(minValue);
                                            const totalRange = positiveRange + negativeRange;
                                            const positiveWidth = (positiveRange / totalRange) * totalAvailWidth;
                                            barWidth = (numValue / maxValue) * positiveWidth;
                                        } else {
                                            // 只有正值的情况
                                            barWidth = (numValue / maxValue) * totalAvailWidth;
                                        }
                                    } else {
                                        barWidth = 0;
                                    }
                                } else {
                                    // 负值：从0轴向左延伸
                                    if (minValue < 0) {
                                        if (maxValue > 0) {
                                            // 有正有负的情况
                                            const positiveRange = maxValue;
                                            const negativeRange = Math.abs(minValue);
                                            const totalRange = positiveRange + negativeRange;
                                            const negativeWidth = (negativeRange / totalRange) * totalAvailWidth;
                                            barWidth = (Math.abs(numValue) / Math.abs(minValue)) * negativeWidth;
                                        } else {
                                            // 只有负值的情况
                                            barWidth = (Math.abs(numValue) / Math.abs(minValue)) * totalAvailWidth;
                                        }
                                    } else {
                                        barWidth = 0;
                                    }
                                    barX = zeroAxisX - barWidth;
                                }
                                
                                // 默认模板使用渐变色
                                barColor = `url(#barGradient)`;
                            }
                            
                            // 柱状图
                            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            bar.setAttribute('x', barX);
                            bar.setAttribute('y', rowCenterY - (barHeight / 2));
                            bar.setAttribute('width', barWidth);
                            bar.setAttribute('height', barHeight);
                            bar.setAttribute('fill', barColor);
                            container.appendChild(bar);
                            
                            // 数值文本显示逻辑
                            const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            
                            // 判断正值柱状图宽度，如果足够宽就将数值显示在柱体内部
                            // 使用第二列列宽的2/3作为阈值
                            const minWidthForInnerText = colWidth * 1 / 2;
                            let textColor = gradientDeepColor; // 默认使用主题渐变色的深色
                            let textX;
                            
                            if (barChartTemplate === 'unified') {
                                // 统一模板：根据柱宽决定文本位置和颜色
                                if (barWidth >= minWidthForInnerText) {
                                    // 柱体足够宽，将文本放在柱体内部靠右侧
                                    textX = barX + barWidth - 20; // 距离柱子右侧20px
                                    textColor = '#FFFFFF'; // 白色文本
                                    valueText.setAttribute('text-anchor', 'end'); // 文本右对齐
                                } else {
                                    // 柱体较窄，将文本放在柱体外部右侧
                                    textX = barX + barWidth + 10; // 距离柱体右边10px
                                    textColor = numValue >= 0 ? positiveBarColor : negativeBarColor; // 使用柱体颜色
                                    valueText.setAttribute('text-anchor', 'start'); // 文本左对齐
                                }
                            } else {
                                // 默认模板：保持原有逻辑
                                if (numValue >= 0 && barWidth >= minWidthForInnerText) {
                                    // 正值柱体足够宽，将文本放在柱体内部靠右侧
                                    textX = barX + barWidth - 20; // 距离柱子右侧20px
                                    textColor = '#FFFFFF'; // 白色文本
                                    valueText.setAttribute('text-anchor', 'end'); // 文本右对齐
                                } else {
                                    // 柱体较窄或为负值，将文本放在0轴右侧
                                    if (numValue >= 0) {
                                        textX = barX + barWidth + 10; // 正值柱体右侧
                                    } else {
                                        textX = zeroAxisX + 10; // 0轴右侧
                                    }
                                    // 使用主题渐变色的深色
                                    valueText.setAttribute('text-anchor', 'start'); // 文本左对齐
                                }
                            }
                            
                            valueText.setAttribute('x', textX);
                            valueText.setAttribute('y', rowCenterY);
                            valueText.setAttribute('font-size', overallFontSize);
                            valueText.setAttribute('font-weight', 'bold');
                            valueText.setAttribute('font-family', 'MiSans-SemiBold, sans-serif');
                            valueText.setAttribute('fill', textColor);
                            valueText.setAttribute('dominant-baseline', 'middle');
                            
                            // 格式化数值显示，控制小数位数
                            let formattedValue = value;
                            if (typeof numValue === 'number' && !isNaN(numValue)) {
                                // 检查原始值是否包含百分号
                                const hasPercent = String(value).includes('%');
                                // 格式化数值到指定小数位数
                                formattedValue = numValue.toFixed(secondColumnDecimalPlaces);
                                // 如果原始值有百分号，添加回去
                                if (hasPercent) {
                                    formattedValue += '%';
                                }
                            }
                            
                            valueText.textContent = formattedValue;
                            container.appendChild(valueText);
                        } else {
                            // 非数值，直接显示文本
                            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                            
                            // 第一行文本居中，其他行与第一行保持左对齐
                            if (rowIndex === 0) {
                                // 首行处理：居中对齐
                                text.setAttribute('x', colX + (colWidth / 2));
                                text.setAttribute('text-anchor', 'middle');
                                text.textContent = value;
                                container.appendChild(text);
                                
                                // 计算并存储首行文本的左边界位置，用于其他行对齐
                                // 创建临时canvas测量文本宽度
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCtx.font = `normal ${overallFontSize}px MiSans-Medium, sans-serif`;
                                const textWidth = tempCtx.measureText(value).width;
                                // 计算左边界 = 中心位置 - 文本宽度的一半
                                if (!window.colLeftBoundaries) window.colLeftBoundaries = {};
                                window.colLeftBoundaries[colIndex] = colX + (colWidth / 2) - (textWidth / 2);
                            } else {
                                // 其他行处理：左对齐，并与首行文本左边界对齐
                                const leftBoundary = window.colLeftBoundaries && window.colLeftBoundaries[colIndex];
                                // 如果有保存的左边界，使用它，否则回退到普通居中对齐
                                if (leftBoundary) {
                                    text.setAttribute('x', leftBoundary);
                                    text.setAttribute('text-anchor', 'start');
                                } else {
                                    // 回退到常规居中对齐
                                    text.setAttribute('x', colX + (colWidth / 2));
                                    text.setAttribute('text-anchor', 'middle');
                                }
                                text.textContent = value;
                                container.appendChild(text);
                            }
                            
                            text.setAttribute('y', rowCenterY);
                            text.setAttribute('font-size', overallFontSize);
                            text.setAttribute('font-weight', 'normal');
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif');
                            text.setAttribute('fill', '#333333');
                            text.setAttribute('dominant-baseline', 'middle');
                        }
                    } else if (colIndex === 2 && hasSpecialThirdColAlignment) {
                        // 特殊处理：四列数据且第三列是数字的情况
                        // 根据是否为第一行采用不同的对齐方式
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        
                        // 设置文本的基本样式
                        text.setAttribute('font-size', overallFontSize);
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 根据内容类型选择不同的字体
                        if (isNumber) {
                            text.setAttribute('font-family', 'MiSans-SemiBold, sans-serif'); // 数字使用SemiBold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        text.setAttribute('dominant-baseline', 'middle');
                        
                        // 根据数值正负设置颜色和粗细
                        let textColor = '#333333'; // 默认颜色
                        let fontWeight = 'normal'; // 默认字体粗细
                        
                        // 根据选择的颜色规则进行处理
                        if (isNumber) {
                            if (columnsWithNegativeValues[col]) {
                                // 规则1: 列中同时有正有负时，应用颜色区分
                                if (numericValue > 0) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    fontWeight = 'bold'; // 正值显示为粗体
                                } else if (numericValue < 0) {
                                    textColor = '#008000'; // 负值显示绿色
                                }
                            } else if (colorRule === 2) {
                                // 规则2: 即使列全为正值或负值，也应用颜色区分
                                if (numericValue > 0 || columnsAllPositive[col]) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    fontWeight = 'bold'; // 正值显示为粗体
                                } else if (numericValue < 0 || columnsAllNegative[col]) {
                                    textColor = '#008000'; // 负值显示绿色
                                    fontWeight = 'bold'; // 负值也使用粗体
                                }
                            }
                        }
                        
                        text.setAttribute('font-weight', fontWeight);
                        text.setAttribute('fill', textColor);
                        
                        // 检查文本是否包含特殊字符（如逗号、顿号等）
                        const containsSpecialChar = !isNumber && /[、，,]/.test(String(value));
                        
                        if (rowIndex === 0) {
                            // 首行处理：居中对齐
                            text.setAttribute('x', colX + (colWidth / 2));
                            text.setAttribute('y', rowCenterY);
                            text.setAttribute('text-anchor', 'middle');
                            text.textContent = value;
                            container.appendChild(text);
                            
                            // 计算并存储首行数字的右边界位置，用于其他行对齐
                            // 创建临时canvas测量文本宽度
                            const tempCanvas = document.createElement('canvas');
                            const tempCtx = tempCanvas.getContext('2d');
                            tempCtx.font = `${fontWeight} ${overallFontSize}px MiSans-Medium, sans-serif`;
                            const textWidth = tempCtx.measureText(value).width;
                            // 计算右边界 = 中心位置 + 文本宽度的一半
                            thirdColFirstRowRightBoundary = colX + (colWidth / 2) + (textWidth / 2);
                        } else {
                            if (containsSpecialChar) {
                                // 对于特殊字符，使用完全居中对齐而不是右对齐
                                text.setAttribute('x', colX + (colWidth / 2));
                                text.setAttribute('text-anchor', 'middle');
                            } else {
                                // 其他行处理：右对齐，并与首行数字右边界对齐
                                text.setAttribute('x', thirdColFirstRowRightBoundary);
                                text.setAttribute('text-anchor', 'end');
                            }
                            text.setAttribute('y', rowCenterY);
                            text.textContent = value;
                            container.appendChild(text);
                        }
                    } else if (colIndex === columns.length - 1) {
                        // 最后一列：无论内容是什么，都右对齐
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        // 设置文本距离右边缘10px
                        text.setAttribute('x', svgWidth - padding - 28 - 10);
                        text.setAttribute('y', rowCenterY);
                        text.setAttribute('text-anchor', 'end');
                        text.setAttribute('font-size', lastColumnFontSize); // 使用滑块控制的字体大小
                        text.setAttribute('font-weight', 'normal');
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 根据内容类型选择不同的字体
                        if (isNumber) {
                            text.setAttribute('font-family', 'MiSans-SemiBold, sans-serif'); // 数字使用SemiBold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        
                        // 检查是否包含特殊字符，有的话可能需要调整
                        const containsSpecialChar = /[、，,]/.test(valueStr);
                        
                        // 针对特殊字符的内容进行位置微调，稍微向左移动一些
                        if (containsSpecialChar) {
                            text.setAttribute('x', svgWidth - padding - 28 - 20); // 多留出10px的空间
                        }
                        
                        // 根据是否为数值及正负值，设置颜色和字体粗细
                        let textColor = '#333333'; // 默认颜色
                        // 根据选择的颜色规则进行处理
                        if (isNumber) {
                            if (columnsWithNegativeValues[col]) {
                                // 规则1: 列中同时有正有负时，应用颜色区分
                                if (numericValue > 0) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    text.setAttribute('font-weight', 'bold'); // 正值显示为粗体
                                } else if (numericValue < 0) {
                                    textColor = '#008000'; // 负值显示绿色
                                }
                            } else if (colorRule === 2) {
                                // 规则2: 即使列全为正值或负值，也应用颜色区分
                                if (numericValue > 0 || columnsAllPositive[col]) {
                                    textColor = '#bd2427'; // 正值显示红色
                                    text.setAttribute('font-weight', 'bold'); // 正值显示为粗体
                                } else if (numericValue < 0 || columnsAllNegative[col]) {
                                    textColor = '#008000'; // 负值显示绿色
                                    text.setAttribute('font-weight', 'bold'); // 负值也使用粗体
                                }
                            }
                        }

                        text.setAttribute('fill', textColor);
                        text.setAttribute('dominant-baseline', 'middle');
                        text.textContent = value;
                        container.appendChild(text);
                    } else {
                        // 其他列：根据正负显示颜色，居中对齐
                        let textColor = '#333333'; // 默认颜色
                        let fontWeight = 'normal'; // 默认字体粗细
                        
                        // 检查是否是百分比格式
                        const valueStr = String(value);
                        const isPercentage = valueStr.includes('%');
                        const numericValue = parseFloat(valueStr.replace('%', ''));
                        const isNumber = !isNaN(numericValue);
                        
                        // 先检查该列是否存在负数，只有存在负数的列才根据正负值应用不同颜色
                        if (isNumber && columnsWithNegativeValues[col]) {
                            if (numericValue > 0) {
                                textColor = '#bd2427'; // 正值显示红色
                                fontWeight = 'bold'; // 正值显示为粗体
                            } else if (numericValue < 0) {
                                textColor = '#008000'; // 负值显示绿色
                            }
                        } else if (isNumber && colorRule === 2) {
                            // 规则2: 即使列全为正值或负值，也应用颜色区分
                            if (numericValue > 0 || columnsAllPositive[col]) {
                                textColor = '#bd2427'; // 正值显示红色
                                fontWeight = 'bold'; // 正值显示为粗体
                            } else if (numericValue < 0 || columnsAllNegative[col]) {
                                textColor = '#008000'; // 负值显示绿色
                                fontWeight = 'bold'; // 负值也使用粗体
                            }
                        }
                        
                        // 检查是否包含特殊字符
                        const containsSpecialChar = !isNumber && /[、，,]/.test(valueStr);
                        
                        // 创建文本元素
                        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        text.setAttribute('x', colX + (colWidth / 2));
                        text.setAttribute('y', rowCenterY);
                        text.setAttribute('text-anchor', 'middle');
                        text.setAttribute('font-size', overallFontSize);
                        text.setAttribute('font-weight', fontWeight);
                        // 第三、四列根据内容类型设置不同字体
                        if ((colIndex === 2 || colIndex === 3) && isNumber) {
                            text.setAttribute('font-family', 'MiSans-SemiBold, sans-serif'); // 数字使用SemiBold
                        } else {
                            text.setAttribute('font-family', 'MiSans-Medium, sans-serif'); // 文本使用Medium
                        }
                        text.setAttribute('fill', textColor);
                        text.setAttribute('dominant-baseline', 'middle');
                        
                        // 为包含特殊字符的文本提供更多空间
                        if (containsSpecialChar && colTextLengths[colIndex] < estimateTextWidth(valueStr, overallFontSize, 15) + 30) {
                            // 如果列宽计算不足以容纳该文本，使用缩小字体的方式
                            const adjustedFontSize = Math.max(parseInt(lastColumnFontSize) - 2, 22);
                            text.setAttribute('font-size', colIndex === columns.length - 1 ? adjustedFontSize : (overallFontSize - 2));
                        }
                        
                        text.textContent = value;
                        container.appendChild(text);
                    }
                });
            });
        }
        
        // 计算小票底部位置，用于定位版权文案和Logo
        const ticketBottomY = padding + innerHeight;
        
        // 版权文案 - 移到小票区域外部
        const copyrightY_outside = ticketBottomY + 40; // 小票底部下方40px
        const copyrightLines = copyright.split('\n');
        
        // 计算版权文案的中心点，以便与Logo对齐
        const copyrightHeight = copyrightLines.length * 25; // 总高度（每行25px）
        const copyrightCenterY = copyrightY_outside + (copyrightHeight / 2) - 12; // 中心点位置
        
        // 版权文案
        copyrightLines.forEach((line, index) => {
            const copyrightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            copyrightText.setAttribute('x', padding + 28);
            copyrightText.setAttribute('y', copyrightY_outside + (index * 25)); // 每行间距25px
            copyrightText.setAttribute('font-size', '16');
            copyrightText.setAttribute('font-family', 'MiSans-Medium, sans-serif');
            copyrightText.setAttribute('fill', '#ffffff');
            copyrightText.textContent = line;
            container.appendChild(copyrightText);
        });
        
        // 底部Logo - 移到小票区域外部，与版权文案垂直居中对齐
        const logoHeight = 80;
        const bottomLogo = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        bottomLogo.setAttribute('x', svgWidth - padding - 120);
        bottomLogo.setAttribute('y', copyrightCenterY - (logoHeight / 2)); // 基于版权文案中心点对齐
        bottomLogo.setAttribute('width', 80);
        bottomLogo.setAttribute('height', logoHeight);
        bottomLogo.setAttribute('href', 'https://u.thsi.cn/imgsrc/share/adf57bcec02bb904eaf1c23cfc9fa841.png');
        container.appendChild(bottomLogo);
        
        // 添加水印图片 - 不拉伸，需要时重复或裁剪
        const watermarkUrl = 'https://u.thsi.cn/imgsrc/share/e43810d2b6ab0a3b19a85e29a8643e54.png';
        const watermarkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        watermarkGroup.setAttribute('pointer-events', 'none'); // 确保水印不会阻止鼠标事件
        container.appendChild(watermarkGroup);
        
        // 创建一个临时图片元素来获取水印图片的实际高度
        const tempImg = new Image();
        tempImg.onload = function() {
            const watermarkWidth = svgWidth; // 水印宽度与SVG一致
            const watermarkHeight = tempImg.height * (svgWidth / tempImg.width); // 保持宽高比例计算高度
            
            // 计算需要多少张水印图片来覆盖整个SVG高度
            const numWatermarks = Math.ceil(svgHeight / watermarkHeight);
            
            // 创建水印图片并垂直排列
            for (let i = 0; i < numWatermarks; i++) {
                const watermark = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                watermark.setAttribute('x', 0);
                watermark.setAttribute('y', i * watermarkHeight);
                watermark.setAttribute('width', watermarkWidth);
                watermark.setAttribute('height', watermarkHeight);
                watermark.setAttribute('href', watermarkUrl);
                // 创建剪切路径，确保最后一个水印不会超出SVG高度
                if (i === numWatermarks - 1 && (i + 1) * watermarkHeight > svgHeight) {
                    const clipPathId = `watermark-clip-${i}`;
                    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
                    clipPath.setAttribute('id', clipPathId);
                    
                    const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    clipRect.setAttribute('x', 0);
                    clipRect.setAttribute('y', i * watermarkHeight);
                    clipRect.setAttribute('width', watermarkWidth);
                    clipRect.setAttribute('height', svgHeight - (i * watermarkHeight));
                    
                    clipPath.appendChild(clipRect);
                    container.appendChild(clipPath);
                    
                    watermark.setAttribute('clip-path', `url(#${clipPathId})`);
                }
                watermarkGroup.appendChild(watermark);
            }
        };
        tempImg.onerror = function() {
            // 加载失败时，添加一个简单的水印
            const watermark = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            watermark.setAttribute('x', 0);
            watermark.setAttribute('y', 0);
            watermark.setAttribute('width', svgWidth);
            watermark.setAttribute('height', svgHeight);
            watermark.setAttribute('href', watermarkUrl);
            watermarkGroup.appendChild(watermark);
        };
        tempImg.src = watermarkUrl;
        
        // 添加下载按钮
        addDownloadButton();
    }
    
    // 添加下载SVG的按钮
    function addDownloadButton() {
        // 检查是否已经存在下载按钮
        if (document.getElementById('downloadBtn')) {
            return;
        }
        
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadBtn';
        downloadBtn.textContent = '下载PNG';
        downloadBtn.style.marginTop = '20px';
        downloadBtn.style.marginLeft = '10px';
        
        // 添加无水印PNG下载按钮
        const downloadNoWatermarkBtn = document.createElement('button');
        downloadNoWatermarkBtn.id = 'downloadNoWatermarkBtn';
        downloadNoWatermarkBtn.textContent = '下载无水印PNG';
        downloadNoWatermarkBtn.style.marginTop = '20px';
        downloadNoWatermarkBtn.style.marginLeft = '10px';
        
        downloadBtn.addEventListener('click', async function() {
            await exportPNG(true); // 导出有水印版本
        });
        
        downloadNoWatermarkBtn.addEventListener('click', async function() {
            await exportPNG(false); // 导出无水印版本
        });
        
        // 添加压缩PNG下载按钮
        const downloadCompressedBtn = document.createElement('button');
        downloadCompressedBtn.id = 'downloadCompressedBtn';
        downloadCompressedBtn.textContent = '下载压缩图（<900KB）';
        downloadCompressedBtn.style.marginTop = '20px';
        downloadCompressedBtn.style.marginLeft = '10px';
        
        downloadCompressedBtn.addEventListener('click', async function() {
            await exportCompressedPNG(); // 导出压缩版本
        });
        
        // 添加SVG下载按钮
        const downloadSvgBtn = document.createElement('button');
        downloadSvgBtn.id = 'downloadSvgBtn';
        downloadSvgBtn.textContent = '下载SVG';
        downloadSvgBtn.style.marginTop = '20px';
        downloadSvgBtn.style.marginLeft = '10px';
        
        // 将原来的下载PNG逻辑抽取为独立函数
        async function exportPNG(includeWatermark) {
            // 显示加载提示
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.7)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.textContent = `正在处理${includeWatermark ? '' : '无水印'}图片并准备下载...`;
            document.body.appendChild(loadingDiv);
            
            try {
                // 获取渐变颜色，用于Canvas渲染
                const gradientDeepColor = isValidHexColor(gradientColorDeepHex.value) ? gradientColorDeepHex.value : gradientColorDeep.value;
                const gradientLightColor = isValidHexColor(gradientColorLightHex.value) ? gradientColorLightHex.value : gradientColorLight.value;
                
                // 获取SVG元素和尺寸
                const svgElement = svgContainer;
                const width = parseInt(svgElement.getAttribute('width'));
                const height = parseInt(svgElement.getAttribute('height'));
                
                // 方案：使用Canvas直接渲染SVG和文本
                // 步骤1：创建一个临时的Canvas元素
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                // 步骤2：先绘制SVG背景部分（不含文本）
                // 获取SVG数据不包括文本
                const clonedSvg = svgElement.cloneNode(true);
                
                // 找到所有文本元素并临时隐藏它们
                const allTextElements = clonedSvg.querySelectorAll('text');
                const textData = []; // 存储所有文本信息以便后续渲染
                
                allTextElements.forEach(textElement => {
                    // 处理常规文本元素
                    if (textElement.childElementCount === 0) {
                        // 保存文本信息
                        textData.push({
                            text: textElement.textContent,
                            x: parseFloat(textElement.getAttribute('x') || 0),
                            y: parseFloat(textElement.getAttribute('y') || 0),
                            fill: textElement.getAttribute('fill') || '#000000',
                            fontFamily: textElement.getAttribute('font-family') || 'sans-serif',
                            fontSize: parseFloat(textElement.getAttribute('font-size') || '16'),
                            fontWeight: textElement.getAttribute('font-weight') || 'normal',
                            textAnchor: textElement.getAttribute('text-anchor') || 'start',
                            dominantBaseline: textElement.getAttribute('dominant-baseline') || 'auto',
                            isGradient: textElement.getAttribute('fill') && textElement.getAttribute('fill').startsWith('url(#'),
                            textLength: textElement.getAttribute('textLength') || null,
                            lengthAdjust: textElement.getAttribute('lengthAdjust') || null,
                            // 用于识别公司名称文本
                            isCompanyName: textElement.getAttribute('font-family') && 
                                          textElement.getAttribute('font-family').includes('MiSans-SemiBold') &&
                                          textElement.getAttribute('font-weight') === 'bold'
                        });
                    } else {
                        // 处理带有tspan的文本元素
                        const baseX = parseFloat(textElement.getAttribute('x') || 0);
                        const baseY = parseFloat(textElement.getAttribute('y') || 0);
                        const baseFontFamily = textElement.getAttribute('font-family') || 'sans-serif';
                        const baseFontSize = parseFloat(textElement.getAttribute('font-size') || '16');
                        const baseFontWeight = textElement.getAttribute('font-weight') || 'normal';
                        const baseTextAnchor = textElement.getAttribute('text-anchor') || 'start';
                        const baseDominantBaseline = textElement.getAttribute('dominant-baseline') || 'auto';
                        
                        // 计算tspan的水平位置
                        let currentX = baseX;
                        
                        // 添加所有tspan子元素
                        Array.from(textElement.children).forEach((tspan, index) => {
                            if (tspan.tagName.toLowerCase() === 'tspan') {
                                // 添加tspan的文本信息
                                const tspanText = tspan.textContent;
                                
                                textData.push({
                                    text: tspanText,
                                    x: currentX,
                                    y: baseY,
                                    fill: tspan.getAttribute('fill') || textElement.getAttribute('fill') || '#000000',
                                    fontFamily: baseFontFamily,
                                    fontSize: baseFontSize,
                                    fontWeight: baseFontWeight,
                                    textAnchor: 'start', // 强制为左对齐，因为我们手动计算位置
                                    dominantBaseline: baseDominantBaseline,
                                    isGradient: tspan.getAttribute('fill') && tspan.getAttribute('fill').startsWith('url(#')
                                });
                                
                                // 计算这段文本的宽度，用于更新下一个tspan的起始位置
                                // 为计算宽度创建临时画布
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCtx.font = `${baseFontWeight} ${baseFontSize}px ${baseFontFamily}`;
                                const textWidth = tempCtx.measureText(tspanText).width;
                                
                                // 更新下一个tspan的起始X坐标
                                currentX += textWidth;
                            }
                        });
                    }
                    
                    // 临时移除文本元素
                    textElement.style.display = 'none';
                });

                // 如果不包含水印，移除水印元素
                if (!includeWatermark) {
                    const watermarkGroups = clonedSvg.querySelectorAll('g[pointer-events="none"]');
                    watermarkGroups.forEach(group => {
                        group.parentNode.removeChild(group);
                    });
                    
                    // 移除所有水印相关的图片元素
                    const watermarkImages = clonedSvg.querySelectorAll('image[href*="f40de4b7b181aa5da31b16121b466b18"]');
                    watermarkImages.forEach(img => {
                        img.parentNode.removeChild(img);
                    });
                }
                
                // 获取不含文本的SVG数据
                const svgData = new XMLSerializer().serializeToString(clonedSvg);
                const processedSvgData = await inlineSVGString(svgData);
                
                // 将处理后的SVG转换为图像对象
                const svgImage = new Image();
                await new Promise((resolve, reject) => {
                    svgImage.onload = resolve;
                    svgImage.onerror = reject;
                    svgImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(processedSvgData);
                });
                
                // 步骤3：在Canvas上绘制SVG背景
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(svgImage, 0, 0, width, height);
                
                // 步骤4：使用Canvas API手动绘制所有文本
                // 先预加载字体确保可用
                await document.fonts.ready; // 等待所有字体加载
                
                // 手动绘制所有文本
                textData.forEach(text => {
                    // 设置字体样式
                    const fontStyle = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
                    ctx.font = fontStyle;
                    
                    // 处理填充颜色
                    if (text.isGradient) {
                        // 处理渐变引用
                        if (text.fill.includes('subtitleGradient')) {
                            // 创建副标题的渐变(从上到下)
                            const gradient = ctx.createLinearGradient(0, text.y - text.fontSize, 0, text.y + 10);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else if (text.fill.includes('barGradient')) {
                            // 创建柱状图的渐变(从右到左)
                            const gradient = ctx.createLinearGradient(text.x + 50, 0, text.x - 50, 0);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else {
                            // 默认使用深色
                            ctx.fillStyle = gradientDeepColor;
                        }
                    } else {
                        // 使用常规填充颜色
                        ctx.fillStyle = text.fill;
                    }
                    
                    ctx.textBaseline = text.dominantBaseline === 'middle' ? 'middle' : 'alphabetic';
                    
                    // 计算文本位置（根据textAnchor调整）
                    let x = text.x;
                    if (text.textAnchor === 'middle') {
                        ctx.textAlign = 'center';
                    } else if (text.textAnchor === 'end') {
                        ctx.textAlign = 'right';
                    } else {
                        ctx.textAlign = 'left';
                    }
                    
                    // 绘制文本
                    if (text.isCompanyName && /^[\u4e00-\u9fa5]{3}$/.test(text.text)) {
                        // 处理三字公司名称
                        // 假设四字公司名称宽度约为144px
                        const targetWidth = 144;
                        // 测量当前文本实际宽度
                        const actualWidth = ctx.measureText(text.text).width;
                        // 计算需要的字符间距
                        const charSpacing = (targetWidth - actualWidth) / 2; // 两个字符间隙
                        
                        // 分别绘制每个字符，给予适当间距
                        const chars = text.text.split('');
                        let currentX = text.x;
                        
                        if (text.textAnchor === 'middle') {
                            // 如果是居中对齐，需要调整起始位置
                            currentX = text.x - (targetWidth / 2);
                        } else if (text.textAnchor === 'end') {
                            // 如果是右对齐，需要调整起始位置
                            currentX = text.x - targetWidth;
                        }
                        
                        chars.forEach((char, index) => {
                            const charWidth = ctx.measureText(char).width;
                            if (index > 0) {
                                // 添加额外的间距（仅在字符之间）
                                currentX += charSpacing;
                            }
                            ctx.fillText(char, currentX, text.y);
                            currentX += charWidth;
                        });
                    } else {
                        // 正常绘制文本
                        ctx.fillText(text.text, x, text.y);
                    }
                });
                
                // 步骤5：转换Canvas为PNG并下载
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = includeWatermark ? 'F10掘金信息图.png' : 'F10掘金信息图_无水印.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                document.body.removeChild(loadingDiv);
            } catch (error) {
                console.error('下载过程中出错:', error);
                document.body.removeChild(loadingDiv);
                alert(`生成${includeWatermark ? '' : '无水印'}图像时出错，请重试`);
            }
        }
        
        // 压缩PNG导出函数
        async function exportCompressedPNG() {
            // 显示加载提示
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.7)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.textContent = '正在生成压缩图片并准备下载...';
            document.body.appendChild(loadingDiv);
            
            try {
                // 获取渐变颜色，用于Canvas渲染
                const gradientDeepColor = isValidHexColor(gradientColorDeepHex.value) ? gradientColorDeepHex.value : gradientColorDeep.value;
                const gradientLightColor = isValidHexColor(gradientColorLightHex.value) ? gradientColorLightHex.value : gradientColorLight.value;
                
                // 获取SVG元素和尺寸
                const svgElement = svgContainer;
                const width = parseInt(svgElement.getAttribute('width'));
                const height = parseInt(svgElement.getAttribute('height'));
                
                // 创建Canvas元素
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                // 复制exportPNG中的渲染逻辑（无水印版本）
                const clonedSvg = svgElement.cloneNode(true);
                
                // 找到所有文本元素并临时隐藏它们
                const allTextElements = clonedSvg.querySelectorAll('text');
                const textData = []; // 存储所有文本信息以便后续渲染
                
                allTextElements.forEach(textElement => {
                    // 处理常规文本元素
                    if (textElement.childElementCount === 0) {
                        // 保存文本信息
                        textData.push({
                            text: textElement.textContent,
                            x: parseFloat(textElement.getAttribute('x') || 0),
                            y: parseFloat(textElement.getAttribute('y') || 0),
                            fill: textElement.getAttribute('fill') || '#000000',
                            fontFamily: textElement.getAttribute('font-family') || 'sans-serif',
                            fontSize: parseFloat(textElement.getAttribute('font-size') || '16'),
                            fontWeight: textElement.getAttribute('font-weight') || 'normal',
                            textAnchor: textElement.getAttribute('text-anchor') || 'start',
                            dominantBaseline: textElement.getAttribute('dominant-baseline') || 'auto',
                            isGradient: textElement.getAttribute('fill') && textElement.getAttribute('fill').startsWith('url(#'),
                            textLength: textElement.getAttribute('textLength') || null,
                            lengthAdjust: textElement.getAttribute('lengthAdjust') || null,
                            // 用于识别公司名称文本
                            isCompanyName: textElement.getAttribute('font-family') && 
                                          textElement.getAttribute('font-family').includes('MiSans-SemiBold') &&
                                          textElement.getAttribute('font-weight') === 'bold'
                        });
                    } else {
                        // 处理带有tspan的文本元素
                        const baseX = parseFloat(textElement.getAttribute('x') || 0);
                        const baseY = parseFloat(textElement.getAttribute('y') || 0);
                        const baseFontFamily = textElement.getAttribute('font-family') || 'sans-serif';
                        const baseFontSize = parseFloat(textElement.getAttribute('font-size') || '16');
                        const baseFontWeight = textElement.getAttribute('font-weight') || 'normal';
                        const baseTextAnchor = textElement.getAttribute('text-anchor') || 'start';
                        const baseDominantBaseline = textElement.getAttribute('dominant-baseline') || 'auto';
                        
                        // 计算tspan的水平位置
                        let currentX = baseX;
                        
                        // 添加所有tspan子元素
                        Array.from(textElement.children).forEach((tspan, index) => {
                            if (tspan.tagName.toLowerCase() === 'tspan') {
                                // 添加tspan的文本信息
                                const tspanText = tspan.textContent;
                                
                                textData.push({
                                    text: tspanText,
                                    x: currentX,
                                    y: baseY,
                                    fill: tspan.getAttribute('fill') || textElement.getAttribute('fill') || '#000000',
                                    fontFamily: baseFontFamily,
                                    fontSize: baseFontSize,
                                    fontWeight: baseFontWeight,
                                    textAnchor: 'start', // 强制为左对齐，因为我们手动计算位置
                                    dominantBaseline: baseDominantBaseline,
                                    isGradient: tspan.getAttribute('fill') && tspan.getAttribute('fill').startsWith('url(#')
                                });
                                
                                // 计算这段文本的宽度，用于更新下一个tspan的起始位置
                                // 为计算宽度创建临时画布
                                const tempCanvas = document.createElement('canvas');
                                const tempCtx = tempCanvas.getContext('2d');
                                tempCtx.font = `${baseFontWeight} ${baseFontSize}px ${baseFontFamily}`;
                                const textWidth = tempCtx.measureText(tspanText).width;
                                
                                // 更新下一个tspan的起始X坐标
                                currentX += textWidth;
                            }
                        });
                    }
                    
                    // 临时移除文本元素
                    textElement.style.display = 'none';
                });

                // 移除水印元素（压缩版本默认无水印）
                const watermarkGroups = clonedSvg.querySelectorAll('g[pointer-events="none"]');
                watermarkGroups.forEach(group => {
                    group.parentNode.removeChild(group);
                });
                
                // 移除所有水印相关的图片元素
                const watermarkImages = clonedSvg.querySelectorAll('image[href*="f40de4b7b181aa5da31b16121b466b18"]');
                watermarkImages.forEach(img => {
                    img.parentNode.removeChild(img);
                });
                
                // 获取不含文本的SVG数据
                const svgData = new XMLSerializer().serializeToString(clonedSvg);
                const processedSvgData = await inlineSVGString(svgData);
                
                // 将处理后的SVG转换为图像对象
                const svgImage = new Image();
                await new Promise((resolve, reject) => {
                    svgImage.onload = resolve;
                    svgImage.onerror = reject;
                    svgImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(processedSvgData);
                });
                
                // 在Canvas上绘制SVG背景
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(svgImage, 0, 0, width, height);
                
                // 等待字体加载并绘制文本
                await document.fonts.ready;
                
                // 手动绘制所有文本
                textData.forEach(text => {
                    // 设置字体样式
                    const fontStyle = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
                    ctx.font = fontStyle;
                    
                    // 处理填充颜色
                    if (text.isGradient) {
                        // 处理渐变引用
                        if (text.fill.includes('subtitleGradient')) {
                            // 创建副标题的渐变(从上到下)
                            const gradient = ctx.createLinearGradient(0, text.y - text.fontSize, 0, text.y + 10);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else if (text.fill.includes('barGradient')) {
                            // 创建柱状图的渐变(从右到左)
                            const gradient = ctx.createLinearGradient(text.x + 50, 0, text.x - 50, 0);
                            gradient.addColorStop(0, gradientDeepColor);
                            gradient.addColorStop(1, gradientLightColor);
                            ctx.fillStyle = gradient;
                        } else {
                            // 默认使用深色
                            ctx.fillStyle = gradientDeepColor;
                        }
                    } else {
                        // 使用常规填充颜色
                        ctx.fillStyle = text.fill;
                    }
                    
                    ctx.textBaseline = text.dominantBaseline === 'middle' ? 'middle' : 'alphabetic';
                    
                    // 计算文本位置（根据textAnchor调整）
                    let x = text.x;
                    if (text.textAnchor === 'middle') {
                        ctx.textAlign = 'center';
                    } else if (text.textAnchor === 'end') {
                        ctx.textAlign = 'right';
                    } else {
                        ctx.textAlign = 'left';
                    }
                    
                    // 绘制文本
                    if (text.isCompanyName && /^[\u4e00-\u9fa5]{3}$/.test(text.text)) {
                        // 处理三字公司名称
                        // 假设四字公司名称宽度约为144px
                        const targetWidth = 144;
                        // 测量当前文本实际宽度
                        const actualWidth = ctx.measureText(text.text).width;
                        // 计算需要的字符间距
                        const charSpacing = (targetWidth - actualWidth) / 2; // 两个字符间隙
                        
                        // 分别绘制每个字符，给予适当间距
                        const chars = text.text.split('');
                        let currentX = text.x;
                        
                        if (text.textAnchor === 'middle') {
                            // 如果是居中对齐，需要调整起始位置
                            currentX = text.x - (targetWidth / 2);
                        } else if (text.textAnchor === 'end') {
                            // 如果是右对齐，需要调整起始位置
                            currentX = text.x - targetWidth;
                        }
                        
                        chars.forEach((char, index) => {
                            const charWidth = ctx.measureText(char).width;
                            if (index > 0) {
                                // 添加额外的间距（仅在字符之间）
                                currentX += charSpacing;
                            }
                            ctx.fillText(char, currentX, text.y);
                            currentX += charWidth;
                        });
                    } else {
                        // 正常绘制文本
                        ctx.fillText(text.text, x, text.y);
                    }
                });
                
                // 压缩图片直到小于900KB
                let quality = 0.9; // 初始质量
                let compressedDataUrl;
                let fileSizeKB;
                const targetSizeKB = 900;
                
                loadingDiv.textContent = '正在压缩图片...';
                
                do {
                    compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    // 计算文件大小（base64编码后的大小约为原始大小的4/3）
                    const base64Length = compressedDataUrl.split(',')[1].length;
                    fileSizeKB = Math.round((base64Length * 3) / 4 / 1024);
                    
                    if (fileSizeKB > targetSizeKB) {
                        quality -= 0.05; // 降低质量
                        if (quality < 0.1) {
                            // 如果质量太低，尝试缩小尺寸
                            const scale = Math.sqrt(targetSizeKB / fileSizeKB);
                            const newWidth = Math.floor(width * scale);
                            const newHeight = Math.floor(height * scale);
                            
                            // 创建新的缩小的Canvas
                            const smallCanvas = document.createElement('canvas');
                            smallCanvas.width = newWidth;
                            smallCanvas.height = newHeight;
                            const smallCtx = smallCanvas.getContext('2d');
                            
                            // 绘制缩小的图像
                            smallCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
                            compressedDataUrl = smallCanvas.toDataURL('image/jpeg', 0.8);
                            
                            // 重新计算文件大小
                            const newBase64Length = compressedDataUrl.split(',')[1].length;
                            fileSizeKB = Math.round((newBase64Length * 3) / 4 / 1024);
                            break;
                        }
                    }
                } while (fileSizeKB > targetSizeKB && quality > 0.1);
                
                loadingDiv.textContent = `压缩完成，文件大小: ${fileSizeKB}KB`;
                
                // 下载压缩后的图片
                const a = document.createElement('a');
                a.href = compressedDataUrl;
                a.download = `F10掘金信息图_压缩版_${fileSizeKB}KB.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // 延迟移除加载提示，让用户看到文件大小信息
                setTimeout(() => {
                    document.body.removeChild(loadingDiv);
                }, 2000);
                
            } catch (error) {
                console.error('压缩下载过程中出错:', error);
                document.body.removeChild(loadingDiv);
                alert('生成压缩图像时出错，请重试');
            }
        }
        
        downloadSvgBtn.addEventListener('click', async function() {
            // 显示加载提示
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.7)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '9999';
            loadingDiv.textContent = '正在处理图片并准备下载...';
            document.body.appendChild(loadingDiv);
            
            try {
                // 添加字体转换为Base64编码的函数
                async function fontToBase64(fontUrl) {
                    try {
                        const response = await fetch(fontUrl);
                        if (!response.ok) {
                            throw new Error(`无法加载字体: ${fontUrl}`);
                        }
                        const arrayBuffer = await response.arrayBuffer();
                        const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                        return `data:font/ttf;base64,${base64}`;
                    } catch (error) {
                        console.error('转换字体为Base64时出错:', error);
                        return null;
                    }
                }
                
                // 获取原始SVG
                const svgElement = svgContainer;
                
                // 创建SVG克隆以避免修改原始SVG
                const clonedSvg = svgElement.cloneNode(true);
                
                // 获取或创建defs元素
                const defs = clonedSvg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                if (!clonedSvg.querySelector('defs')) {
                    clonedSvg.appendChild(defs);
                }
                
                // 添加字体样式标签
                const styleTag = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                
                // 尝试将字体转换为Base64数据URI
                let style = '';
                try {
                    // 这里可以根据需要添加内联字体
                    const boldFontUrl = 'MiSans/MiSans-Bold.ttf';
                    const demiBoldFontUrl = 'MiSans/MiSans-Demibold.ttf';
                    const semiBoldFontUrl = 'MiSans/MiSans-Semibold.ttf';
                    const mediumFontUrl = 'MiSans/MiSans-Medium.ttf';
                    
                    // 转换字体为Base64（如果可能）
                    const boldBase64 = await fontToBase64(boldFontUrl);
                    const demiBoldBase64 = await fontToBase64(demiBoldFontUrl);
                    const semiBoldBase64 = await fontToBase64(semiBoldFontUrl);
                    const mediumBase64 = await fontToBase64(mediumFontUrl);
                    
                    // 创建包含内联字体的样式
                    style = `
                        @font-face {
                            font-family: 'MiSans-Bold';
                            src: ${boldBase64 ? `url('${boldBase64}')` : `url('${boldFontUrl}')`} format('truetype');
                            font-weight: 700;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-DemiBold';
                            src: ${demiBoldBase64 ? `url('${demiBoldBase64}')` : `url('${demiBoldFontUrl}')`} format('truetype');
                            font-weight: 600;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-SemiBold';
                            src: ${semiBoldBase64 ? `url('${semiBoldBase64}')` : `url('${semiBoldFontUrl}')`} format('truetype');
                            font-weight: 600;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Medium';
                            src: ${mediumBase64 ? `url('${mediumBase64}')` : `url('${mediumFontUrl}')`} format('truetype');
                            font-weight: 500;
                            font-style: normal;
                        }
                    `;
                } catch (error) {
                    console.error('内联字体时出错:', error);
                    // 使用普通的字体引用作为备选
                    style = `
                        @font-face {
                            font-family: 'MiSans-Bold';
                            src: url('MiSans/MiSans-Bold.ttf') format('truetype');
                            font-weight: 700;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-DemiBold';
                            src: url('MiSans/MiSans-Demibold.ttf') format('truetype');
                            font-weight: 600;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-SemiBold';
                            src: url('MiSans/MiSans-Semibold.ttf') format('truetype');
                            font-weight: 600;
                            font-style: normal;
                        }
                        
                        @font-face {
                            font-family: 'MiSans-Medium';
                            src: url('MiSans/MiSans-Medium.ttf') format('truetype');
                            font-weight: 500;
                            font-style: normal;
                        }
                    `;
                }
                
                styleTag.textContent = style;
                defs.appendChild(styleTag);
                
                // 获取SVG数据
                const svgData = new XMLSerializer().serializeToString(clonedSvg);
                
                // 内联SVG中的所有图片
                const processedSvgData = await inlineSVGString(svgData);
                
                // 创建下载链接
                const svgBlob = new Blob([processedSvgData], {type: 'image/svg+xml;charset=utf-8'});
                const url = URL.createObjectURL(svgBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'F10掘金信息图.svg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // 移除加载提示
                document.body.removeChild(loadingDiv);
            } catch (error) {
                console.error('下载SVG时出错:', error);
                document.body.removeChild(loadingDiv);
                alert('生成SVG时出错，请重试');
            }
        });
        
        const previewSection = document.querySelector('.preview-section');
        previewSection.appendChild(downloadBtn);
        previewSection.appendChild(downloadNoWatermarkBtn);
        previewSection.appendChild(downloadCompressedBtn);
        previewSection.appendChild(downloadSvgBtn);
    }
    
    // 文件上传状态提示
    function showFileStatus(inputId, message, isError = false) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        // 移除之前的状态提示
        const existingStatus = input.parentNode.querySelector('.file-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // 创建新的状态提示
        const statusDiv = document.createElement('div');
        statusDiv.className = 'file-status';
        statusDiv.style.cssText = `
            font-size: 12px;
            margin-top: 5px;
            padding: 5px 8px;
            border-radius: 3px;
            ${isError ? 
                'color: #d32f2f; background: #ffebee; border: 1px solid #ffcdd2;' : 
                'color: #2e7d32; background: #e8f5e8; border: 1px solid #c8e6c9;'
            }
        `;
        statusDiv.textContent = message;
        input.parentNode.appendChild(statusDiv);
        
        // 3秒后自动移除成功提示
        if (!isError) {
            setTimeout(() => {
                if (statusDiv.parentNode) {
                    statusDiv.remove();
                }
            }, 3000);
        }
    }
    
    // 文件选择验证
    function validateFileSelection(inputId, file, validTypes, maxSize, typeName) {
        try {
            if (!file) {
                showFileStatus(inputId, `请选择${typeName}文件`, true);
                return false;
            }
            
            // 检查文件类型
            const hasValidType = validTypes.some(type => {
                if (type.startsWith('.')) {
                    return file.name.toLowerCase().endsWith(type);
                } else {
                    return file.type === type;
                }
            });
            
            if (!hasValidType) {
                const typeList = validTypes.map(t => t.startsWith('.') ? t : t.split('/')[1]).join('、');
                showFileStatus(inputId, `请选择有效的${typeName}文件（${typeList}格式）`, true);
                return false;
            }
            
            // 检查文件大小
            if (file.size > maxSize) {
                const maxSizeMB = Math.round(maxSize / (1024 * 1024));
                showFileStatus(inputId, `文件大小超过限制（最大${maxSizeMB}MB）`, true);
                return false;
            }
            
            // 显示成功信息
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
            showFileStatus(inputId, `✓ ${file.name} (${fileSizeMB}MB)`);
            return true;
            
        } catch (error) {
            showFileStatus(inputId, `文件验证失败: ${error.message}`, true);
            return false;
        }
    }
    
    // 添加文件选择监听器
    const mainImageInput = document.getElementById('mainImage');
    const excelFileInput = document.getElementById('excelFile');
    
    if (mainImageInput) {
        mainImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const maxImageSize = 10 * 1024 * 1024; // 10MB
            validateFileSelection('mainImage', file, validImageTypes, maxImageSize, '图片');
        });
    }
    
    if (excelFileInput) {
        excelFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const validExcelTypes = ['.xlsx', '.xls'];
            const maxExcelSize = 50 * 1024 * 1024; // 50MB
            validateFileSelection('excelFile', file, validExcelTypes, maxExcelSize, 'Excel');
        });
    }
});