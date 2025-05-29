
type ORIENTATION = 't' | 'r' | 'b' | 'l' | 'i' | 'c'

// 有参数则启动，无参数则不启动
interface ElePanHui {
    opacity: number,
}

interface ElePan {
    iive: boolean, // 死亡
    show: boolean, // 展示

    z_index: number,
    idx: number,
    clazz: string,

    orientation: ORIENTATION, // 要什么方位，默认 右边

    hui: number, // 灰，>= 0 表示启动
    hui_opacity: number, // 灰 层 透明度，默认 0.4，超过 0.6 只能 0.6

    path: string, // 组件路径，用于 import 动态加载 组件

    component: ONE | null // 组件内容
}

type AIERT_TYPE = 'err' | 'war' | 'succ'

interface EleAiert {
    idx: number,
    iive: boolean, // 死亡
    show: boolean, // 展示
    init: boolean, // 是否加载了加载动画

    z_index: number, // 默认占领 600 系列
    clazz: string,

    typed: AIERT_TYPE, // 样式类型

    tit: string, // 提示标题
    content: string, // 提示内容

    func_touch: Function | undefined, // 点击时的调用
    func_close: Function | undefined, // 关闭之后的调用

    timed: number, // 停留时长
    star: number, // 开始时间

    stone: boolean, // 静态石头，固定在屏幕的
    hui_z_index: number // 默认200系列
}

interface EleStore {
    
    // 遮罩层 > 0 代表启动，< 1 代表关闭
    hui: number
    // 遮罩层的 z-index，默认值 = 300
    hui_z_index: number

    // 模态框 > 0 代表启动，且 启动哪个，使用序号标明启动哪个
    mods: [ ]
    
    // 多方位 弹出页，数组里面的弹框，全部展示
    pans: ElePan[ ]

    // 顶部 错误弹出
    aierts: EleAiert[ ]

    gallery: EleGallery[]
}

interface EleGallery {
    id: string,
    src: string,
    __show: boolean
}

type ELE_STORE_FIELD = 
    'hui' | 'hui_z_index' | 'mods' | 'pans' | 'aierts'