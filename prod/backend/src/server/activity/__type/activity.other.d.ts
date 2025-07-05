
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

interface ActivityNotice {
    id: number
    documentId: string
    createdAt: string
    title: string
    content: string
    dataStatus: number
    activityId: string
    publisherId: string
    isTop: number
}