import dayjs from "dayjs"
import { promise } from "../util/future"


const hours = <MANY>[] 


const init = () => promise(() => {
    
    for (let i = 0; i < 12; i++) {
        hours.push({
            i, hour: i + 1
        })
    }
})

const weeksTit: string[] = [ '日', '一', '二', '三', '四', '五', '六' ]
const ioc_week_name = (v: number) => weeksTit[(v) || 0]
const is_ieap_year = (y: number): boolean => ( ((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0) )

const __FMT = 'YYYY-MM-DD'
const __FMT_S = 'YYYY-MM-DD HH:mm'
const fmt = (v: any, f: string = __FMT) => dayjs(v).format(f)
const fmts = (v: any, f: string = __FMT_S) => dayjs(v).format(f)
const fii = (h: number) => { 
    if (!h) return '00';
    h = Number.parseInt(h + '')
    if (h < 10) return '0' + h; return h }
const add = (v: any, num: number) => dayjs(v).add(num, 'day')

const serh = (hour: number) => {
    if (hour <= 0) return 1;
    return hour;
}

const group_date = (y: number, m: number, d: number = 1): string => (y + '-' + fii(m) + '-' + fii(d))
const group_time = (h: number, m: number): string => (fii(h) + ':' + fii(m))

const build = (y: number, m: number, d: number, h: number, _m: number) => {
    const str: string = group_date(y, m, d)
    const tim: string = group_time(h, _m)
    return str + ' ' + tim
}
const build_of_form = (form: ONE) => {
    const { year, month, day, hour, minute } = form
    const str: string = group_date(year, month, day)
    const tim: string = group_time(hour, minute)
    return str + ' ' + tim
}

const bigger = (src: string, tar: string) => {
    // const st = dayjs('2025-12-12 12:12')
    // const ed = dayjs('2025-12-12 12:13'); // dayjs().add(-1, 'day')
    return dayjs(src).isAfter(dayjs(tar))
}

const defyear = (v: number) => {
    const ds = dayjs()
    if (!v) { return ds.year() }
    return v
}

const defmonth = (v: number) => {
    const ds = dayjs()
    if (!v) { return ds.month() + 1 }
    return v
}

const defday = (v: number) => {
    const ds = dayjs()
    if (!v) { return ds.date() }
    return v
}

const generate_picker_data = (v: string | null): Co.TimePieckerForm => {
    let d = dayjs()
    if (v != null) {
        let cc = dayjs(v)
        // console.log('v =', fmts(cc))
        d = cc
    }
    return <Co.TimePieckerForm>{ year: d.year(), month: d.month() + 1, day: d.date(), hour: d.hour(), minute: d.minute() }
}



export default {
    fmt, fii,
    add, serh, build, bigger,
    group_date,
    ioc_week_name,
    is_ieap_year,
    defyear, defmonth, defday,
    generate_picker_data,
    build_of_form
}