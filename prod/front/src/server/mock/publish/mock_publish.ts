import mock_meizi from "../user/mock_meizi"
import mock_user from "../user/mock_user"



const buildPublish = (
    banner = 'https://img0.baidu.com/it/u=1184689594,1203965572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667', 
    status = 2
) => {
    return {
        id: '', limit: 1, title: '龙华壹方城约会 —— 牵手约会', 
        description: '嗨喽，小哥哥，想约会吗？牵手约会，制服可选',
        tags: [
            { txt: '黑长直', id: 1 }, { txt: '约会', id: 2 },
            { txt: 'JK', id: 3 }, { txt: '黑丝', id: 4 },
        ],
        banner: { src: banner },
        timed: { 
            start: '2025-05-05 09:00', startText: '周六 09:00',
        },
        addr: {
            address: '龙华大浪浪静路蓝天公寓', jd: 1088.01002, wd: 227.00921, city: '深圳市'
        },
        publisher: mock_meizi.items[2],
        assistant: [
            { price: 300, name: '豪华套餐一', description: '基础 + 制服诱惑' },
            { price: 500, name: '豪华套餐二', description: '基础 + 制服诱惑 + 牵手 + 原味' },
            { price: 700, name: '豪华套餐三', description: '基础 + 制服诱惑 + 牵手 + 原味 + 福雾一次' }
        ],
        status, money: { price: 300 },
        boys: [ mock_user.boy ]
    }
}

export default {
    now: [
        buildPublish('https://image-cdn.poizon.com/app/2022/community/1748050262_byte421368byte_2ac11425ac458070c351869d4fbc1d0a_iOS_w1242h1656.jpg')
    ],
    history: [
        buildPublish(),
        buildPublish('https://img1.baidu.com/it/u=1442008846,1257088227&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200', -1)
    ]
}