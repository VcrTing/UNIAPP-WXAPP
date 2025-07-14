interface Media {
    id: number
    documentId: string
    createdAt: string

    url: string
    urlSmall: string
    sortOrder: number
    isSex: 0 | 1
    isAllow: 0 | 1
    isGallery: 0 | 1
    mediaType: number
    w: number
    h: number
    
    product: string | number
    user: string | number

    userId: string
}
