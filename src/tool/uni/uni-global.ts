import { promise } from "../util/future";

// 设置 全局 数据
export const init_global_data = () => promise(() => {
  const data: ONE = {
      jwt: ''
  }

  const global: AnyObject | undefined = getApp().globalData
  if (global) {
    for (const k in data) { global[ k ] = data[ k ] }
    console.log('全局数据 =', getApp().globalData)
  }
  else {
    console.log('弹出全局变量失效错误')
  }
})
