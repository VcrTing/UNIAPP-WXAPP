
interface UserMainPage {
    numPublish: number
    numJoin: number
    numJoinPay: number
    numFansTotal: number
    numLoveTotal: number
    numMemberTotal: number

    id: number
    documentId: string

    statistic: UserStatistic

    user: User
    tags: Tag[]
    activityMedias: Media[]
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