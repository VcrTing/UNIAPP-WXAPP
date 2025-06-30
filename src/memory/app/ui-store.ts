
import { W } from '@/conf/conf-dev';
import { Store, createStore } from 'vuex';
import { appState } from '../global';

const DEF_CAPACITY = 14

const _uiStore: Store<UiStore> = createStore({
    
    state: <UiStore>{
        platform: 'phone',
        root_font_size: 16,
        root_font_size_coefficient: 16,
        w: 375,
        h: 750,
    },
    getters: {
        ispc: s => (s.platform === 'pc'),
        ispad: s => (s.platform === 'pad'),
        isphone: s => (s.platform === 'phone'),
        ismall: s => {
            const isdoc: boolean = appState.document
            if (s.platform === 'phone') {
                return true
                // if (!isdoc) { return true }
            }
            return false
        }
    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },

    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],

        // 等比例缩小 px
        scale_px: ({ state }, px: number = 0): number => {
            let capacity = state.root_font_size_coefficient
            const _cc: number = capacity ? capacity : DEF_CAPACITY
            const res: number = px * _cc / DEF_CAPACITY 
            return Math.floor( res ? res : px )
        },

        //
        asyncwh: async ({ state }) => {
            const info = await uni.getSystemInfo()
            const w: number = info.screenWidth || 375;
            const h: number = info.windowWidth || 750;

            state.w = w 
            state.h = h
            if (w > W.PC) {
                state.platform = 'pc'
            }
            else {
                if (w > W.PAD) {
                    state.platform = 'pad'
                }
                else {
                    state.platform = 'phone'
                }
            }
            console.log('平台 === ', state.platform)
        },
    }
})

export default _uiStore