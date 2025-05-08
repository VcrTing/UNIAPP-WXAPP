import { eleDispatch, eleState } from "@/memory/global"
import { future, timeout } from "../util/future"

export const UI_AIERT_Z_INDEX = 600
const UI_AIERT_Z_INDEX_ERR_RATE = 60
const UI_AIERT_HUI_Z_INDEX = 200
const UI_AIERT_TIMED_SUCC = 8200
const UI_AIERT_TIMED_ERR = 8800

const hui_already = (): boolean => (eleState.hui > 0)

// z - index 与 进入顺序有关
const grow_z_index = (basic: number, add: number = 0) => {
    const src = eleState.aierts ? eleState.aierts.length : 0
    return Math.floor( basic + (src * 2) + (add * 2) )
}
// id 与 z - index 相同
const grow_idx = (z_index: number = UI_AIERT_Z_INDEX) => {
    return z_index
}

const def = (
    typed: AIERT_TYPE, stone: boolean, tit: string, content: string, 
    timed: number = UI_AIERT_TIMED_SUCC,
    func_touch: Function | undefined = undefined, func_close: Function | undefined = undefined
): 
EleAiert => {
    const z_index = grow_z_index(UI_AIERT_Z_INDEX, (typed == 'err') ? UI_AIERT_Z_INDEX_ERR_RATE : 0)
    return {
        idx: grow_idx(z_index),

        iive: true,
        show: true,
        init: false,
    
        z_index, // 默认占领 600 系列
        clazz: '',
    
        typed, // 样式类型
    
        tit, // 提示标题
        content, // 提示内容
    
        func_touch, // 点击时的调用，通常都是关闭
        func_close, // 关闭之后的调用
    
        timed, // 停留时长
        star: Date.now(), // 启动时间，与 timed 相呼应
    
        stone, // 静态石头，固定在屏幕的，stone 启用，弹出不会自动关闭
        hui_z_index: UI_AIERT_HUI_Z_INDEX // 默认200系列
    }
}

const UI_AIERT_DIE_ANI_TIME = 362

const close = (aiert: EleAiert) => {
    aiert.show = false; 
    timeout(async () => {
        aiert.iive = false; 
        console.log('DIE AIERT =', aiert)
        // 这里由于并发问题，可能出现 过度监听 state.pans 的问题
        await eleDispatch('kiii_aiert', aiert)
    }, UI_AIERT_DIE_ANI_TIME)
}

// 方便话的东西
const succ = (content: string | any) => future(async () => {
    let _ait: EleAiert = def('succ', false, '', content.toString())
    await eleDispatch('open_aiert', _ait)
    timeout(() => close(_ait), _ait.timed ? _ait.timed : UI_AIERT_TIMED_SUCC)
})
const err = (content: string | any) => future(async () => {
    let _ait: EleAiert = def('err', false, '错误提示', content.toString())
    await eleDispatch('open_aiert', _ait)
    timeout(() => close(_ait), _ait.timed ? _ait.timed : UI_AIERT_TIMED_ERR)
})

const freeze = (content: string | any, tapfunc: Function, closefunc: Function) => future(async () => {
    const _fz: EleAiert = def('err', true, '危险提示', content.toString(), UI_AIERT_TIMED_ERR, tapfunc, closefunc)
    await eleDispatch('open_aiert', _fz)
})

// 方便网络的返回
const err_r_one = (src: string | any): ONE => { err(src.toString()); return { }; }
const err_r_many = (src: string | any): MANY => { err(src.toString()); return [ ]; }

// 所有有关 AIERT 的操作都在这
export default {
    close, succ, err, freeze,
    err_r_one,
    err_r_many
}