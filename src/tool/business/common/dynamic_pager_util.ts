import pager_tooi, { PAGER_DEF_SIZE } from "./pager_tooi"

// 100% 确保 star max limit 在正常区间内
const async_star_max_limit = (dynamic: DynamicPager, total: number) => {
    let star_max_limit: number = dynamic.star_max_limit
    if (!dynamic.total) {
        dynamic.total = total
    }
    star_max_limit = pager_tooi.get_star_max_limit(total, dynamic.size)
    dynamic.star_max_limit = star_max_limit
}

// 100% 确保 star max 都是正常区间内
const async_star_max = (dynamic: DynamicPager, total: number) => {
    let star: number = dynamic.star
    async_star_max_limit(dynamic, total)
    const _imt: number = dynamic.star_max_limit
    // 区间限定
    if (star > _imt) { star = _imt }
    if (star < 0) { star = 0 }
    // star 与 star max 比较
    let res: number = star > dynamic.star_max ? star : dynamic.star_max
    // 自增
    res = res + dynamic.size
    // star max 与 limit 比较 + 赋值
    dynamic.star_max = res > _imt ? _imt : res 
}

// 构建 数据
const async_house = (dynamic: DynamicPager, house: DATA_HOUSE, data: MANY) => {
    const star: number = dynamic.star ? dynamic.star : 0
    for (let i= 0; i< data.length; i++ ) {
        const idx: number = star + i
        house[idx] = data[i]
    }
}

const _move_star = (dynamic: DynamicPager, num: number = 0) => {
    let star: number = (dynamic.star ? dynamic.star : 0) + num
    //
    const total: number = dynamic.total ? dynamic.total : PAGER_DEF_SIZE
    const star_max_limit: number = pager_tooi.get_star_max_limit(total, dynamic.size)
    // 区间限制
    star = star > star_max_limit ? star_max_limit : star
    star = star < 0 ? 0 : star
    // 结束
    return star
}
// 移动 star 同步 end
const move_star_n_end = (dynamic: DynamicPager, num: number = 0) => {
    // 结束
    dynamic.star = _move_star(dynamic, num)
}



// 定位 star，请确保 init 了
const ioc_star = (dynamic: DynamicPager, star: number = 0) => {
    let star_max_limit: number = dynamic.star_max_limit
    star = star > star_max_limit ? star_max_limit : star
    star = star < 0 ? 0 : star
    // 结束
    dynamic.star = star
}

/*
============================================================================================
*/
// 生成 faker
const async_faker = (dynamic: DynamicPager, faker: DATA_FAKER = []) => {
    const max: number = dynamic.star_max
    const len: number = faker.length
    let cha: number = max - (len - dynamic.size)
    // console.log(max, len, cha, cha)
    if (cha > 0) {
        cha = cha - dynamic.size
        for (let i= 0; i< cha; i++ ) { faker.push( true ) }
        console.log('faker 增长 =', faker.length, dynamic.star_max)
    }
    else if (cha == 0) {
        console.log('faker 与 star_max 相同')
    }
    else {
        faker.splice(max, len)
        console.log('faker 缩减 =', faker.length, dynamic.star_max)
    }
}
// 初始化
const init_dynamic = (dynamic: DynamicPager, total: number, size: number = PAGER_DEF_SIZE) => {
    reset_dynamic(dynamic, total, size)
    async_star_max_limit(dynamic, total)
    async_star_max(dynamic, total)
    // async_faker(dynamic, faker)
}
// 重置 dynamic
const reset_dynamic = (dynamic: DynamicPager, total: number, size: number): DynamicPager => {
    dynamic.total = total
    dynamic.size = size
    dynamic.star = 0
    dynamic.star_max = PAGER_DEF_SIZE
    dynamic.star_max_limit =  pager_tooi.get_star_max_limit(total, size)
    return dynamic
}

/*
============================================================================================
*/

// 增长
const grow = (dynamic: DynamicPager, faker: DATA_FAKER) => {
    move_star_n_end(dynamic, dynamic.size)
    async_star_max(dynamic, dynamic.total)
    async_faker(dynamic, faker)
}
// 跳跃
const dump = (dynamic: DynamicPager, num: number) => {
    const st: number = dynamic.star
    dynamic.walk = st
    dynamic.walk = _move_star(dynamic, st + num)
    async_star_max(dynamic, dynamic.total)
    // async_faker(dynamic, faker)
}

// 步行
const walk = (dynamic: DynamicPager, num: number = 0) => {
    let _wk: number = dynamic.walk
    if (_wk) {

    }
    else {
        // _wk = dynamic.star
    }
    _wk = _wk + num;
    console.log('_WK =', _wk)
    // async_star_max(dynamic, dynamic.total);
    // _wk = _wk > dynamic.star_max_limit ? dynamic.star_max_limit : _wk
    // _wk = _wk < 0 ? 0 : _wk
    dynamic.walk = _wk
}

export default {
    grow,
    dump,
    walk,

    async_star_max,
    async_faker,
    async_house,
    move_star_n_end,
    
    init_dynamic,
    reset_dynamic,

    def: (): DynamicPager => reset_dynamic({
        enable: true,
        size: 0,
        total: 0,
        star: 0,
        walk: 0,
        star_max: 0,
        star_max_limit: 0
    }, 0, PAGER_DEF_SIZE)
}