import fioat from "../util/fioat";
import { must_arr } from "../util/valued";
import times from "../web/times"


const build_plus_form = (act: Activity, user: User, num: number) => {
    const feeAmount: number = fioat.floatMul(act.fee || 0, num)
    return {
        user: user.id,
        activity: act.documentId,
        feeAmount, price: act.fee,
        registrationTime: times.fmts(null),
        paymentStatus: 1,
        num,
    }
}

const judge_is_join = (joins: ActivityJoin[], activity: Activity) => {
    let has = false;
    const actid: string | null = activity.documentId || null
    must_arr(joins).map((e: ActivityJoin) => {
        const act: Activity = e.activity || {}
        const __actid: string = act.documentId || ''
        if (actid === __actid) {
            has = true
        }
    });
    return has
}

const getconsume_time = (join: ActivityJoin) => {
    const st: string = join.consumeTime
    if (st) { return times.fmts(st) }
    return times.fmts(join.activity.startTime)
}

const judge_is_invited = (items: ActivityInvite[ ], user: User): boolean => {
    const id: string = user.id + '';
    let res = false
    must_arr(items).map((e: ActivityInvite) => {
        const uid: string = e.inviteUserId || ''
        if (uid === id) {
            res = true
        }
    })
    return res
}

export default {
    build_plus_form,
    judge_is_join,
    judge_is_invited,

    getconsume_time
}