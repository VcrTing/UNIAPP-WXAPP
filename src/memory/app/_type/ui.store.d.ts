
// STORE APP
interface UiStore {
    // 当前 平台
    platform: UI_PLATFORM

    // 字体 大小，影响 继承 字体的 大小，以及 em 单位
    root_font_size: number

    // 根节点 字体大小 系数，影响 rem 单位，影响 distance 边距 的浮动
    root_font_size_coefficient: number
}

type UI_STORE_FIELD = 
    'root_font_size' | 'root_font_size_coefficient'

// 大致平台分类
type UI_PLATFORM = 'phone' | 'pad' | 'pc'