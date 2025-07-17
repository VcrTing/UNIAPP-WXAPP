<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :idx="idx" :orientation="'b'">
                <view class="">
                    <view class="softer">
                        <view class="h7 py px-inp"><text>内容</text></view>
                        <view class="py">
                            <textarea class="inp-app fx-aii-btn-def py-s" v-model="edit.content" placeholder="请输入内容，可以以句号隔开每个内容。"/>
                        </view>
                    </view>
                    <view class="softer-x1">
                        <view class="h7 py px-inp"><text>详情图片</text></view>
                        <view class="">
                            <OScrollX>
                                <view class="px-inp">
                                    <view class="row py">
                                        <view class="d-ib ps-r zi-t mb-s" v-for="(v, i) in view" :key="i"
                                                        :class="ispc ? 'w-20 ' : 'w-333'"
                                        >
                                            <view class="w-100 px-s fx-c abs-b i-0"
                                                        :class="ispc ? 'h-20vh ' : 'h-12vh'"
                                                        >
                                                <CoImg clazz="h-100 w-100 br" :src="v.path"/>
                                                <view class="abs-b r-0 zi-n pr-s">
                                                    <view @tap="funn.trashImg(v)" class="px-s py-s bg-028 br-ti br-br">
                                                        <UiI i='trash' clazz="c-fff op-618"/>
                                                    </view>
                                                </view>
                                            </view>
                                        </view>
                                        <view class="d-ib px-s bs-bb mb-s"
                                                        :class="ispc ? 'w-20 ' : 'w-333'">
                                            <view class="w-100 h-100 ps-r zi-t"
                                                        :class="ispc ? 'h-20vh ' : 'h-12vh'"
                                                        >
                                                <OButton color="def" @tap="funn.choseImg" clazz="w-100 h-100 abs-b i-0 br fx-c" :weak="true">
                                                    <view class="fs-n tiw">
                                                        <UiI :clazz="'d-ib'" :i="'+'"/>
                                                        <text class="px-s">添加优质</text>
                                                        <view>图片更吸引人</view>
                                                    </view>
                                                </OButton>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </OScrollX>
                        </view>
                    </view>
                    <CkSpace :h="4" />
                    <view class="py softer-x2">
                        <view class="px-row">
                            <view><OButton @tap="emt('cancle')" color="def" clazz="btn-app">关闭</OButton> </view>
                            <view class="py-n"></view>
                            <view><OButton :ioading="ioading" @tap="emt('submit', edit)" color="pri" clazz="btn-app">
                                提交修改
                            </OButton> </view>
                        </view>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_PUBLISH_MEDIA } from '@/conf/conf-datas';
import { uiGetters } from '@/memory/global';
import server_upload_media from '@/server/media/server_upload_media';
import server_content from '@/server/product/server_content';
import media_tool from '@/tool/modules/common/media_tool';
import { open_choise_img } from '@/tool/uni/uni-app';
import { tipsucc, tipwarn } from '@/tool/uni/uni-global';
import { futuring, timeout } from '@/tool/util/future';
import { arrfindi } from '@/tool/util/iodash';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    edit: ProductContent, idx: number,
    ioading: boolean
}>()

const emt = defineEmits([ 'submit', 'cancle' ])

const exits = computed((): Form.UploadImages => {
    const gs = must_arr(prp.edit.galleries)
    const src = media_tool.convert_upload_imgs(gs)
    return src
})

const view = computed((): Form.UploadImages => {
    const bn: Form.UploadImages = exits.value // prp.form.gallery || []
    const us: Form.UploadImages = aii.success || []
    return [ ...bn, ...us ]
})

const aii = reactive({
    data: { isGallery: 1 }, ioading: false, init: false,
    success: <Form.UploadImages>[ ], imit: DATA_PUBLISH_MEDIA.GALLERY_LIMIT
})

nextTick(() => timeout(() => aii.init = true, 200))

const funn = {
    choseImg: () => futuring(aii, async () => {
        const chose = await open_choise_img()
        const ps: string[] = must_arr(chose.tempFilePaths)
        const fs: File[] = must_arr(chose.tempFiles)
        if (view.value.length > aii.imit) {
            tipwarn('图片上传数量，已达最大限度。')
            return
        }
        const need: Media[] = [ ]
        for (let j= 0; j< ps.length; j++ ) {
            const p = ps[j]
            const res: Media = await server_upload_media.product(p, aii.data);
            const op: Form.UploadImage = media_tool.generate_upload_img(p, fs[j], res)
            aii.success.push(op);
            need.push(op.data as Media)
        }
        await funn.asyncImg( funn.getaii() );
        tipsucc('文件上传成功。')
    }),
    // 
    getaii: () => {
        const gs: Media[] = must_arr(prp.edit.galleries)
        const succ: Media[ ] = aii.success.map(e => (e.data as Media))
        const __src: Media[ ] = [ ...gs, ...succ ]
        return __src
    },
    // 换成 strapi 的图片数据
    asyncImg: async (aii: Media[ ]): Promise<ProductContent> => {
        const res: MANY = aii.map(e => media_tool.build_content_data(e))
        const pc: ProductContent = await server_content.update_galleries(res, prp.edit)
        return pc
    },
    trashImg: (v: Form.UploadImage) => futuring(aii, async () => {
        const src: Media[] = must_arr(prp.edit.galleries)
        const i = arrfindi(src, v.path, 'url');
        if (i >= 0) { 
            src.splice(i, 1);
        }
        const j = arrfindi(aii.success, v.path, 'path');
        if (j >= 0) { 
            aii.success.splice(i, 1);
        }
        await funn.asyncImg( funn.getaii() );
        tipsucc('图片删除成功。')
    }),
    vimg: () => {
        return view.value
    }
}

defineExpose(funn)

const ispc = computed((): boolean => uiGetters.ispc)
</script>