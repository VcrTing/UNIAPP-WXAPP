
const DEF_CAPACITY = 14

const scale_px = (capacity: number, px: number = 0) => {
    const _cc: number = capacity ? capacity : DEF_CAPACITY
    const res: number = px * _cc / DEF_CAPACITY 
    return Math.floor( res ? res : px )
}

export default {
    scale_px
}