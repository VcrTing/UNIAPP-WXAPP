
interface ActivityStore {
    one: Activity
    view: Activity
    ioading: number
}

type ACTIVITY_STORE_FIELD = 
    'one' | 'view' | 'ioading' | 'indextags' | 'index_pager' | 'index_activities'
