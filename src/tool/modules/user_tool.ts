

export default {

    getgender: (v: User) => {
        return v.gender === 1 ? '男' : '女'
    }
}