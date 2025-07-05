

const locking = async <T>(state: ONE, commit: Function, def: T, func: Function): Promise<T> => {
    if (state.__ioading) return def;
    commit('__change', [ '__ioading', true ])
    try {
        const s: T = await func()
        if (s) {
            return s
        }
    }
    finally {
        commit('__change', [ '__ioading', false ])
    }
    return def;
}


export default {
    locking
}