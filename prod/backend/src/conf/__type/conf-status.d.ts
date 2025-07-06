
namespace Conf {
    interface YESNO {
        YES: 1, NO: 0 | '' | null
    }
    interface YESNO_K {
        YES: 1, NO: 0 | '' | null, K: string
    }

    interface PostStatus {
        K: string
        EDITING: number
        CHECKING: number
        PASS: number
        NICE: number
        DIE: -1
        OFF: number
    }

    interface ReviewStatus {
        K: string
        WAITING: number | null
        CHECKING: number
        YES: number
        NO: number
    }
}