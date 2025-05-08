import { reportDPDispatch } from "@/pages/report/_memory/report-page-deploy-store"
import { reportDWDispatch } from "@/pages/report/_memory/report-page-working-store"
import pan_tooi from "@/tool/app/pan_tooi"
import uniRouter from "@/tool/uni/uni-router"
import { promising } from "@/tool/util/future"
import { is_nice_arr, must_arr } from "@/tool/util/valued"

const REPORT_ROUTER_KEY = '/custom/report/'

// 判断是否是 报表页面
const is_report_router = (rt: string) => (rt && rt.indexOf(REPORT_ROUTER_KEY) >= 0)
// 根据 路由获取报表 code
const get_code_from_router = (rt: string): string | undefined => {
    const rts: string[] = rt.split('/')
    if (is_nice_arr(rts)) return rts[rts.length - 1]
}

// 跳转至报表页面
const go_report_page = async (path: string) => {
    const code: string | undefined = get_code_from_router(path)
    if (code) {
        // 根据 code 去获取 deploy
        // 取不到，就新增一个默认的，取不到只能说明，连磁盘里面都没有 deploy，生成一个代价小
        const deploy: ReportPageDeploy = await reportDPDispatch('init_deploy', code)

        // 将 其 加入到 活跃的 deploys 内
        await reportDPDispatch('set_deploy', deploy)

        // 刷新 identify
		await reportDWDispatch('change', [ 'identify', code ])

        // 关闭 pan
        pan_tooi.close_index_menu()

        // 准备完毕，跳转到页面
        uniRouter.navigatorpg('report')
    }
    else {
        console.log('报错：路由里没有该 CODE =', path)
    }
}


// 限制点击空隙时长
const TAB_SWITCH_FREEZE_TIME = 422
// 根据 report id 来切换 tab 准没错
const switch_schema_tab = (me:ONE, schemas: ReportSchema[] | undefined, report_id: SN) => promising(me, () => {
    must_arr(schemas).map((e: ReportSchema) => {
        if (e.id == report_id) {
            e.__tab_iive = true 
        } 
        else {
            e.__tab_iive = false
        }
    })
},
TAB_SWITCH_FREEZE_TIME)

export default {
    is_report_router,
    go_report_page,
    switch_schema_tab
}