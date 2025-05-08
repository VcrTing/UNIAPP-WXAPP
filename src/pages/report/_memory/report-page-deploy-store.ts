
import report_deploy_util from '@/tool/business/report/report_deploy_util';
import report_schemas_util from '@/tool/business/report/report_schemas_util';
import { is_nice_one, must_arr } from '@/tool/util/valued';
import { Store, createStore } from 'vuex';

const _reportDataPageStore: Store<ReportDataPageDeployStore> = createStore({
    
    state: <ReportDataPageDeployStore> {
        // 磁盘获取到的 历史报表
        deploys_stone: <REPORT_PAGE_DEPLOYS>{ },

        // 活跃的缓存报表
        deploys: <REPORT_PAGE_DEPLOYS>{ },

        // 当前启用的报表
        code: '',

        // 结构存储，这个才是 report table 的核心
        // 是 code : schema[] 的结构
        schemas: <REPORT_SCHEMAS>{ },

        // 缓存数据，通常用于初始化页面加载还原数据作用
        caches: <REPORT_DATA_TABLE_CACHES>{ }
    },
    getters: {
        
    },
    mutations: {
        change: (s: ONE, v: ANYS) => s[ v[0] ] = v[1]
    },
    actions: {
        change: (c: ONE, v: ANYS) => c.state[ v[0] ] = v[1],
 
        get_deploy: (c: ONE, code: string): ReportPageDeploy | undefined => report_deploy_util.__get_deploy(c.state, code),

        set_deploy: (c: ONE, deploy: ReportPageDeploy) => {
            // if (!__has_deploy(c.state.deploys, deploy)) { c.state.deploys[ deploy.code ] = deploy }
            c.state.deploys[ deploy.code ] = deploy
            c.state.deploys_stone[ deploy.code ] = deploy
        },
        init_deploy: (c: ONE, code: string) => {
            // 先从 内存 内获取
            let res: ReportPageDeploy | undefined = report_deploy_util.__get_deploy(c.state, code)
            if (is_nice_one(res)) return res;
            // 这里说明，任何内存里都没有 Deploy，那就生产一个
            res = report_deploy_util.def(code)
            return res
        },

        // 完成初始化
        async_schema: ({ state }, schemas: ReportSchema[]) => {
            let code: string = ''
            must_arr(schemas).map((e: ReportSchema) => {
                code = e.code
            })
            report_schemas_util.save_schemas(state, code, schemas)
        },
        
        // 存入 结构
        save_schema: ({ state }, v: ANYS): boolean => report_schemas_util.save_schemas(state, v[0], v[1]),
        // 取出 结构
        get_schema: ({ state }, code: string | undefined): ReportSchema[] | undefined => report_schemas_util.get_schema(state, code),
        // 首次加载页面，对于结构的获取操作
        init_schema: async ({ state }, code: string | undefined): Promise<ReportSchema[] | undefined> => await report_schemas_util.init_schemas(state, code)
    }
})

export const reportDPState: ReportDataPageDeployStore = _reportDataPageStore.state
export const reportDPDispatch = _reportDataPageStore.dispatch