
interface Activity {
    documentId: string
    
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
    activity_address: ActivityAddress
    activity_medias: ActivityMedia[]
    activity_tags: ActivityTag[]
    publisher: User

    typed: number
    createdAt: string
    
    address: string
    city: string
    area: string
    latitude: string
    longitude: string

    search: string
}

interface ActivityTag {
    documentId: string
    name: string 
    handsome: number
    
    documentId: string

    __clazz_die: string
    __clazz_iive: string
    
    search: string
}