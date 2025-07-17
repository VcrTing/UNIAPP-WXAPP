
interface Product {
    id: number
    documentId: string
    createdAt: string
    
    title: string
    introduction: string
    titleSubForSell: string

    typed: number
    
    search: string
    invTyped: number
    contentTyped: number
    contentStatus: number

    tags: Tag[]
    medias: Media[]
    user: User

    honours: Tag[]

    sexStatus: number
    dataStatus: number
    reviewStatus: number
    publishStatus: number
    recommendStatus: number

    numView: number
    numSell: number
    numHot: number
    numNice: number
    numHate: number
    numViewTrue: number
    numSellTrue: number

    inv: number
    invWeak: number

    price: number
    priceInv: number
    priceFirst: number

    endSellTime: string
    startSellTime: string

    reviewComment: string

    takeOffNum: number
    takeOffTime: string

    recommendLevel: number

    __is_in_order: number

    publishTime: string
}

interface ProductContent {
    id: number
    documentId: string
    createdAt: string

    content: string
    introduction: string

    belongId: string
    publisherId: string

    isAllow: number
    dataStatus: number
    
    category: number

    galleries: Media[]
}

interface ProductVisual {
    id: number
    documentId: string
    createdAt: string

    userId: string
    productId: string
    num: number

    typed: number
    product: Product
}