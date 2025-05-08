
export const uni_get_input_v = (e: ONE = {}): SN => {
    const v = e.detail ? e.detail.value : null
    return (v == null || v == undefined) ? '' : v
}

export const uni_get_select_v = (e: ONE = {}): number => {
    const v = e.detail ? e.detail.value : null
    return (v == null || v == undefined) ? 0 : v
}

export const uni_get_switch_v = (e: ONE = {}): boolean => {
    const v = e.detail ? e.detail.value : null
    return v ? v : false
}