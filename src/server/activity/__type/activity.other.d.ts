
interface ActivityMedia {
    documentId: string
    url: string
    urlSmall: string
    activity: string | number
    isGallery: 0 | 1
    mediaType: number
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