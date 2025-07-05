
interface XOrder {
    id: string
    documentId: string
    num: number
    price: number
    sendPrice: number
    sendType: number

    remark: string

    userCode: string
    userPhone: string
    userDocumentId: string

    carts: Page.CartDataOptions

    name: string
    phone: string
    address: string

    createdAt: string

    payStatus: number
}