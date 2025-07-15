import { must_arr, must_int, random, ser_fiot } from "@/tool/util/valued"
import product_tool from "../product_tool"

// 浏览时，增加浏览量
const form_add_view_num = (v: Product): Product | ONE => {
    const num_view_true: number = must_int(v.numViewTrue)

    const r: number = must_int(v.recommendLevel)

    const num_view: number = must_int(v.numView)
    const num_hot: number = must_int(v.numHot)
    let bs: number = random(3) + r;
    const media: Media[] = product_tool.getindex_banner(v, 100)
    bs += random(media.length);
    return {
        numView: num_view + bs,
        numViewTrue: num_view_true + 1,
        numHot: num_hot + bs + (media.length) + random(2 * r)
    }
}

// 购买时，增加浏览量
const form_add_sell_num = (v: Product): Product | ONE => {
    const num_sell_true: number = must_int(v.numSellTrue)

    const num_view: number = must_int(v.numView)
    const r: number = must_int(v.recommendLevel)
    const num_hot: number = must_int(v.numHot)
    let bs: number = random(3) + 1;
    const media: Media[] = product_tool.getindex_banner(v, 100)
    bs += random(media.length)
    return {
        numView: num_view + bs,
        numSell: must_int(v.numSell),
        numSellTrue: num_sell_true + 1,
        numHot: num_hot + bs + (media.length)
    }
}

// 新增时，给点浏览量
const gen_init_num_view = () => {
    let bs: number = random(10) + 1
    const two: number = random(3);
    if (two > 2) {
        bs += random(4)
    }
    return bs
}

// 增加用户访问量
const form_add_she_visited_num = (v: UserStatistic): UserStatistic | ONE => {
    const n: number = must_int(v.numVisited)
    const p: number = must_int(v.numPublish)
    //
    let bs: number = random(3) + 1;
    bs += random(p)
    return {
        numVisited: n + bs
    }
}

// 判断是展示哪种卡片
const __VIEW_MODE_PRICE_SUB = "price_sub"
const __VIEW_MODE_PRICE_FIRST = "price_first"

const which_sub_price = (v: Product): string => {
    // const num_view = v.numView
    // const num_sell = v.numSell
    //
    const p = ser_fiot(v.price, 0)
    const pl = ser_fiot(v.priceFirst, 0)
    //
    if ((pl - p) < 3) {
        return __VIEW_MODE_PRICE_SUB
    }
    return __VIEW_MODE_PRICE_FIRST
}

const __VIEW_MODE_TIP_TYPED = "tip_typed"
const __VIEW_MODE_TIP_SELL = "tip_sell"
const __VIEW_MODE_TIP_HIGHT = "tip_hight"

const which_sub_tip = (v: Product): string => {
    const p = ser_fiot(v.price, 0)
    if (p > 699) {
        return __VIEW_MODE_TIP_HIGHT
    }
    //
    const num_sell = v.numSell
    if (num_sell > 1) {
        return __VIEW_MODE_TIP_SELL
    }
    return __VIEW_MODE_TIP_TYPED
}

const view_num_sell = (n: number): string => {
    n = must_int(n) + 1
    if (n < 29) {

        if (n < 3) {
            return '9+'
        }
        else if (n < 10) {
            return '30+'
        }
        else if (n < 20) {
            return '70+'
        }
        else if (n < 30) {
            return '99+'
        }
    }
    else if (n < 108) {

        if (n < 49) {
            return '199+'
        }
        else if (n < 69) {
            return '299+'
        }
        else if (n < 89) {
            return '399+'
        }
        else if (n < 109) {
            return '499+'
        }
    }
    else if (n < 500) {

        if (n < 209) {
            return '599+'
        }
        else if (n < 309) {
            return '699+'
        }
        else if (n < 409) {
            return '799+'
        }
        else if (n < 509) {
            return '999+'
        }
    }
    else if (n < 999) {

        if (n < 209) {
            return '599+'
        }
        else if (n < 309) {
            return '799+'
        }
        else if (n < 409) {
            return '999+'
        }
        else if (n < 509) {
            return '1999+'
        }
        else if (n < 809) {
            return '2999+'
        }
        else if (n < 1000) {
            return '3999+'
        }
    }
    else {
        if (n < 3999) {
            return '1w+'
        }
        else if (n < 8999) {
            return '2w+'
        }
        else if (n < 13999) {
            return '3w+'
        }
        else if (n < 39999) {
            return '10w+'
        }
        else if (n < 79999) {
            return '20w+'
        }
        return '30w+'
    }
    
    return '' + num_sell
}

export default {
    __VIEW_MODE_PRICE_SUB,
    __VIEW_MODE_PRICE_FIRST,

    __VIEW_MODE_TIP_SELL,
    __VIEW_MODE_TIP_TYPED,
    __VIEW_MODE_TIP_HIGHT,

    view_num_sell,
    which_sub_tip,
    which_sub_price,

    form_add_view_num,
    form_add_sell_num,
    gen_init_num_view,
    form_add_she_visited_num
}