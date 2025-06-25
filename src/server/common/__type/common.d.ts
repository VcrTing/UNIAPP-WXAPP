interface Media {
    id: number
    documentId: string
    url: string
    urlSmall: string
    sortOrder: number
    isSex: 0 | 1
    isAllow: 0 | 1
    isGallery: 0 | 1
    mediaType: number
    w: number
    h: number
    
    activity: string | number
    user: string | number
}


interface Tag {
    id: number
    documentId: string

    name: string 
    cover: string

    handsome: number
    indexLevel: number

    isMain: number
    dataStatus: number

    __clazz_die: string
    __clazz_iive: string
    
    search: string
}


interface Address {
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
