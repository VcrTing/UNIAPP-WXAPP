
interface ActivityMedia {
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
    documentId: string
    address: string
    city: string
    latitude: string
    longitude: string
    province: string
    country: string
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
    feeAmount: number
}