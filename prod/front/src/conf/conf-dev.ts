
export const APP_W_DEF: number = 375

// 宽度临界值
export const W = {
    PC: 1028,
    PAD: 752
}

// 默认国家代码
export const DEV_COUNTRY_CODE_DEF = 86

//
export const DEV_GENERATE_SPECIAL = (c: number | string, s: string) => {
    return c + '_' + s + '_VCR_TING'
}

export const DEV_ID = 'id'
export const DEV_DOC_ID = 'documentId'

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

// 活动的开发设置
export const DEV_ACTIVITY = {
    // 是否 允许 私密
    ALLOW_SEARCH_SM: false,
    //
    SORT: {
        // 首页数据的排序状况
        INDEX: [
            { K: 'createdAt', ASC: true }
        ]
    }
}

// 商品的开发设置
export const DEV_PRODUCT = {
    INV_TYPED: {
        ALONE: 1,
        MANY: -1
    },
    //
    SORT: {
        // 首页数据的排序状况
        INDEX: [
            { K: 'createdAt', DESC: true }
        ]
    }
}

// 订单的开发设置
export const DEV_ORDER = {
    //
    SORT: {
        // 首页数据的排序状况
        DEF: [
            { K: 'createdAt', DESC: true }
        ]
    }
}

// 媒体禁止
export const DEV_MEDIA_ALLOW = {
    ALLOW_SEX: 0, // 是否允许展示 色情 1 = 允许
    OPEN_ALLOW: true, // 允许展示 被允许的 true = 打开 isAllow 开关，其他 = 不检查 isAllow
}

// 媒体展示
export const DEV_MEDIA_VIEW = {
    // 所展示的 banner 媒体高度，超越了 100vh 时
    BANNER_MORE_THAN_VH: (src: number, h_app: number): number => {
        return src
    }
}

// 性别设定
export const DEV_GENDER = {
    BOY: 1, GIRL: 0
}

export const DEV_STATUS_DEF = {
    // 是否推荐
    IS_RECOMMEND: 1,
    // 审核通过
    IS_PASS: 1,
    // 审核不通过
    IS_PASS_NOT: 2
}

export const DEV_CONTENT_CATEGORY = {
    WORD: null,
    GALLERY: 1
}