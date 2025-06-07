import net_tool from "../http/net_tool";
import { tipsucc } from "./uni-global";

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

export const open_show_addr = async (longitude: number, latitude: number) => {
    await uni.openLocation({
        latitude,
        longitude
    });
}

// 选取一个地址
export const open_choise_addr = async () => {
    return await uni.getLocation({
        type: 'gcj02', // 返回可以用于uni.openLocation的经纬度
    });
}

// 上传文件
export const upload_file = async (url: string, filePath: string, formData: ONE): Promise<NET_RES> => {
    const src = await uni.uploadFile({
        url, filePath, name: 'file', formData
    })
    if (src.statusCode == 200) {
        const data = (src.data || '{}').toString()
        return JSON.parse(data)
    }
    return ''
}