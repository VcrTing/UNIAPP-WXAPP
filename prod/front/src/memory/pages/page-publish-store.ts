
import { ROLE_ANON, ROLE_AUTH, USER_DEF } from '@/conf/conf-role';
import pan_tooi from '@/tool/app/pan_tooi';
import { storage } from '@/tool/web/storage';
import { Store, createStore } from 'vuex';

export enum AutoLoginStatus {
    ALREADY_LOGIN,
    AUTO_SUCCESS,
    AUTO_FAIL
}

const _s: Store<Page.PublishPageStore> = createStore({
    
    state: <Page.PublishPageStore>{
        num: 0,
        edit: <Product>{ }
    },
    getters: {
        edit: s => {
            return s.edit
        }
    },
    mutations: {
        __num: (s: ONE) => {
            s.num = s.num + 1;
            // console.log('num 变化')
        },
    },

    actions: {
        // 使用案例，vuex.dispatch('change', [ 'ioading', -1 ])
        // 或者 authReFresh('ioading', -1)
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),

        // 开启刷新
        refresh: (c: ONE) => { c.commit('__num') }
    }
})

export default _s