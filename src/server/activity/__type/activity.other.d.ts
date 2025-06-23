
interface ActivityMedia {
    id: number
    documentId: string
    url: string
    urlSmall: string
    activity: string | number
    isGallery: 0 | 1
    mediaType: number
    w: number
    h: number
}

interface ActivityAddress {
    id: number
    documentId: string
    address: string
    city: string
    area: string
    latitude: number
    longitude: number
    province: string
    country: string
    remark: string
    addressSystem: string
}

interface ActivityJoin { // ActivityRegistration
    id: number
    documentId: string
    registrationTime: string
    paymentStatus: number
    activity: Activity
    user: User
    num: string
    price: number
    feeAmount: number

    refundStatus: number
    refundPrice: number
    refundTime: string
    refundRemark: string

    consumePrice: string
    consumeNum: number
    consumeCode: string
    consumeTime: string
    consumeStatus: number
}

interface ActivityInvite {
    id: number
    documentId: string
    readNum: number
    agreeStatus: number
    refuseComment: string
    refuseTime: string
    invite_user: User
    activityId: string
    publisherId: string
    inviteTime: string
    inviteUserId: string
}