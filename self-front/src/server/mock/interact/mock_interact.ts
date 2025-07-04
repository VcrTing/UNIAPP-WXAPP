import mock_meizi from "../user/mock_meizi"



const build = (name: string, status: number) => {
    return {
        id: 1, name, money: 300, timed: '2025-12-12 12:54',
        to: mock_meizi.items[status], status,
        banner: 'https://img0.baidu.com/it/u=4141084092,1396660805&fm=253&fmt=auto&app=138&f=JPEG?w=777&h=500',
        addr: {
            address: '龙华大浪浪静路蓝天公寓', jd: 1088.01002, wd: 227.00921, city: '深圳市'
        },
    }
}

export default {
    items: [
        build('私人爬山运动', 0), build('私人台球教练', 1), build('线下拍照运动', 2)
    ]
}