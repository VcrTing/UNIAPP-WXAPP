
export const get_safe_area_top_h = () => {
    const sys = uni.getSystemInfoSync();
    const h = sys.statusBarHeight;
    return h;
}