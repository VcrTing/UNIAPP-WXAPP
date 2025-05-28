

const generate = () => {
    return {
            id: 2, createTime: '2025-05-12 12:12', joinTime: '2025年06月12日',
            title: '龙华大浪私人丝袜教练', description: '希望今晚有空的小伙伴，一起来私人台球~',
            publisher: {
                name: '龙华馨妍 - 06在校兼职', sex: 0, age: 19,
                avatar: 'https://ww1.sinaimg.cn/mw690/006qPsGegy1huip1ofmukj30u00u2goo.jpg',
                usely: [
                    { txt: 'JK', id: '1' }, { txt: '大长腿', id: '2' }, { txt: '身材好', id: '3' }
                ],
            },
            banner: 'https://q9.itc.cn/images01/20250509/8d9e7fe30ed0466d856c7c4fd8181ffb.jpeg',
            gallery: [
                { id: 1, src: 'https://img0.baidu.com/it/u=2504315039,3318208704&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1580' },
                { id: 2, src: 'http://img0.baidu.com/it/u=2492596547,2299390156&fm=253&app=138&f=JPEG?w=800&h=1580' },
                { id: 3, src: 'http://img2.baidu.com/it/u=1158167041,2310724309&fm=253&app=138&f=JPEG?w=800&h=1580' },
            ],
            tags: [
                { txt: '黑长直', id: 1 }, { txt: '裸腿', id: 2 },
                { txt: '超短裙', id: 3 }, { txt: '大长腿', id: 4 },
                { txt: '室内台球', id: 5 }, { txt: '私人台球', id: 6 },
            ],
            timed: { 
                start: '2025-05-05 09:00', startText: '周六 09:00',
            },
            addr: {
                address: '龙华大浪浪静路蓝天公寓', jd: 1088.01002, wd: 227.00921, city: '深圳市'
            },
            assistant: [
                { price: 300, name: '豪华套餐一', description: '基础 + 制服诱惑' },
                { price: 500, name: '豪华套餐二', description: '基础 + 制服诱惑 + 牵手 + 原味' },
                { price: 700, name: '豪华套餐三', description: '基础 + 制服诱惑 + 牵手 + 原味 + 福雾一次' }
            ]
        }
}

export default {
    items: [
        {
            id: 1, createTime: '2025-05-12 12:12', joinTime: '2025年12月04日',
            title: '龙华大浪台球聚会', description: '希望今晚有空的小伙伴，一起来私人台球~',
            publisher: {
                name: '一只晓雪琪', sex: 0, age: 19,
                avatar: 'https://wx3.sinaimg.cn/mw690/c5470a45ly1hy1cykqwv1j20sg0sg77b.jpg',
                usely: [
                    { txt: 'JK', id: '1' }, { txt: '技术一流', id: '2' }
                ],
            },
            banner: 'https://q9.itc.cn/images01/20250509/8d9e7fe30ed0466d856c7c4fd8181ffb.jpeg',
            tags: [
                { txt: '黑长直', id: 1 }, { txt: '裸腿', id: 2 },
                { txt: '超短裙', id: 3 }, { txt: '大长腿', id: 4 },
                { txt: '室内台球', id: 5 }, { txt: '私人台球', id: 6 },
            ],
            timed: { 
                start: '2025-05-05 09:00', startText: '周六 09:00',
            },
            addr: {
                address: '龙华大浪浪静路蓝天公寓', jd: 1088.01002, wd: 227.00921, city: '深圳市'
            },
            assistant: [
                { price: 300, name: '豪华套餐一', description: '基础 + 制服诱惑' },
                { price: 500, name: '豪华套餐二', description: '基础 + 制服诱惑 + 牵手 + 原味' },
                { price: 700, name: '豪华套餐三', description: '基础 + 制服诱惑 + 牵手 + 原味 + 福雾一次' }
            ]
        },
        
        generate(), generate(), generate(), generate()
        
    ],
    mapimg: 'https://img0.baidu.com/it/u=1547550957,1686383075&fm=253&fmt=auto&app=138&f=JPEG?w=715&h=482',
    content: [
        { txt: '20 基础报名费' },
        { txt: '300 基础报名费 + 制服诱惑' },
        { txt: '500 基础报名费 + 制服诱惑 + 牵手 + 原味' },
        { txt: '700 基础报名费 + 制服诱惑 + 牵手 + 原味 + 福雾一次' },
    ],
    banner: {
        src: 'https://q9.itc.cn/images01/20250509/8d9e7fe30ed0466d856c7c4fd8181ffb.jpeg'
    }
}