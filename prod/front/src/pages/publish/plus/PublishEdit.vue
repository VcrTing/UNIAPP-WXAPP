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
            <view class="mxw-pc">
                <view class="pt-row"  v-if="documentId">
                    <WvPubEditTopForm ref="top" :documentId="documentId" :form="form" :canedit="canedit" />
                </view>
                <view class="py-s"></view>
                <view>
                    <WvPubEditDetailForm ref="detail" :form="form" :canedit="canedit"/>
                </view>

                <view v-if="aii.init && form.typed === DATA_PRODUCT_TYPED_SM.v" class="softer-x1">
                    <WvPubEditContent :v="edit" :canedit="canedit"/>
                </view>

                <view v-if="aii.init" class="softer-x1">
                    <view v-if="documentId">
                        <view class="py-s"></view>
                        <view class="softer-x2"><WvPubEditDescForm  ref="gallery" :documentId="documentId" :form="form" :canedit="canedit"/></view>
                        <view class="py-s"></view>
                        <view class="softer-x2"><WvPubEditStatus :aii="aii" :form="form" :canedit="canedit"  :documentId="documentId"/></view>
                    </view>
                </view>
            </view>
            <view class="py-row softer-x2" v-if="aii.init_long">
                <CoMoSecurityAgreeLine ref="agree" :canedit="canedit"/>
            </view>
            <view class="mxw-pc">
                <view v-if="aii.init" class="softer-x1">
                    <CkSpace :h="12"/>
                    <CoAppBomFuncBar :clazz="'bg-pag-pri softer-x2'" v-if="aii.init_long">
                        <view class="py mxw-pc" :class="ispc ? '' : 'px-row'">
                            <view class="fx-s" v-if="canedit">
                                <view class="w-25 pr-row">
                                    <OButton color="def" :weak="true" clazz="btn-app" @tap="uniRouter.back">
                                        返回
                                    </OButton>
                                </view>
                                <view class="w-333 pr-row">
                                    <OButton color="pri" :weak="true" clazz="btn-app" @tap="func.submit(false)">
                                        保存数据
                                    </OButton>
                                </view>
                                <view class="fx-1">
                                    <OButton color="sec" :ioading="aii.ioading" clazz="mh-btn" @tap="func.submit(true)">
                                        提交审核
                                    </OButton>
                                </view>
                            </view>
                            <OButton v-else color="def" @tap="appRouter.publish_waiting()"><view class="py-t tis">返回</view></OButton>
                        </view>
                    </CoAppBomFuncBar>
                </view>
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
import { DATA_PUBLISH_MEDIA, DATA_PUBLISH_LIMIT, DATA_PRODUCT_TYPED_SM, DATA_PRODUCT_TYPED_INV_INFINI } from '@/conf/conf-datas';
import { STS_PRODUCT } from '@/conf/conf-status';
import { authGetters, uiGetters, uiState } from '@/memory/global';
import { pagePublishState } from '@/memory/page';
import server_pubplus from '@/server/publish/server_pubplus';
import server_user_statistic from '@/server/user/user/server_user_statistic';
import media_tool from '@/tool/modules/common/media_tool';
import product_tool from '@/tool/modules/product_tool';
import appRouter from '@/tool/uni/app-router';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { future, futuring, timeout } from '@/tool/util/future';
import { deepcopy, formfii, is_nice_arr, must_one } from '@/tool/util/valued';
import VwPubEditTopMsg from '@/view/publish/edit/VwPubEditTopMsg.vue';
import WvPubEditContent from '@/wave/publish/content/WvPubEditContent.vue';
import WvPubEditDescForm from '@/wave/publish/edit/WvPubEditDescForm.vue';
import WvPubEditDetailForm from '@/wave/publish/edit/WvPubEditDetailForm.vue';
import WvPubEditStatus from '@/wave/publish/edit/WvPubEditStatus.vue';
import WvPubEditTopForm from '@/wave/publish/edit/WvPubEditTopForm.vue';
import { computed, nextTick, reactive, ref } from 'vue';

const top = ref()
const detail = ref()
const gallery = ref()

const agree = ref()

const aii = reactive({ ioading: false, contents: <ProductContent[]>[], 
    init: false, init_long: false,
    imit_banner: DATA_PUBLISH_MEDIA.BANNER_LESS, imit_gallery: DATA_PUBLISH_MEDIA.GALLERY_LESS })

const funn = {
    reset_content: (src: ProductContent) => {
        if (src.content) {
            form.introduction = src.content
        }
    },
    // 入口时重置表单
    reset: (src: Product) => {
        console.log('执行值替换 src =', src)
        if (src) {
            formfii(form, src);
            form.taglimit = DATA_PUBLISH_LIMIT.TAG
            form.tags = src.tags
            form.banner = media_tool.convert_upload_imgs(product_tool.getbanner(src))
            form.gallery = media_tool.convert_upload_imgs(product_tool.getgallery(src))
            // form.__start = times.generate_picker_data(src.startTime)
            // form.__end = times.generate_picker_data(src.endTime)
            // address_tool.fii_to_form(form, src.activity_address)
            // form.priceFirst = (src.priceFirst === null) ? (src.price === null ? 0 : src.price) : src.priceFirst
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

        const gss: Form.UploadImages = gallery.value.vimg()
        console.log('gss =', gss)
        if (gss.length < aii.imit_gallery) {
            tipwarn('请尝试上传 ' + aii.imit_gallery + ' 张相册图片，以作详情展示，提升吸引力。')
            return false
        }

        return true
        
    },
    // 构建返回结果
    buildform: (src: ONE = { }): ONE => {
        const res: ONE = deepcopy(src)
        // res['startTime'] = times.build_of_form(form.__start)
        // res['endTime'] = times.build_of_form(form.__end)
        /*
        res['activity_medias'] = media_tool.group_medias_ids(media_tool.group_publish_medias(
            top.value.vimg(), gallery.value.vimg()
        ))
        */
        return product_tool.build_edit_data(res)
    }
}

const func = {
    success: async (src: ONE) => {
        try {
            // 新增、修改 content
            // await server_content.plus_or_edit(edit.value, aii.contents[0], '', src['introduction'])
            // 加一个 publish 值
            await server_user_statistic.num_publish()
        }
        finally {
            appRouter.publish_waiting()
        }
    },
    submit: (check: boolean = false) => futuring(aii, async () => {
        if (!funn.collection()) return;
        if (!agree.value.v()) return;
        const src: ONE = funn.buildform(form);
        //
        if (check) {
            src[STS_PRODUCT.REVIEW.K] = STS_PRODUCT.REVIEW.CHECKING // 送审
            src[STS_PRODUCT.STATUS.K] = STS_PRODUCT.STATUS.CHECKING // 不可编辑状态
        }
        else {
            src[STS_PRODUCT.REVIEW.K] = STS_PRODUCT.REVIEW.WAITING // 送审
            src[STS_PRODUCT.STATUS.K] = STS_PRODUCT.STATUS.EDITING // 不可编辑状态
        }

        src[STS_PRODUCT.RECOMMEND.K] = STS_PRODUCT.RECOMMEND.YES // 自动推荐
        const res: ONE = await server_pubplus.edit(src, edit.value)

        if (check) {
            if (res.documentId) {
                await func.success(src)
            }
        }
    }),
    cancle: () => {
        uniRouter.back()
    },
    
    ioad_contents: () => futuring(aii, async () => {
        const nss: ProductContent[] = []; // await server_content.by_activity(edit.value);
        if (is_nice_arr(nss)) {
            aii.contents = nss || [ ]; funn.reset_content(nss[0])
        }
    }),
    init: () => future(async () => {
        const v: Product = must_one(edit.value)
        console.log('v =', v)
        if (v.documentId) {
            funn.reset(v)
            await func.ioad_contents()
            timeout(() => (aii.init = true), 200)
            timeout(() => aii.init_long = true, 800)
        }
        else {
            appRouter.publish_waiting()
        }
    })
}

const form = reactive({
    title: '', typed: DATA_PRODUCT_TYPED_SM.v, // addrdata: null,
    tags: <Tag[]>[ ], taglimit: DATA_PUBLISH_LIMIT.TAG, introduction: '',
    inv: null, invTyped: DATA_PRODUCT_TYPED_INV_INFINI.v,
    price: null, priceFirst: null, 
    banner: <Form.UploadImages>[ ], gallery: <Form.UploadImages>[ ]
        
    // longitude: null, latitude: null, address: null, city: null, area: null,
    // endJoinTime: new Date(), participantLimit: DATA_PUBLISH_LIMIT.JOINER,
    // __start: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    // __end: <Co.TimePieckerForm>{ year: 0, month: 0, day: 0, hour: 0, minute: 0 },
})

const edit = computed((): Product => (pagePublishState.edit))
const documentId = computed((): string => edit.value.documentId)

const canedit = computed((): boolean => {
    const sts: number = edit.value.dataStatus
    if (!sts) { return true }
    return false
})

nextTick(func.init)
const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
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