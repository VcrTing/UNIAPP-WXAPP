interface DynamicPager {
    enable: boolean,
    size: number,
    total: number,
    star: number,
    walk: number, // 步行
    star_max: number,
    star_max_limit: number
}

interface DynamicWalk {
    num: number, // 点击步行次数
    walk: number // 步行数量
}