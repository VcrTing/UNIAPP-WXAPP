
interface UserMainPage {
    numPublish: number
    numJoin: number
    numJoinPay: number
    numFansTotal: number
    numLoveTotal: number
    numMemberTotal: number

    id: number
    documentId: string

    user: User
    tags: ActivityTag[]
    activityMedias: ActivityMedia[]
}

interface UserStatistic {
    id: number
    documentId: string

    numPublish: number
    numJoin: number
    numJoinPay: number
    numFansTotal: number
    numLoveTotal: number
    numMemberTotal: number
    numPublishMoneyGet: number
    user: User
}