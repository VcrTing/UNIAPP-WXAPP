

// true = 通过

export const vid_phone = (src: string) => {

    if (!src || src.length < 8 || src.length > 11) {
        return false
    }

    return true
}