
interface UserMainPage {
    numPublish: number
    numJoin: number
    numJoinPay: number
    numFansTotal: number
    numLoveTotal: number
    numMemberTotal: number

    numView: number
    newVisited: number

    id: number
    documentId: string

    statistic: UserStatistic

    user: User
    tags: Tag[]
    medias: Media[]
}

interface UserStatistic {
    id: number
    documentId: string

    numView: number
    nuwVisited: number

    numPublish: number
    numJoin: number
    numJoinPay: number
    numFansTotal: number
    numLoveTotal: number
    numMemberTotal: number
    numPublishMoneyGet: number
    user: User
}