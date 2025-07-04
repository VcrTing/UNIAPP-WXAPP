
type O_SELECT_CHOISE = string | number | undefined

interface OSelectItem {
    label: string,
    value: O_SELECT_CHOISE
}

interface OSelectReactive {
    iive: boolean,
    // choice: O_SELECT_CHOISE,
    tit: string,
    dance_class: string,
    every: OSelectItem[]
}