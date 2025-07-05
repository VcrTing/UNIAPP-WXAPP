namespace Page {
    interface IndexPageStore {
        city: Conf.City
        
        ioading: number
        indextags: Tag[]

        index_pager: Pager
        index_activities: Activity[]

        page_index_data_options: Page.IndexPageDataActivityOptions
    }

    interface PublishPageStore {
        num: number
        edit: Product
    }

    interface CartPageStore {
        num: number
        __ioading: boolean
        carts: Page.CartDataOptions
        carts_of_order: Page.CartDataOptions
    }
}