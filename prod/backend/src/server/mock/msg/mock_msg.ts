
const build_sys_msg = (isRed = false) => {
    return {
        id: 1, isRed,
        msg: '您提交的活动审核不通过，请重新修改'
    }
}

const build_activity_msg = (isRed = false) => {
    return {
        id: 1, isRed, activity: {
            title: '龙华私人台球教练', id: 1,
        },
        msg: '距离您的活动开始，还剩下20分钟了，请尽快参与。'
    }
}

const __money = 10.02

const build_pays_msg = (money = 300, isAdd = true) => {
    return {
        id: 1, isAdd, money, total: __money + money,
        msg: '您的账户于2025年5月27日，入账300元', timed: '2025-05-27 12:23'
    }
}

export default {
    sys_notifies: [
        build_sys_msg(),
        build_sys_msg(true)
    ],
    sys_activities: [
        build_activity_msg(),
        build_activity_msg(true)
    ],
    sys_pays: [
        build_pays_msg(), build_pays_msg(100, false),
        build_pays_msg(1000), build_pays_msg(700, false),
        build_pays_msg(10), build_pays_msg(69.02, false)
    ]
}