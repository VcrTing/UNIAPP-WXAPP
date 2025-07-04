
import { is_nice_arr, is_nice_one } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';
import { authGetters } from '../global';
import server_ul_menu from '@/server/user/layout/server_ul_menu';
import { futuring } from '@/tool/util/future';

const _LAYOUT_WAREHOUSE_PREFIX = "USER_LAYOUT_WAREHOUSE_STORE_"

const __storage = {
    get: (): LayoutMenuItem[] | undefined => storage.get(_LAYOUT_WAREHOUSE_PREFIX + 'menus'),
    set: (ss: LayoutMenuItem[]) => storage.set(_LAYOUT_WAREHOUSE_PREFIX + 'menus', ss)
}

// 取出某个结构，磁盘穿透
const __get_menus = (state: LayoutStore): LayoutMenuItem[] | undefined => {
    let res: LayoutMenuItem[] = state.menus
    return is_nice_arr(res) ? res : __storage.get() // 磁盘穿透
}
const __fetch_menus = (state: LayoutStore, username: string) => futuring(state, async () => {
    const nets: ONE = await server_ul_menu.menus(username)
    if (is_nice_one(nets)) {
        state.can_home_statistics = nets.canViewHomeStatistics
        state.menus = nets.menus
        console.log('后台查询的 MENU =', nets.menus)
        return nets.menus
    }
    // 网络穿透失败
    else {
        console.log('报错：网络获取首页菜单信息失败')
    }
})


const _layoutStore: Store<LayoutStore> = createStore({
    
    state: <LayoutStore>{
        ioading: false,
        menus: <LayoutMenuItem[]>[ ],
        can_home_statistics: false
    },
    getters: {
        
    },
    mutations: {
        
    },

    actions: {
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),
        /**
         * 
         */
        init_menus: async (c: ONE): Promise<LayoutMenuItem[] | undefined> => {
            let res: LayoutMenuItem[] | undefined = __get_menus(c.state)
            console.log('INIT MENU...', res)
            if (is_nice_arr(res)) return res;
            // 网络穿透
            const username = authGetters.username
            if (!username) {
                console.log('报错：都没登录')
            }
            else { await __fetch_menus(c.state, username) }
            return undefined
        }
    }
})

export default _layoutStore