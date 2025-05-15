import { appState, eleDispatch, eleState, uiState } from "@/memory/global"
import { future, promise, timeout } from "../util/future"
import { is_nice_one } from "../util/valued"

const UI_PAN_Z_INDEX = 300
const UI_PAN_HUI_OPACITY = 0.4

const hui_already = (): boolean => (eleState.hui > 0)

const ioc = (idx: number): Promise<ElePan | undefined> => promise((): ElePan | undefined => {
    const pans: ElePan[] = eleState.pans ? eleState.pans : [ ]
    const src: ElePan[] = pans.filter((e: ElePan) => (e.idx == idx));
    return (src.length == 0) ? undefined : src[0]
})

// z - index 与 idx 有关，与 进入顺序有关
const grow_z_index = (idx: number) => {
    const sq = Math.sqrt(idx)
    const src = eleState.pans ? eleState.pans.length : 0
    return Math.floor( UI_PAN_Z_INDEX + (src * 2) + (sq * 2) )
}

const hui_is_hui = (hui: ElePanHui | undefined) => is_nice_one(hui)

const def = (idx: number, orientation: ORIENTATION, hui: ElePanHui | undefined, clazz: string): ElePan => ({
    iive: true,
    show: false,

    z_index: grow_z_index(idx),
    idx,

    clazz,
    orientation,

    hui: hui_is_hui(hui) ? ( hui_already() ? 0 : 1 ) : 0, 
    hui_opacity: hui ? hui.opacity : UI_PAN_HUI_OPACITY, 

    path: '', 

    component: null // 组件内容
})

const open_pan = (pan: ElePan | undefined): ElePan | undefined => {
    if (pan) { 
        pan.iive = true; pan.show = true; 
        console.log('OPEN PAN =', pan); console.log('ORIGIN PANS =', eleState.pans) 
    } return pan
}

const is_hui = (pan: ElePan | undefined): boolean => (pan ? (pan.hui > 0) : false)

const UI_PAN_DIE_ANI_TIME = 362

// 自带杀掉 PAN
const close_pan = (idx: number) => future( async () => {
    const pan: ElePan | undefined = await ioc(idx)
    pan ? close(pan) : undefined
})

const close = (pan: ElePan) => {
    pan.show = false; 
    timeout(async () => {
        pan.iive = false; 
        console.log('DIE PAN =', pan)
        // 这里由于并发问题，可能出现 过度监听 state.pans 的问题
        await eleDispatch('kiii_pan', pan)
    }, UI_PAN_DIE_ANI_TIME)
}

// 便捷开启 PAN
const insert_and_open_def = (ore: ORIENTATION, idx: number = 0, hui: ElePanHui | undefined) => future(async () => {
    const you: ElePan | undefined = await ioc(idx)
    if (you) {
        // await close_pan(idx)
    } 
    else {
        await eleDispatch('open_pan', (open_pan( def(idx, ore, hui, '') )))
    }
})
const open_def_t = (idx: number = 0, hui?: ElePanHui) => insert_and_open_def('t', idx, hui)
const open_def_r = (idx: number = 0, hui?: ElePanHui) => insert_and_open_def('r', idx, hui)
const open_def_i = (idx: number = 0, hui?: ElePanHui) => insert_and_open_def('i', idx, hui)
const open_def_b = (idx: number = 0, hui?: ElePanHui) => insert_and_open_def('b', idx, hui)

// 启用 INDEX MENU
const INDEX_PAN_IDX = 1000
const open_index_menu = () => {
    insert_and_open_def('i', INDEX_PAN_IDX, { opacity: 0.0 })
}
const close_index_menu = () => close_pan(INDEX_PAN_IDX)

// 所有有关 PAN 的操作都在这
export default {
    ioc,
    def,
    is_hui,

    open_def_r,
    open_def_t,
    open_def_i,
    open_def_b,

    open_pan,
    close_pan,

    open_index_menu,
    close_index_menu
}