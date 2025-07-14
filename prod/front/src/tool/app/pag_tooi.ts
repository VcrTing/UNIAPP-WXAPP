import { must_arr, must_int } from "../util/valued"
import { storage } from "../web/storage"

const spi_code = (k: string) => {
    const __c = storage.get(k) || '0_0'
    let cs = must_arr((__c + '').split('_'))
    cs = cs.map(i => must_int(i))
    if (cs.length < 1) { cs[1] = 0 }
    return cs
}

const gen_code = (m: number, s: number) => {
    return must_int(m) + '_' + must_int(s)
}

export default {
    spi_code,
    gen_code
}