


interface Tag {
    id: number
    documentId: string
    createdAt: string

    name: string 
    cover: string

    handsome: number
    indexLevel: number

    isMain: number
    dataStatus: number

    __clazz_die: string
    __clazz_iive: string
    
    search: string

    clazz: string
}


interface Address {
    id: number
    documentId: string
    createdAt: string
    
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
