import { authGetters, authState } from "@/memory/global"
import { pageIndexState } from "@/memory/page"
import server_medias from "@/server/media/server_medias"
import { master } from "@/tool/http/http"
import net_tool from "@/tool/http/net_tool"
import strapi_param_tool from "@/tool/strapi/strapi_param_tool"
import { netip } from "@/tool/uni/uni-global"
import { is_arr, is_str } from "@/tool/util/typed"

const relations = <string[]>[  ]

const fetching = async (param: ONE, pager: Pager): Promise<User[]> => {
    const __pm: ONE = net_tool.build_param(param, pager, relations)
    const src: NET_RES = await master.get('user', null, __pm)
    return net_tool.many<User>(src as ONE)
}

const byids = async (ids: string[]): Promise<User[]> => {
    const param: ONE = { }
    // ID = 这些
    strapi_param_tool.build_filter_in(param, 'documentId', ids || [ ])
    // 用户
    return await fetching(param, net_tool.generate_pagination(9))
}

const mainpage = async (userid: string): Promise<UserMainPage> => {
    const users: User[] = await byids([ userid ])
    if (users.length > 0) {
        const user: User = users[0];
        const activityMedias: ActivityMedia[] = await server_medias.mainpage(user.id + '');
        return <UserMainPage>{
            numJoin: 2, numLove: 13, numFans: 1200, numPublish: 3,
            user, tags: pageIndexState.indextags, activityMedias,
            userid: user.id
        }
    }
    return <UserMainPage>{ }
}

export default {
    byids,
    mainpage
}