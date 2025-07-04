
export const FB_ITEM_TYPES: ONE = {
    iayout: [ "grid", "col" ],
    input: [ "input", "textarea", "select", "number", "date", "switch", "checkbox", "imgupload", "fileupload" ],
    
    comp: [ "dialog", "report", "alert" ],
    other: [ "divider", "blank", "button", "text" ],
    empty: [ "", "null" ]
}

// 获取
const get_v = (one: ONE, key: string = '') => (one ? one[key] : null)
const get_vs = (one: ONE, key: string = '') => (one ? one[key] ? one[key] : [] : [])

// 获取 类型
export const fb_get_item_type = (one: ONE): string => get_v(one, 'type')

// 获取 columns
export const fb_get_columns = (one: ONE): ANYS => get_vs(one, 'columns')

// 获取 list
export const fb_get_list = (one: ONE): ANYS => get_vs(one, 'list')

// 获取名字
export const fb_get_name = (one: ONE): string => get_v(one, 'name')

// options to array
export const fb_get_options = (one: ONE = {}): SNNS => {
    const opt: ONE = one['options'] ? one['options'] : { }
    const src: Set<SNN> = new Set()
    get_vs(opt, 'options').map((e: ONE) => src.add(e['value']))
    return Array.from(src);
}

// 获取 option
export const fb_get_option = (one: ONE = {}): ONE => (one['options'] ? one['options'] : { })

/**
 * REPORT ================================================= 
 */
export const fb_get_rows = (one: ONE = {}): MANY => (get_vs(one, 'rows'))