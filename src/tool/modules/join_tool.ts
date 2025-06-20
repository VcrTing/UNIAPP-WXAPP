import times from "../web/times"


const build_plus_form = (act: Activity, user: User) => {
    return {
        user: user.id,
        activity: act.documentId,
        feeAmount: act.fee,
        registrationTime: times.fmts(null),
        paymentStatus: 1,
        num: 1,
    }
}

const judge_is_join = (joins: ActivityJoin[], activity: Activity) => {
    let has = false;
    const actid: string | null = activity.documentId || null
    joins.map((e: ActivityJoin) => {
        const act: Activity = e.activity || {}
        const __actid: string = act.documentId || ''
        if (actid === __actid) {
            has = true
        }
    });
    return true
}



export default {
    build_plus_form,
    judge_is_join
}