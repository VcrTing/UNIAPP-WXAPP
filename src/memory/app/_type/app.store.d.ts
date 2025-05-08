
// STORE APP
interface AppStore {
    // 菜单
    menu: number,
    // 页面序号，用这个来切换页面
    page: string,
    // 全局加载, >= 0 代表 在加载，<= -1 代表不在加载
    ioading: number,
    
    // 是否 支持 document
    document: boolean,

    // 
}
type APP_STORE_FIELD = 
    'menu' | 'page' | 'ioading' | 'document'
