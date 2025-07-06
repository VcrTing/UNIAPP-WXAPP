<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con pb-s'" @back="uniRouter.back" :mat="true">
            <template #tit><view class="header ta-c">新增</view></template>
        </CoAppTopBackBar>
        <view class="pt-row">
            <WvPubPlusTopForm ref="top"/>
            <view class="py-s"></view>
            <WvPubPlusDetailForm ref="detail"/>
            <view class="py-s"></view>
            <view>
                <WvPubPlusDescForm ref="desc"/>
            </view>
            <CkSpace :h="16"/>
        </view>
        <CoAppBomCarBar :clazz="'bg-pag-pri'">
            <view class="px-row pt-x1 pb">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back" :ioading="aii.ioading"></CoBomBtnGroup>
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
import { STS_PRODUCT } from '@/conf/conf-status';
import { authGetters, uiState } from '@/memory/global';
import server_pubplus from '@/server/publish/server_pubplus';
import media_tool from '@/tool/modules/common/media_tool';
import product_tool from '@/tool/modules/product_tool';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import { arrgotv } from '@/tool/util/iodash';
import { must_int, must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import WvPubPlusDescForm from '@/wave/publish/plus/WvPubPlusDescForm.vue';
import WvPubPlusDetailForm from '@/wave/publish/plus/WvPubPlusDetailForm.vue';
import WvPubPlusTopForm from '@/wave/publish/plus/WvPubPlusTopForm.vue';
import { reactive, ref } from 'vue';
const top = ref()
const detail = ref()
const desc = ref()

const agree = ref()

const aii = reactive({ ioading: false })

const funn = {
    collection: () => {
        const tf = top.value.v()
        const dt = detail.value.v()
        const ds = desc.value.v()
        console.log('收集数据 =', tf, dt, ds)
        if (tf == null || dt == null || ds == null) return null;
        return {
            ...tf, ...dt, ...ds
        }
    },
    buildform: (src: ONE = { }) => {
        const tgsid = arrgotv(src.tags, 'documentId')
        const userid: number = authGetters.userid
        // const addr: Address = must_one<Address>(src.addrdata)
        const res = <ONE>{
            title: src.title, tags: tgsid, price: src.price,
            typed: src.typed, inv: src.inv, invTyped: src.inv_typed,
            user: must_int(userid), // activity_address: addr.documentId,
        }
        // 初始化状态
        res[STS_PRODUCT.STATUS.K] = STS_PRODUCT.STATUS.EDITING
        res[STS_PRODUCT.REVIEW.K] = STS_PRODUCT.REVIEW.WAITING
        // 构建搜索
        // res['startTime'] = times.build_of_form(src.__start)
        // res['endTime'] = times.build_of_form(src.__end)
        res['search'] = product_tool.group_search_field(res, src.tags)
        return res
    },
    backwaiting: () => {
        appRouter.publish_waiting()
    },
    success: () => {
        appRouter.publish_waiting()
    },
    submit: () => futuring(aii, async () => {
        const src = funn.collection()
        // console.log('src =', src)
        if (src) {
            // if (!agree.value.v()) return;
            const fom = funn.buildform(src)
            console.log('form =', fom)
            const res = await server_pubplus.plus(fom)
            const resid = must_one<Product>(res).documentId || undefined
            if (resid) {
                const brs: Media[ ] = src.__banner
                const grs: Media[ ] = src.__medias
                const linkms: Media[ ] = [ ...brs, ...grs ]
                //
                for (let j= 0; j< linkms.length; j++ ) {
                    const ms: Media = media_tool.build_plus_data(linkms[j], resid);
                    const __res: Media = await server_pubplus.plus_media(ms)
                    // console.log('连接结果 =', __res)
                }
                funn.success()
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