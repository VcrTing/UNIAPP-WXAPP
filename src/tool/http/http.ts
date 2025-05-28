import { COMPANY, MASTER, NET_ENDPOINTS, NET_FUNCTION_GET_JWT, NET_IS_LOG, NET_TIMEOUT_GET, NET_TIMEOUT_POS } from "@/conf/conf-net";
import { NET_URI_MASTER, NET_URI_MASTER_API } from "@/conf/conf-net";
import { NET_URI_COMPANY, NET_URI_COMPANY_API } from "@/conf/conf-net";
import Net from "./net";

// 主数据源
const master = new Net(

    NET_URI_MASTER + '/' + NET_URI_MASTER_API, 

    NET_ENDPOINTS[ MASTER ], 
    NET_FUNCTION_GET_JWT,

    NET_TIMEOUT_GET, NET_TIMEOUT_POS, NET_IS_LOG
);


// 公司数据源
const company = new Net(

    NET_URI_COMPANY + '/' + NET_URI_COMPANY_API, 

    NET_ENDPOINTS[ COMPANY ], 
    NET_FUNCTION_GET_JWT,

    NET_TIMEOUT_GET, NET_TIMEOUT_POS, NET_IS_LOG
);

export default {
    master,
    company
}