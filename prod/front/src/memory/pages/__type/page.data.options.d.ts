
namespace Page {

    interface IndexDataActivityOption {
        tag: Tag
        pager: Pager
    }

    type IndexPageDataActivityOptions = { [k: string]: IndexDataActivityOption }


    interface CartDataProductPrice {
        price: number,
    }


    interface CartDataOption {
        documentId: string // product doc id
        timed: Date // 加购时间
        prices: CartDataProductPrice[ ] // 价格代表数量

        product?: Product
    }

    type CartDataOptions = CartDataOption[]
}