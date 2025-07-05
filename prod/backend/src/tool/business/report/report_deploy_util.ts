import jsoner from "@/tool/util/jsoner"
import dynamic_pager_util from "../common/dynamic_pager_util"
import { is_nice_one } from "@/tool/util/valued"

const _EMPTY = {
    path: '',
    code: '',
    view: <MANY>[ ], 
    pager: dynamic_pager_util.def(),
    schemas: <ReportSchema[]>[ ],
}

const def = (code: string): ReportPageDeploy => (<ReportPageDeploy>{
    path: '',
    code,
    view: <MANY>[ ], 
    pager: dynamic_pager_util.def(),
    schemas: <ReportSchema[]>[ ],
})
 
const empty = (): ReportPageDeploy => jsoner.duplicate(_EMPTY)

const _STORAGE_PREFIX: string = 'REPORT_DATA_PAGE_'

// 先从活跃里拿，再从 内存里拿，无磁盘穿透
const __get_deploy = (state: ReportDataPageStore, code: string): ReportPageDeploy | undefined => {
    let deploy: ReportPageDeploy = state.deploys[ code ]
    if (is_nice_one(deploy)) return deploy;
    return state.deploys_stone [ code ]
}
// 是否存在
const __has_deploy = (deploys: REPORT_PAGE_DEPLOYS, deploy: ReportPageDeploy): boolean => is_nice_one( deploys[ deploy.code ] )

export default {
    def,
    empty,
    __get_deploy,
    __has_deploy,
}