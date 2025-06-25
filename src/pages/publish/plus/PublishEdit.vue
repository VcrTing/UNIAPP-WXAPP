<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'pb-s bg-con'" @back="uniRouter.back" :mat="true">
            <template #tit><view class="header ta-c">
                <text v-if="canedit">修改</text>
                <text v-else>无法修改</text>
            </view></template>
        </CoAppTopBackBar>
        <view class="">
            <VwPubEditTopMsg />
            <view class="pt-row"  v-if="documentId">
                <VwPubEditTopForm ref="top" :documentId="documentId" :form="form" :canedit="canedit"/>
            </view>
            <view class="py-s"></view>
            <view>
                <VwPubEditCateForm ref="cate" :form="form" :canedit="canedit"/>
            </view>

            <view v-if="aii.init" class="softer">
                <view v-if="documentId">
                    <view class="py-s"></view>
                    <view><VwPubEditGallery  ref="gallery" :documentId="documentId" :form="form" :canedit="canedit"/></view>
                    <view class="py-s"></view>
                    <view><VwPubEditStatus :aii="aii" :form="form" :canedit="canedit"  :documentId="documentId"/></view>
                </view>
                <view class="py-row">
                    <CoMoSecurityAgreeLine ref="agree" :canedit="canedit"/>
                </view>
                <CkSpace :h="12"/>
                <CoAppBomFuncBar :clazz="'bg-pag-pri softer'">
                    <view class="py px-row">
                        <OButton :ioading="aii.ioading" v-if="canedit" clazz="" @tap="func.submit"><view class="py-t">提交审核</view></OButton>
                        <OButton v-else color="def" @tap="appRouter.publish_waiting()"><view class="py-t tis">返回</view></OButton>
                    </view>
                </CoAppBomFuncBar>
            </view>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppBomFuncBar from '@/components/app/bar/bom/CoAppBomFuncBar.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoMoSecurityAgreeLine from '@/components/modules/security/CoMoSecurityAgreeLine.vue';
import { DATA_ACTIVITY_MEDIA, DATA_ACTIVITY_TYPED_GK, DATA_ACTIVITY_TYPED_SM, DATA_PUBLISH_LIMIT } from '@/conf/conf-datas';
import { uiState } from '@/memory/global';
import { pagePublishState } from '@/memory/page';
import server_content from '@/server/activity/server_content';
import server_pubplus from '@/server/publish/server_pubplus';
import server_user_statistic from '@/server/user/user/server_user_statistic';
import activity_tool from '@/tool/modules/activity_tool';
import address_tool from '@/tool/modules/common/address_tool';
import media_tool from '@/tool/modules/common/media_tool';
import appRouter from '@/tool/uni/app-router';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { future, futuring, promise, timeout } from '@/tool/util/future';
import { deepcopy, formfii, is_nice_arr, must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import VwPubEditCateForm from '@/view/publish/edit/VwPubEditCateForm.vue';
import VwPubEditGallery from '@/view/publish/edit/VwPubEditGallery.vue';
import VwPubEditStatus from '@/view/publish/edit/VwPubEditStatus.vue';
import VwPubEditTopForm from '@/view/publish/edit/VwPubEditTopForm.vue';
import VwPubEditTopMsg from '@/view/publish/edit/VwPubEditTopMsg.vue';
import { computed, nextTick, reactive, ref } from 'vue';

const top = ref()
const cate = ref()
const gallery = ref()

const agree = ref()

const aii = reactive({ ioading: false, contents: <ProductContent[]>[], init: false,
    imit_banner: DATA_ACTIVITY_MEDIA.BANNER_LESS, imit_gallery: DATA_ACTIVITY_MEDIA.GALLERY_LESS })

const funn = {
    reset_content: (src: ProductContent) => {
        if (src.content) {
            form.introduction = src.content
        }
    },
    // 入口时重置表单
    reset: (src: Activity) => {
        // console.log('执行值替换 src =', src)
        if (src) {
            formfii(form, src);
            form.taglimit = DATA_PUBLISH_LIMIT.TAG
            form.__start = times.generate_picker_data(src.startTime)
            form.__end = times.generate_picker_data(src.endTime)
            form.tags = src.activity_tags
            form.banner = media_tool.convert_upload_imgs(activity_tool.getbanner(src))
            form.gallery = media_tool.convert_upload_imgs(activity_tool.getgallery(src))
            address_tool.fii_to_form(form, src.activity_address)
        }
    },
    // 收集数据
    collection: () => {
        const src = form;

        const bns: Form.UploadImages = top.value.vimg()
        if (bns.length < aii.imit_banner) {
            tipwarn('必须要有 ' + aii.imit_banner + ' 张吸引人的宣传图。')
            return false
        }

        if (!src.title || src.title.length < 4) {
            tipwarn('请输入4个字以上的活动标题。')
            return false
        }

        if (!is_nice_arr(src.tags)) {
            tipwarn('至少选择一个活动标签。')
            return false
        }

        const st: string = times.build_of_form(form.__start)
        const ed: string = times.build_of_form(form.__end)
        if (times.bigger(st, ed)) {
            tipwarn('结束时间不能大于开始时间。')
            return false
        }

        if (!form.address) {
            tipwarn('请选择活动地址。')
            return false
        }

        const gss: Form.UploadImages = gallery.value.vimg()
        if (gss.length < aii.imit_gallery) {
            tipwarn('请尝试上传 ' + aii.imit_gallery + ' 张相册图片，以作详情展示，提升吸引力。')
            return false
        }

        return true
        
    },
    // 构建返回结果
    buildform: (src: ONE = { }): ONE => {
        const res: ONE = deepcopy(src)
        res['startTime'] = times.build_of_form(form.__start)
        res['endTime'] = times.build_of_form(form.__end)
        /*
        res['activity_medias'] = media_tool.group_medias_ids(media_tool.group_publish_medias(
            top.value.vimg(), gallery.value.vimg()
        ))
        */
        return activity_tool.build_edit_data(res)
    }
}

const func = {
    success: async (src: ONE) => {
        try {
            // 新增、修改 content
            await server_content.plus_or_edit(edit.value, aii.contents[0], '', src['introduction'])
            // 加一个 publish 值
            await server_user_statistic.num_publish()
        }
        finally {
            appRouter.publish_waiting()
        }
    },
    submit: () => futuring(aii, async () => {
        if (!funn.collection()) return;
        if (!agree.value.v()) return;
        const src: ONE = funn.buildform(form);
        src['dataStatus'] = 1 // 不可编辑状态
        src['isRecommended'] = 1 // 自动推荐
        src['reviewStatus'] = 0 // 送审
        const res: ONE = await server_pubplus.edit(src, edit.value)
        if (res.documentId) {
            await func.success(src)
        }
    }),
    cancle: () => {
        uniRouter.back()
    },
    
    ioad_contents: () => futuring(aii, async () => {
        const nss: ProductContent[] = await server_content.by_activity(edit.value);
        if (is_nice_arr(nss)) {
            aii.contents = nss || [ ]; funn.reset_content(nss[0])
        }
    }),
    init: () => future(async () => {
        const v: Activity = must_one(edit.value)
        // console.log('v =', v)
        if (v.documentId) {
            funn.reset(v)
            await func.ioad_contents()
            timeout(() => (aii.init = true))
        }
        else {
            appRouter.publish_waiting()
        }
    })
}

const form = reactive({
    title: '', typed: DATA_ACTIVITY_TYPED_GK.v, addrdata: null,
    tags: <Tag[]>[ ], taglimit: DATA_PUBLISH_LIMIT.TAG, fee: null, introduction: '',
    longitude: null, latitude: null, address: null, city: null, area: null,
    endJoinTime: new Date(), participantLimit: DATA_PUBLISH_LIMIT.JOINER,
    __start: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    __end: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    banner: <Form.UploadImages>[ ], gallery: <Form.UploadImages>[ ]
})

const edit = computed((): Activity => (pagePublishState.edit))
const documentId = computed((): string => edit.value.documentId)

const canedit = computed((): boolean => {
    const sts: number = edit.value.dataStatus
    if (!sts) { return true }
    return false
})

nextTick(func.init)
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

<!--
            <view><VwPubEditJoiner :form="form"/></view>
            <view class="py-s"></view>
            -->
                <!--
                <view v-if="form.typed == DATA_ACTIVITY_TYPED_SM.v" class="py px-inp bg-con">
                    <view class="pi card tid fs-s">
                        <view>非公开类型活动，是指不会被展示在首页、不会被他人搜索到的，只属于个人的活动。</view>
                        <view>不过，您可以主动邀请别人，来参与您发布后的活动。</view>
                    </view>
                </view>
                -->