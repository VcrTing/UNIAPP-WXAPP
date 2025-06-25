import { DEV_GENDER } from "@/conf/conf-dev"


const num = (n: number, isadd: boolean) => {
    n = n || 0
    n = isadd ? (n + 1) : (n - 1)
    return n < 0 ? 0 : n
}

const isboy = (v: User) => {
    return v.gender === DEV_GENDER.BOY
}

export default {
    num,
    isboy,
    //
    getgender: (v: User) => {
        return v.gender === DEV_GENDER.BOY ? '男' : '女'
    }
}