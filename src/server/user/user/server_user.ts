import { authGetters, authState } from "@/memory/global"
import { pageIndexState } from "@/memory/page"
import server_medias from "@/server/media/server_medias"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"
import server_user_statistic from "./server_user_statistic"
import User from "@/pages/user/user.vue"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<User[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('user', null, __pm)
    return net_tool.many<User>(src as ONE)
}

const byids = async (ids: string[]): Promise<User[]> => {
    const param: ONE = { }
    // ID = 这些
    strapi_param_tool.build_filter_in(param, 'id', ids || [ ])
    // 用户
    return await fetching(param, net_tool.generate_pagination(9))
}

const __main_page = async (user: User): Promise<UserMainPage> => {
    console.log("搜索用户的主页 =", user)
    const activityMedias: ActivityMedia[] = await server_medias.mainpage(user.id + '');
    const statistic: UserStatistic = await server_user_statistic.byuser(user.id)
    const src = <UserMainPage>{
        ...statistic,
        user, tags: pageIndexState.indextags,
        activityMedias, userid: user.id, 
    }
    src['id'] = user.id
    src['documentId'] = user.documentId
    return src;
}

const mymainpage = async (): Promise<UserMainPage> => {
    const user: User = authState.user
    const is_login: boolean = authGetters.is_login
    if (is_login && user.id) {
        return await __main_page(user)
    }
    return <UserMainPage>{ }
}

const mainpage = async (userid: string): Promise<UserMainPage> => {
    const users: User[] = await byids([ userid ])
    if (users.length > 0) {
        return await __main_page(users[0])
    }
    return <UserMainPage>{ }
}

export default {
    byids,
    mainpage,
    mymainpage
}