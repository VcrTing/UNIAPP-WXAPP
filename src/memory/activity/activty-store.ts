
import server_tags from '@/server/activity/server_tags';
import { arrsort } from '@/tool/util/iodash';
import { is_nice_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';

const _s: Store<ActivityStore> = createStore({
    
    state: <ActivityStore> {
        one: { },
        view: { },
        ioading: 0,
        indextags: [ ]
    },
    getters: {
        
    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // 提前刷新 首页 TAGS
        freshtags: async (c: ONE) => {
            const origins: ActivityTag[] = c.state.indextags || [ ]
            if (is_nice_arr(origins)) {
                console.log('无需刷新首页 TAGS')
            }
            else {
                const src: ActivityTag[] = arrsort(await server_tags.index(), 'handsome')
                console.log('刷新首页 TAGS =', src)
                c.commit('change', [ 'indextags', src ])
            }
        }
    }
})

export default _s