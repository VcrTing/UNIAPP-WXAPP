

const num = (n: number, isadd: boolean) => {
    n = n || 0
    n = isadd ? (n + 1) : (n - 1)
    return n < 0 ? 0 : n
}

export default {
    num,
    //
    getgender: (v: User) => {
        return v.gender === 1 ? '男' : '女'
    }
}