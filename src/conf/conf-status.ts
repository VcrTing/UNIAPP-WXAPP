
const __K: string = 'dataStatus'

const __YES_NO: Conf.YESNO = {
    YES: 1, NO: null,
}

// TAG 的状态
export const STS_TAG = {
    LIVE: {
        K: __K, V: 1
    }
}

export const STS = __YES_NO

// 媒体 的 色情 状态
export const STS_MEDIA = {
    SEX: __YES_NO,
    ALLOW: __YES_NO
}

export const STS_CONTENT = {
    STATUS: <Conf.PostStatus> {
        K: 'dataStatus',
        EDITING: 0,
        PASS: 1,
    },
    ALLOW: <Conf.YESNO_K> {
        K: 'isAllow', 
        YES: 1, NO: ''
    }
}

// 产品 / 活动 的状态
export const STS_ACTIVITY = {
    STATUS: <Conf.PostStatus> {
        K: 'dataStatus',
        EDITING: 0,
        CHECKING: 1,
        PASS: 2,
        NICE: 3
    },
    REVIEW: <Conf.ReviewStatus> {
        K: 'reviewStatus',
        WAITING: null,
        YES: 1,
        NO: 2,
        DIE: -1
    },
    RECOMMEND: <Conf.YESNO_K>{ ...__YES_NO, K: 'isRecommended' },
}