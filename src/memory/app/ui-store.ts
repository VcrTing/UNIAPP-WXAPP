
import { Store, createStore } from 'vuex';

const DEF_CAPACITY = 14

const _uiStore: Store<UiStore> = createStore({
    
    state: <UiStore>{
        platform: 'phone',
        root_font_size: 16,
        root_font_size_coefficient: 16,
        w: 375,
        h: 750
    },
    getters: {

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
            state.w = info.screenWidth || 375;
            state.h = info.windowWidth || 750;
        }
    }
})

export default _uiStore