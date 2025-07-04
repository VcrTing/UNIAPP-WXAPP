import { acyReFresh } from "@/memory/global"
import server_activity from "../activity/server_activity"
import server_invite from "../activity/server_invite"
import uniRouter from "@/tool/uni/uni-router"

const view = async (one: Activity) => {
    const docid: string = one.documentId || ''
    if (docid) {
        const activity: Activity = await server_activity.byid(docid)
        const invites: ActivityInvite[] = await server_invite.byactivity(docid)
        activity.activity_invites = invites
        acyReFresh('view', activity);
        uniRouter.gopg('activity_detail');
    }
}

export default {
    view
}