
const gallery = [
        { id: 1, small: { 
            src: 'https://img0.baidu.com/it/u=2504315039,3318208704&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'http://img0.baidu.com/it/u=2492596547,2299390156&fm=253&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'http://img2.baidu.com/it/u=1158167041,2310724309&fm=253&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'https://img1.baidu.com/it/u=1223282809,3145925235&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'http://img2.baidu.com/it/u=1678849187,2137805148&fm=253&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'https://p4.itc.cn/images01/20200721/a096a7c1c4674df9b6465a0910855cd8.jpeg' 
        } },
        
        { id: 1, small: { 
            src: 'http://img1.baidu.com/it/u=1394775162,2498036351&fm=253&app=138&f=JPEG?w=800&h=1580' 
        } },
        { id: 1, small: { 
            src: 'https://pic.rmb.bdstatic.com/bjh/down/gEtsuNfRcJtja4-aFXoQTgad4a3712c3f191a1ad69c537c5a62806.jpg?for=bg' 
        } },
        { id: 1, small: { 
            src: 'http://img1.baidu.com/it/u=1649067096,2223616699&fm=253&app=138&f=JPEG?w=800&h=1580' 
        } },
        
        { id: 1, small: { 
            src: 'https://img2.baidu.com/it/u=2823943555,1805617349&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750' 
        } },
        { id: 1, small: { 
            src: 'https://img2.baidu.com/it/u=665651040,2266277270&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=888' 
        } },
        { id: 1, small: { 
            src: 'https://img2.baidu.com/it/u=1863627138,896847139&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067' 
        } },
]

export default {
    boy: 
        {
            user: {
                username: '赣州偷白丝', sex: 1, publisher: false,
                age: 27, description: '我喜欢白丝',
                avatar: 'https://img1.baidu.com/it/u=1375575021,2646597801&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
                background: 'https://img0.baidu.com/it/u=504475772,1940661508&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422'
            },
            token: 'aaa',
            company: { },
        },
    girl: 
        {
            user: {
                username: '一颗甜草莓', sex: 0, publisher: true,
                age: 19, description: '05 在校兼职',
                avatar: 'https://img1.baidu.com/it/u=4061479702,2220243516&fm=253&fmt=auto&app=138&f=PNG?w=380&h=380',
                background: 'https://img2.baidu.com/it/u=2633010137,1769504041&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1083'
            },
            token: 'aaa',
            company: { },
        },
    gallery: [
        ...gallery, ...gallery
    ]
}