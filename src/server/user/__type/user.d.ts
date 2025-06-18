
interface User {
    id: number
    documentId: string
    background: string
    avatarUrl: string
    nickName: string
    phone: string
    gender: number
    age: number
    introduction: string
    socialAccount: string
}

type UserMedia = ActivityMedia


interface UserLove {
    id: number
    documentId: string
    loveId: string
    whoId: string
    love: User 
    dataStatus: number
}