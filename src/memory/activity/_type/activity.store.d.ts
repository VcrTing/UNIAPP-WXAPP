
interface ActivityStore {
    one: ONE,
    view: ONE,
    ioading: number,
    indextags: ActivityTag[]
}

type ACTIVITY_STORE_FIELD = 
    'one' | 'view' | 'ioading'
