import { authGetters, authState } from "@/memory/global"
import { pageIndexState } from "@/memory/page"
import server_medias from "@/server/media/server_medias"
import { app } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import srp_p from "@/tool/strapi/srp_p"
import server_user_statistic from "./server_user_statistic"
import { must_arr, must_one } from "@/tool/util/valued"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<User[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await app.get('user', null, __pm)
    // if (is_str(src)) return netip(src, [ ]);
    // const res: ONE | MANY = (src as HttpResult).data
    return must_arr(src)
}

const aii = async (): Promise<User[]> => {
    const param: ONE = { }
    const src: User[] = await fetching(param, net_tool.__pager(6))
    return must_arr(src)
}

const byphone = async (phone: string): Promise<User> => {
    const param: ONE = { }
    srp_p.__eq(param, 'phone', phone)
    const src: User[] = await fetching(param, net_tool.__pager())
    return must_one(src[0])
}

const byids = async (ids: string[]): Promise<User[]> => {
    const param: ONE = { }
    // ID = 这些
    srp_p.build_filter_in(param, 'id', ids || [ ])
    // 用户
    return await fetching(param, net_tool.__pager(9))
}

const __main_page = async (user: User): Promise<UserMainPage> => {
    console.log("搜索用户的主页 =", user)
    const medias: Media[] = await server_medias.mainpage(user.id + '');
    const statistic: UserStatistic = await server_user_statistic.byuser(user.id)
    const src = <UserMainPage>{
        ...statistic, statistic,
        user, tags: pageIndexState.indextags,
        medias, userid: user.id, 
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
    aii,
    byphone,
    byids,
    mainpage,
    mymainpage
}