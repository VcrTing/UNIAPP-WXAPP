
import server_activity from '@/server/activity/server_activity';
import server_tags from '@/server/activity/server_tags';
import net_tool from '@/tool/http/net_tool';
import { arrsort } from '@/tool/util/iodash';
import { is_nice_arr, must_one } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';

const _s: Store<Page.IndexPageStore> = createStore({
    
    state: <ONE> {
        city: <Conf.City>{ },

        ioading: 0,
        indextags: [ ],
        index_pager: <Pager>{ },
        index_activities: [ ],
        page_index_data_options: <Page.IndexPageDataActivityOptions>{ }
    },
    getters: {
        
    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
        __refresh_index_pager: (s: ONE, v: Pager) => {
            s.index_pager = v;
            // 存本地
        },
        // 更新 首页 活动
        __refresh_index_activities: (s: ONE, v: Activity[]) => {
            // 存本地
        },
        // 加载 首页 分页
        __ioad_index_pager: (s: ONE) => {
            let src: Pager = must_one(s.index_pager)
            const n: number | undefined = src.page
            // 没有，取一个默认
            if (!n) {
                // 先去 本地 取
                // 
                // 拿默认
                src = net_tool.generate_pagination()
            }
            return src
        },
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // 提前刷新 首页 TAGS
        freshtags: async (c: ONE) => {
            const origins: Tag[] = c.state.indextags || [ ]
            if (is_nice_arr(origins)) {
                console.log('无需刷新首页 TAGS')
            }
            else {
                const src: Tag[] = arrsort(await server_tags.index(), 'handsome')
                console.log('刷新首页 TAGS =', src)
                c.commit('change', [ 'indextags', src ])
            }
        },

        // 获取 首页 推荐的 活动
        get_index_activities: async (c: ONE) => {
            const s = c.state
            c.commit('__ioad_index_pager')
            const n: Activity[] = s.index_activities
            if (is_nice_arr(n)) {
                // 返回
                return n
            }
            else {
                let src: Activity[] = [ ]
                // 需要获取
                //
                // 先从本地缓存 获取
                //
                // 从网络获取
                const pager: Pager = must_one(s.index_pager)
                src = await server_activity.index_recommond({ }, pager)
                // 更新
                c.commit('__refresh_index_activities', src)
                // 返回
                return src
            }
        }
    }
})

export default _s