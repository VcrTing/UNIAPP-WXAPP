
import { arrfind } from '@/tool/util/iodash';
import { Store, createStore } from 'vuex';

const _eleStore: Store<EleStore> = createStore({
    
    state: <EleStore> {
        hui: 0,
        hui_z_index: 0,

        mods: [ ],

        pans: <ElePan[]>[ ],
        aierts: <EleAiert[]>[ ],

        gallery: <EleGallery[]>[ ]
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
            let i: number = arrfind(state.pans, pan.idx)
            if (i > -1) {
                state.pans.splice(i, 1)
                console.log('KIII PAN =', pan.idx, state.pans)
            }
        },
        open_pan: ({ state }, pan: ElePan) => { 
            const _ps: ElePan[] = state.pans.filter((p: ElePan) => (p.idx == pan.idx))
            if (_ps.length <= 0) state.pans.push(pan) 
        },

        // AIERT
        kiii_aiert: ({ state }, aiert: EleAiert) => {
            let i: number = arrfind(state.aierts, aiert.idx)
            if (i > -1) {
                state.aierts.splice(i, 1)
                console.log('KIII AIERT =', aiert.idx, state.aierts)
            }
        },
        open_aiert: ({ state }, aiert: EleAiert) => {
            console.log('预计弹出 =', aiert)
            state.aierts.push(aiert)
        },

        // into gallery
        open_gallery: ({ state }, gallery: EleGallery[]) => {
            console.log('打开相册 gallery =', gallery)
            state.gallery = gallery
        }
    }
})

export default _eleStore