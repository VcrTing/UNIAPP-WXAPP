/*
    自定义的 全局 类型
*/

declare global {
    type BOOL = 'true' | 'false'

    type ONE = { [k: string]: any }
    type ONEO = { [k: string]: ONE }
    type ONEM = { [k: string]: MANY }

    type ONE_NULL = ONE | null

    type MANY = ONE[ ]
    type MANY_NULL = MANY | null
    
    type ANYS = any[ ]

    type SN = string | number
    type SNS = SN[ ]
    
    type SNN = string | number | null
    type SNNS = SNN[ ]

    // 异步
    type ONE_PROMISE = Promise<ONE>
    type MANY_PROMISE = Promise<MANY>
    
    // 后端
    type ORDER_BY = 'asc' | 'desc'

    // VUEX
    // type DISPATCH = (property) StoreOptions<?>.actions
}

export {};