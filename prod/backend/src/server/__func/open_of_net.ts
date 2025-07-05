import server_activity from "../activity/server_activity"
import server_me from "../user/server_me"

const __net: ONE = {
    'user': async (id: string): Promise<User> => {
        return await server_me.one(id)
    },
    'activity': async (docid: string): Promise<Activity> => {
        return await server_activity.byid(docid)
    },
}

export const open_of_net = async <T>(net_key: string, id: string): Promise<T> => {
    return await __net[ net_key ](id)
}
