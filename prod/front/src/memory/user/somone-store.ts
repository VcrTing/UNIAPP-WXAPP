
import server_user from '@/server/user/user/server_user';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { formfii, is_nice_one, must_arr, must_one } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';
import memory_tool from '../__func/memory_tool';
import server_user_statistic from '@/server/user/user/server_user_statistic';
import user_tool from '@/tool/modules/user_tool';
import { authGetters } from '../global';


const getyour_mainpage = async (state: ONE, commit: Function, userid: number): Promise<UserMainPage> => {
    const srcs: UserMainPage[] = state.mainpages || []
    const iii: number = arrfindi(srcs, userid, 'id')
    let res: UserMainPage = <UserMainPage>{ };
    if (iii < 0) {
        const u: UserMainPage = await server_user.mainpage(userid)
        console.log('获取某人主页 =', u)
        srcs.push(u); commit('__change', [ 'mainpages', srcs ]);
        res = u
    }
    else {
        res = srcs[ iii ]
    }
    return res
}

const async_to_house = (state: ONE, commit: Function,res: UserMainPage , us_new: UserStatistic) => {
    const srcs: UserMainPage[] = state.mainpages || []
    const i: number = arrfindi<UserMainPage>(srcs, us_new.documentId, 'documentIdStatistic')
    const tar: UserMainPage = srcs[i]
    const us: UserMainPage = user_tool.group_main_page(us_new, res.user, res.medias)
    // 
    if (tar && tar.documentIdStatistic) {
        srcs[i] = us;
    }
    else {
        srcs.push(us);
    }
    commit('__change', [ 'mainpages', srcs ]);
}

const _s: Store<SomoneStore> = createStore({
    
    state: <SomoneStore>{
        num: 0,
        mainpage: <UserMainPage>{ },
        mainpages: <UserMainPage[]>[ ],
        mainpage_of_view: <UserMainPage>{ },

        gallery: <Media[]>[ ]
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
        refresh_mainpage: async ({ state, commit }): Promise<UserMainPage> => {
            return await memory_tool.locking(state, commit, state.mainpage, async () => {
                const origin: UserMainPage = must_one(state.mainpage)
                console.log('========= 刷新我的主页数据 origin =', origin)
                if (origin.documentId && origin.user && origin.user.documentId) {
                    return origin
                }
                if (authGetters.is_login) {
                    const u: UserMainPage = await server_user.mymainpage()
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
        clean_me: ({ state, commit }) => {
            commit('__change', [ 'mainpage', <UserMainPage>{ } ]);
        },
        clean_someone_mainpag: ({ state, commit }) => {
            commit('__change', [ 'mainpage_of_view', { } ]);
        },
        // 获取某人的主页信息
        fetch_someone_mainpag: async ({ state, commit }, { userid }): Promise<UserMainPage> => {
            let res: UserMainPage = await getyour_mainpage(state, commit, userid);
            commit('__change', [ 'mainpage_of_view', res ]);
            return res
        },
        // 增加某人的访问量
        visited_you_product: async ({ state, commit }, publisher: User): Promise<UserMainPage> => {
            const uid: number = publisher.id;
            console.log('uid =', uid)
            console.log('publisher =', publisher)
            let res: UserMainPage = await getyour_mainpage(state, commit, uid);
            console.log('UserMainPage =', res)
            // 新增一条访问量
            const nus: UserStatistic = await server_user_statistic.num_she_visited(res.statistic, uid);
            console.log('UserStatistic =', nus)
            // 同步到库存里
            async_to_house(state, commit, res, nus)
            // commit('__change', [ 'mainpage_of_view', res ]);
            return res
        },

        // 图册
        addgallery: async ({ state, commit }, gallery: Media[]) => {
            state.gallery = must_arr(gallery)
        }
    }
}) 

export default _s
