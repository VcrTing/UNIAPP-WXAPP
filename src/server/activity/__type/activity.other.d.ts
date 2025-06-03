
interface ActivityMedia {
    id: number
    url: string
    isGallery: 0 | 1
}

interface ActivityAddress {
    id: number,
    address: string
    city: string
    latitude: string
    longitude: string
    province: string
    country: string
    addressSystem: string
}