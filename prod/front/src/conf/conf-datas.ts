
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
// 产品类型
export const DATA_PRODUCT_TYPED_SM = <Conf.Tab>{ name: '售卖品', v: 0 }
export const DATA_PRODUCT_TYPED_FREE = <Conf.Tab>{ name: '公开品', v: 1 }
export const DATA_PRODUCT_TYPED = <Conf.Tabs>[
    DATA_PRODUCT_TYPED_SM,
    DATA_PRODUCT_TYPED_FREE,
]
// 产品库存类型
export const DATA_PRODUCT_TYPED_INV_ALONE = <Conf.Tab>{ name: '仅一件库存', v: 0 }
export const DATA_PRODUCT_TYPED_INV_MANY = <Conf.Tab>{ name: '多数量库存', v: 1 }
export const DATA_PRODUCT_TYPED_INV_INFINI = <Conf.Tab>{ name: '无限制', v: 2 }
export const DATA_PRODUCT_TYPED_INV = <Conf.Tabs>[
    DATA_PRODUCT_TYPED_INV_ALONE,
    DATA_PRODUCT_TYPED_INV_MANY,
    DATA_PRODUCT_TYPED_INV_INFINI
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

export const DATA_PUBLISH_LIMIT = {
    // 标签最大个数
    TAG: 4,
    // 默认活动人数限制
    JOINER: 100
}

export const DATA_PUBLISH_MEDIA = {
    BANNER_LESS: 1,
    BANNER_LIMIT: 6,
    GALLERY_LESS: 1,
    GALLERY_LIMIT: 10
}

// 默认活动 BANNER
export const DATA_PUBLISH_BANNER_DEF = { 
    url: 'https://img0.baidu.com/it/u=1944742839,3466909988&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750' 
}

// 支付方式
export const DATA_PAYMENT_WAY_DEF = {
    name: '微信支付', code: 'wx',
    cover: 'https://gips0.baidu.com/it/u=2981205666,3076745725&fm=3074&app=3074&f=JPEG?w=622&h=494&type=normal&func='
}
export const DATA_PAYMENT_WAY = [
    DATA_PAYMENT_WAY_DEF,
    {
        name: '支付宝', code: 'zfb',
        cover: 'https://p0.ifengimg.com/pmop/2018/0824/6D51911AF96E82026DCFE72F765414257D2A2E20_size15_w640_h477.jpeg'
    }
]

// 排行
export const DATA_FILTER_TAB_DEF = { name: '全部', v: 0  }
export const DATA_FILTER_TABS = <Conf.Tabs>[
    DATA_FILTER_TAB_DEF, 
    { name: '热门', v: 1 }
]