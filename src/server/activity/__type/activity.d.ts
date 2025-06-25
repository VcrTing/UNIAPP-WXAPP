
interface Activity {
    id: number
    documentId: string
    createdAt: string
    
    title: string
    startTime: string
    endTime: string
    endJoinTime: string 
    fee: number
    participantLimit: number
    introduction: string
    reviewStatus: number
    reviewComment: string
    shareCount: number
    viewCount: number
    isRecommended: number
    dataStatus: number
    //
    activity_registrations: ActivityJoin[]
    activity_contents: ProductContent[]
    activity_invites: ActivityInvite[]
    activity_address: Address
    activity_medias: Media[]
    activity_tags: Tag[]
    publisher: User

    typed: number
    
    address: string
    city: string
    area: string
    latitude: string
    longitude: string

    search: string
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