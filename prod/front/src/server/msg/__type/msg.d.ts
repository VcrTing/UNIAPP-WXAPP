
interface MsgSystem {
    id: number
    documentId: string
    createdAt: string

    content: string 
    title: string
    isRead: number
    readTime: string
    toId: string
    typed: number
    publisherId: string
}