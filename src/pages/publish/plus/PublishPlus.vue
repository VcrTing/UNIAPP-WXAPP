<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con pb-s'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">新增活动</view></template>
        </CoAppTopBackBar>
        <view class="">
            <VwPubPlusTopForm ref="top"/>
            <view class="py-s"></view>
            <VwPubPlusAddrForm ref="addr"/>
            <view class="py-s"></view>
            
            <view class="">
                <CoMoSecurityAgreeLine :canedit="true" ref="agree"/>
            </view>
            <CkSpace :h="12"/>
        </view>
        <CoAppBomCarBar :clazz="'bg-pag-pri'">
            <view class="px-row pt-x1 pb">
                <CoBomBtnGroup @submit="funn.submit" @cancle="funn.backwaiting()"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>
    </PageLayout>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomCarBar from '@/components/app/bar/bom/CoAppBomCarBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoMoSecurityAgreeLine from '@/components/modules/security/CoMoSecurityAgreeLine.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import { authGetters, orderDispatch, orderState, uiState } from '@/memory/global';
import server_pubplus from '@/server/publish/server_pubplus';
import pan_tooi from '@/tool/app/pan_tooi';
import media_tool from '@/tool/modules/media_tool';
import appRouter from '@/tool/uni/app-router';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { future } from '@/tool/util/future';
import { arrfind, arrgotv } from '@/tool/util/iodash';
import { must_one } from '@/tool/util/valued';
import VwPubSecurityPagPan from '@/view/publish/component/VwPubSecurityPagPan.vue';
import VwPubPlusAddrForm from '@/view/publish/plus/VwPubPlusAddrForm.vue';
import VwPubPlusTopForm from '@/view/publish/plus/VwPubPlusTopForm.vue';
import { reactive, ref } from 'vue';
const top = ref()
const addr = ref()
const money = ref()

const agree = ref()

const funn = {
    collection: () => {
        const tf = top.value.v()
        const ad = addr.value.v()
        // console.log('收集数据 =', tf, ad)
        if (tf == null || ad == null) return null;
        return {
            ...tf, ...ad
        }
    },
    buildform: (src: ONE = { }) => {
        const tgsid = arrgotv(src.tags, 'documentId')
        const userid: string = authGetters.userid
        const res = <ONE>{
            title: src.title,
            activity_tags: tgsid,
            typed: src.typed, 
            publisher: userid, dataStatus: 0,
            activity_address: must_one<ActivityAddress>(src.addrdata).documentId
        }
        return res
    },
    backwaiting: () => {
        appRouter.publish_waiting()
    },
    success: () => {
        appRouter.publish_waiting()
    },
    submit: () => future(async () => {
        const src = funn.collection()
        console.log('src =', src)
        if (src) {
            if (!agree.value.v()) return;
            const fom = funn.buildform(src)
            // console.log('form =', fom)
            const res = await server_pubplus.plus(fom)
            const acvdocid = must_one<Activity>(res).documentId || undefined
            if (acvdocid) {
                const linkms: ActivityMedia[ ] = src.__banner
                for (let j= 0; j< linkms.length; j++ ) {
                    const ms: ActivityMedia = media_tool.build_activity_plus_data(linkms[j], acvdocid);
                    const __res: ActivityMedia = await server_pubplus.plus_media(ms)
                    console.log('连接结果 =', __res)
                }
                // funn.success()
            }
            // console.log('res =', res)
            // uniRouter.navigatorpg('publish')
        }
    })
}

</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

            <!--
            <VwPubPlusMoneyForm ref="money"/>
            <view class="py-s"></view>
            -->