
import { Store, createStore } from 'vuex';

const _reportDWStore: Store<ReportPageWorkingStore> = createStore({
    
    state: <ReportPageWorkingStore> {
        menu: <LayoutMenuItem>{ },
        identify: '',

        columns: <OTableColumn[]>[ ],
        item: <ONE>{ },

        item_index: '',
        item_index_value: undefined,

        switch_page_num: 0,

        walk_num: 0,
        walk_value: 0,
    },
    getters: {
        
    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        walk: ({ state }, v: number) => {
            state.walk_value = v
            state.walk_num += 1
        },
        switch_page_num_add: (c: ONE) => c.state[ 'switch_page_num' ] = c.state[ 'switch_page_num' ] + 1
    }
})

export const reportDWState = _reportDWStore.state
export const reportDWDispatch = _reportDWStore.dispatch