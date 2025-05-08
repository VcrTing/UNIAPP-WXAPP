
import { Store, createStore } from 'vuex';

const _reportStore: Store<EleStore> = createStore({
    
    state: <EleStore> {
        hui: 0,
        hui_z_index: 0,

        mods: [ ],
        pans: <ElePan[]>[ ],
    },
    getters: {

    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // PAN
        kiii_pan: ({ state }, pan: ElePan) => {
            let i: number = -1
            state.pans.map((_p: ElePan, _i: number) => {
                if (_p.idx == pan.idx) i = _i
            });
            if (i > -1) {
                state.pans.splice(i, 1)
                console.log('KP i =', i)
            }
            console.log('KIII PAN =', pan.idx, state.pans)
        },
        open_pan: ({ state }, pan: ElePan) => { 
            const _ps: ElePan[] = state.pans.filter((p: ElePan) => (p.idx == pan.idx))
            if (_ps.length <= 0) state.pans.push(pan) 
        }
    }
})

export default _reportStore