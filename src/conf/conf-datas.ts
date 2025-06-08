
export const DATA_CITY_DEF = <Conf.City>{ name: '深圳', documentId: '' }
export const DATA_CITYS = <Conf.Citys>[
    DATA_CITY_DEF,
    { name: '赣州', documentId: '' },
    { name: '珠海', documentId: '' },
]

// 活动类型
export const DATA_ACTIVITY_TYPED_GK = <Conf.Tab>{ name: '公开类型', v: 0 }
export const DATA_ACTIVITY_TYPED_SM = <Conf.Tab>{ name: '非公开', v: 1 }
export const DATA_ACTIVITY_TYPED = <Conf.Tabs>[
    DATA_ACTIVITY_TYPED_GK,
    DATA_ACTIVITY_TYPED_SM,
]

// 审核状态, 0 等待、1 通过、2 拒绝
export const DATA_ACTIVITY_REVIEW_DEF = <Conf.Tab>{ name: '待完善', v: 0 }
export const DATA_ACTIVITY_REVIEW = <Conf.Tabs>[
    DATA_ACTIVITY_REVIEW_DEF,
    { name: '审核中', v: 1 },
    { name: '未通过审核', v: 2 },
]

// 全部活动状态
export const DATA_ACTIVITY_STATUS_DEF = <Conf.Tab>{ name: '全部', v: -1 }
export const DATA_ACTIVITY_STATUS = <Conf.Tabs>[
    DATA_ACTIVITY_STATUS_DEF,
    { name: '待发布', v: 1 },
    { name: '上架中', v: 2 },
    { name: '已取消', v: 3 },
    { name: '已结束', v: 4 },
]

// 是否推荐
export const DATA_IS_RECOMMEND = 1

// 标签最大个数
export const DATA_ACTIVITY_TAG_LIMIT = 3

// 默认活动人数限制
export const DATA_ACTIVITY_JOINER_LIMIT = 20

export const DATA_ACTIVITY_MEDIA = {
    BANNER_LESS: 1,
    BANNER_LIMIT: 6,
    GALLERY_LESS: 1,
    GALLERY_LIMIT: 10
}

// 默认活动 BANNER
export const DATA_ACTIVITY_BANNER_DEF = { url: 'https://img0.baidu.com/it/u=1944742839,3466909988&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750' }