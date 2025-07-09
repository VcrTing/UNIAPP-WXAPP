
import server_user from '@/server/user/user/server_user';
import { arrfindi } from '@/tool/util/iodash';
import { formfii, is_nice_one, must_one } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import memory_tool from '../__func/memory_tool';


const _s: Store<SomoneStore> = createStore({
    
    state: <SomoneStore>{
        num: 0,
        mainpage: <UserMainPage>{ },
        mainpages: <UserMainPage[]>[ ],
        mainpage_of_view: <UserMainPage>{ }
    },
    getters: {

    },
    mutations: {
        __change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1],
        __num: (s: ONE) => {
            s.num = s.num + 1
        },
    },

    actions: {
        // 使用案例，vuex.dispatch('change', [ 'ioading', -1 ])
        // 或者 authReFresh('ioading', -1)
        change: (c: ONE, vs: ANYS) => (c.state[ vs[0] ] = vs[1]),

        // 获取我的主页信息
        refresh_mainpage: async ({ state, commit, getters }): Promise<UserMainPage> => {
            return await memory_tool.locking(state, commit, state.mainpage, async () => {
                const origin: UserMainPage = must_one(state.mainpage)
                if (origin.documentId && origin.user && origin.user.documentId) {
                    return origin
                }
                if (getters.is_login) {
                    const u: UserMainPage = await server_user.mymainpage()
                    console.log('========= 刷新我的主页数据 =', u)
                    if (u && u.documentId) {
                        commit('__change', [ 'mainpage', u ])
                        return u;
                    }
                }
                else {
                    console.log('========= 未登录，不刷主页')
                }
                return null
            })
        },

        clean_someone_mainpag: ({ state, commit }) => {
            commit('__change', [ 'mainpage_of_view', { } ]);
        },
        // 获取某人的主页信息
        fetch_someone_mainpag: async ({ state, commit }, { userid }): Promise<UserMainPage> => {
            const srcs: UserMainPage[] = state.mainpages || []
            console.log('userid =', userid, ' srcs =', srcs)
            const iii: number = arrfindi(srcs, userid, 'id')
            if (iii < 0) {
                
                const u: UserMainPage = await server_user.mainpage(userid)
                console.log('获取某人主页 =', u)
                srcs.push(u);
                commit('__change', [ 'mainpages', srcs ]);
                commit('__change', [ 'mainpage_of_view', u ]);
                return u;
            }
            else {
                commit('__change', [ 'mainpage_of_view', srcs[ iii ] ]);
                return srcs[ iii ]
            }
            // return <UserMainPage>{ }
        },
    }
}) 

export default _s
