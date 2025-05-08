
export const PAGER_DEF_SIZE = 50

const ser_pager_no = (no: number): number => ((no && no > 0) ? no : 1)
const ser_star = (no: number): number => ((no && no > 0) ? no : 0)
const ser_end = (no: number, def: number = PAGER_DEF_SIZE): number => ((no && no > 0) ? no : def)

const ser_pager_size = (sz: number, def: number = 50): number => ((sz && sz > 0) ? sz : def)
const get_star_by_end = (end: number = PAGER_DEF_SIZE, size: number = PAGER_DEF_SIZE) => (end - size)
const get_end_by_star = (star: number = 0, size: number = PAGER_DEF_SIZE) => ((star + size) - 1)
const get_star_max_limit = (total: number, size: number = PAGER_DEF_SIZE) => (total - size) < 0 ? size : (total - size)


export default {

    ser_pager_no,
    ser_pager_size,

    ser_star,
    ser_end,
    
    get_star_by_end,
    get_end_by_star,
    get_star_max_limit
}