
// 获取顶部安全区域高度
export const get_safe_area_top_h = () => {
    const sys = uni.getSystemInfoSync();
    const h = sys.statusBarHeight;
    return h;
}

// 选择图片
export const open_choise_img = async (count: number = 3) => {
    return await uni.chooseImage({
        count,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
    });

}