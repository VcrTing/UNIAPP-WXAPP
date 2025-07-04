
interface Product {
    id: number
    documentId: string
    createdAt: string
    
    title: string
    introduction: string
    titleSubForSell: string

    search: string
    invTyped: number
    contentTyped: number

    tags: Tag[]
    medias: Media[]
    publisher: User

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

    inv: number
    price: number
    priceInv: number
    priceFirst: number

    endSellTime: string
    startSellTime: string

    reviewComment: string
}

interface ProductContent {
    id: number
    documentId: string
    createdAt: string

    content: string
    introduction: string

    activityId: string
    publisherId: string

    activity: Activity
    isFrezz: number
    dataStatus: number

    numNice: number
    numHate: number
}