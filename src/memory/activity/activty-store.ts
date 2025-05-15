
import { Store, createStore } from 'vuex';

const _s: Store<ActivityStore> = createStore({
    
    state: <ActivityStore> {
        one: { },
        view: { },
        ioading: 0,
    },
    getters: {

    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // PAN
    }
})

export default _s