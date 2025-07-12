import { must_arr } from "../util/valued"
import { storage } from "../web/storage"

const spi_code = (k: string) => {
    const __c = storage.get(k) || '0_0'
    const cs = must_arr((__c + '').split('_'))
    if (cs.length < 1) { cs[1] = 0 }
    return cs
}

export default {
    spi_code
}