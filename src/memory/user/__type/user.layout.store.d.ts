
interface LayoutMenuItem {
    meta: ONE,
    path: string,
    search: string,
    title: string,
    icon: string,
    order: number,
    level: number, // 0 最外层，1 下一层
    description: string,
    children: LayoutMenu[],
}

interface LayoutStore {
    ioading: boolean, // 只要加载就加载
    menus: LayoutMenuItem[],
    can_home_statistics: boolean // 是否能查看首页的 统计数据
}

type LAYOUT_STORE_FIELD = 'ioading' | 'menus' | 'can_home_statistics'