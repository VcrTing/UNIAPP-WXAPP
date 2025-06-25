
export const APP_W_DEF: number = 375

export const W = {
    PC: 1028,
    PAD: 752
}

// 分页
export const DEV_PAGER = {
    SIZE_DEF: 10,
    SIZE_MAX: 999,
    SIZE_LONG: 100,
}

// 标签设置
export const DEV_TAG = {
    // 首页 indexLevel 值超过 多少，则加入首页展示列
    INDEX_LEVEL_LIMIT_PHONE: 500,
    INDEX_LEVEL_LIMIT: 300 // 不是手机 端值可以少一点
}

// 是否运行私密
export const DEV_SM_ALLOW_SEARCH = false

// 是否允许展示
export const DEV_MEDIA_ALLOW = {
    IS_SEX: 0, // 是否允许展示 色情 1 = 允许
    OPEN_ALLOW: true, // 允许展示 被允许的 true = 打开 isAllow 开关，其他 = 不检查 isAllow
}

export const DEV_MEDIA_VIEW = {
    // 所展示的 banner 媒体高度，超越了 100vh 时
    BANNER_MORE_THAN_VH: (src: number, h_app: number): number => {
        return src
    }
}

export const DEV_K = {
    MEDIA: 'activity_medias'
}

export const DEV_STATUS_DEF = {
    // 是否推荐
    IS_RECOMMEND: 1,
    // 审核通过
    IS_PASS: 1,
    // 审核不通过
    IS_PASS_NOT: 2
}