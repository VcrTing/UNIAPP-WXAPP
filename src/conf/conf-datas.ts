
export const DATA_CITY_DEF = <Conf.City>{ name: '深圳', id: 1 }
export const DATA_CITYS = <Conf.Citys>[
    DATA_CITY_DEF,
    { name: '赣州', id: 2 },
    { name: '珠海', id: 3 },
]

// 活动类型
export const DATA_ACTIVITY_TYPED_DEF = <Conf.Tab>{ name: '公开类型', v: 0 }
export const DATA_ACTIVITY_TYPED = <Conf.Tabs>[
    DATA_ACTIVITY_TYPED_DEF,
    { name: '非公开', v: 1 },
]

// 审核状态, 0 等待、1 通过、2 拒绝
export const DATA_ACTIVITY_REVIEW_DEF = <Conf.Tab>{ name: '待完善', v: 0 }
export const DATA_ACTIVITY_REVIEW = <Conf.Tabs>[
    DATA_ACTIVITY_REVIEW_DEF,
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