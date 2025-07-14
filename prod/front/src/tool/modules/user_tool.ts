import { DEV_GENDER } from "@/conf/conf-dev"


const num = (n: number, isadd: boolean) => {
    n = n || 0
    n = isadd ? (n + 1) : (n - 1)
    return n < 0 ? 0 : n
}

const isboy = (v: User) => {
    return v.gender === DEV_GENDER.BOY
}

const group_main_page = (statistic: UserStatistic, user: User, medias: Media[]): UserMainPage => {
    
    const src = <UserMainPage | ONE>{
        ...statistic, statistic,
        user, 
        // tags: pageIndexState.indextags,
        medias, userid: user.id, 
    }
    src['id'] = user.id
    src['documentId'] = user.documentId
    src['documentIdStatistic'] = statistic.documentId

    return src as UserMainPage;
}

export default {
    group_main_page,

    num,
    isboy,
    //
    getgender: (v: User) => {
        return v.gender === DEV_GENDER.BOY ? '男' : '女'
    }
}