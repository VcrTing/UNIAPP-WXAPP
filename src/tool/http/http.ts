import { FILE, MASTER, NET, NET_ENDPOINTS, NET_FUNCTION_GET_JWT, } from "@/conf/conf-net";
import Net from "./net";

// 主数据源
export const master = new Net(
    NET.MASTER.URI + '/' + NET.MASTER.API, 
    NET_ENDPOINTS[ MASTER ], 
    NET_FUNCTION_GET_JWT,
    NET.MASTER.TIMEOUT_GET, NET.MASTER.TIMEOUT_POS, NET.MASTER.IS_LOG
);

// 文件上传
export const file = new Net(
    NET.FILE.URI + '/' + NET.FILE.API, 
    NET_ENDPOINTS[ FILE ], 
    NET_FUNCTION_GET_JWT,
    NET.FILE.TIMEOUT_GET, NET.FILE.TIMEOUT_POS, NET.FILE.IS_LOG
);