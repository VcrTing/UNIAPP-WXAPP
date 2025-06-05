namespace Page {
    interface IndexPageStore {
        city: Conf.City
        
        ioading: number
        indextags: ActivityTag[]

        index_pager: Pager
        index_activities: Activity[]

        page_index_data_options: Page.IndexPageDataActivityOptions
    }

    interface PublishPageStore {
        num: number
        edit: ONE
    }
}