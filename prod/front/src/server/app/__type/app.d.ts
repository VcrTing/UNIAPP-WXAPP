interface AppInfo {
    id: number
    documentId: string
    createdAt: string

    logo: string
    desc: string
    name: string
    logoLogin: string
    descLogin: string
    bgLogin: string

    dataStatus: number

    userDefAvatarUrl: string
    userDefBackground: string

    index_banners: Media[]
    user_banners: Media[]
    contacts: User[]
}