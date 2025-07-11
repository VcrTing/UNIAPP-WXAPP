import { must_arr, must_int, random } from "@/tool/util/valued"
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

    let bs: number = random(3) + 1;
    bs += random(p)
    return {
        numVisited: n + bs
    }
}

export default {
    form_add_view_num,
    form_add_sell_num,
    gen_init_num_view,
    form_add_she_visited_num
}