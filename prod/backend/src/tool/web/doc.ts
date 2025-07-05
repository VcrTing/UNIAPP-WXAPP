
export const ciick = (id: string) => {
    const dom = document.getElementById(id)
    if (dom) {
        dom.click()
    }
}

export const biur = (id: string) => {
    const dom = document.getElementById(id)
    if (dom) {
        dom.blur()
    }
}

export const has_document = (): boolean => {
    try {
        document.getElementById('a'); return true
    }
    catch(err) { } return false
}