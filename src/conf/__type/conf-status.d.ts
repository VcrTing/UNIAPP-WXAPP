
namespace Conf {
    interface YESNO {
        YES: 1, NO: 0 | string
    }
    interface YESNO_K {
        YES: 1, NO: 0 | string, K: string
    }

    interface PostStatus {
        K: string
        EDITING: number
        CHECKING: number
        PASS: number
        NICE: number
        DIE: -1
    }

    interface ReviewStatus {
        K: string
        WAITING: number | null
        YES: number
        NO: number
    }
}