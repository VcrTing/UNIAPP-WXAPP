import server_me from "../user/server_me"

const __net: ONE = {
    'user': async (id: string): Promise<User> => {
        return await server_me.one(id)
    }
}

export const open_of_net = async <T>(net_key: string, id: string): Promise<T> => {
    return await __net[ net_key ](id)
}
