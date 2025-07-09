<template>
    <view class="">

        <view class="pt bg-con">
                <OScrollX>
                    <view class="py">
                        <view class="d-ib pi-inp"></view>
                        <view class="w-28 d-ib mr ps-r zi-t" v-for="(v, i) in view" :key="i"
                        >
                            <view class="w-100 fx-c abs-b i-0" 
                                :class="ispc ? 'h-16vh ' : 'h-12vh'"
                                >
                                <CoImg clazz="h-100 w-100 br" :src="v.path"/>
                                <view class="abs-b r-0 zi-n" v-if="canedit">
                                    <view @tap="funn.trashImg(v)" class="px-s py-s bg-028 br-ti br-br">
                                        <UiI i='trash' clazz="c-fff op-618"/>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view v-if="canedit"
                            class="w-28 h-12vh br-s d-ib ps-r zi-t">
                            <OButton color="def" clazz="h-100 fx-c abs-b i-0 w-100 br" :weak="true" @tap="funn.choseImg">
                                <view class="fs-n tiw">
                                    <UiI :clazz="'d-ib'" :i="'+'"/>
                                    <text class="px-s">添加优质</text>
                                    <view>封面更吸引人</view>
                                </view>
                            </OButton>
                        </view>
                    </view>
                </OScrollX>

            <CkInpItem class="pt pb-x1" :tit="''">
                <input v-if="canedit" class="inp-app h6" v-model="form.title" placeholder="请输入吸引人的标题"/>
                <view v-else class="inp-app h6">{{ form.title }}</view>
            </CkInpItem>
            <view class="pb-s">
                <view class="pi-inp pb">
                    <text>标签</text>
                    <text v-if="canedit" class="fs-s pi tis">({{ taglen }}/{{ form.taglimit }})</text>
                </view>
                <view class="pb pt-s" :class="taglen ? 'pi-inp' : ''">
                    <OScrollX>
                        <view class="" >
                            <view class="d-ib pr" v-for="(v, i) in form.tags" :key="i">
                                <OButton color="def" :weak="true" clazz="tid pi br-s h-2em">
                                    <view class="fs-n fx-c">
                                        <text>{{ v.name }}</text>
                                        <OButton color="def" :weak="true" v-if="canedit" @tap="funn.trashTag(v)">
                                            <UiI clazz="d-ib fs-s px-t" i="trash"/>
                                        </OButton>
                                        <view class="d-ib py-s pr-s" v-else>
                                            &nbsp;
                                        </view>
                                    </view>
                                </OButton>
                            </view>
                            <view v-if="(taglen < form.taglimit) && canedit" class="d-ib px-inp" @tap="funn.ediTag">
                                <OButton color="def" :weak="true" clazz="w-2em h-2em br-cir"><UiI i="+"/></OButton>
                            </view>
                        </view>
                    </OScrollX>
                </view>
            </view>
        </view>
        <CoCoTagChoisePagePan :idx="pan_tag.idx" :form="form"/>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButton from '@/cake/button/OButton.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { arrfindi } from '@/tool/util/iodash';
import pan_tooi from '@/tool/app/pan_tooi';
import { tipsucc, tipwarn } from '@/tool/uni/uni-global';
import { open_choise_img } from '@/tool/uni/uni-app';
import { future, timeout } from '@/tool/util/future';
import server_upload_media from '@/server/media/server_upload_media';
import media_tool from '@/tool/modules/common/media_tool';
import server_pubplus from '@/server/publish/server_pubplus';
import { DATA_PUBLISH_MEDIA } from '@/conf/conf-datas';
import CoCoTagChoisePagePan from '../pan/CoCoTagChoisePagePan.vue';
import { uiGetters } from '@/memory/global';

const prp = defineProps<{
    form: ONE, canedit: boolean, documentId: string
}>()

const taglen = computed(() => must_arr(prp.form.tags).length)

const aii = reactive({
    success: <Form.UploadImages>[ ], imit: DATA_PUBLISH_MEDIA.BANNER_LIMIT, ioading: false
})

const view = computed((): Form.UploadImages => {
    const bn: Form.UploadImages = prp.form.banner || []
    const us: Form.UploadImages = aii.success || []
    return [ ...bn, ...us ]
})

const funn = {
    choseImg: () => future(async () => {
        if (aii.ioading) return;
        aii.ioading = true;

        const chose = await open_choise_img()
        const ps: string[] = must_arr(chose.tempFilePaths)
        const fs: File[] = must_arr(chose.tempFiles)
        if (view.value.length > aii.imit) {
            tipwarn('图片上传数量，已达最大限度。')
            return
        }
        const data = { isGallery: 0 }
        const need: Media[] = [ ]
        for (let j= 0; j< ps.length; j++ ) {
            const p = ps[j]
            const res: Media = await server_upload_media.product(p, data);
            const op: Form.UploadImage = media_tool.generate_upload_img(p, fs[j], res)
            aii.success.push(op);
            need.push(op.data as Media)
        }
        tipsucc('文件上传成功。');
        await funn.asyncImg(need);
        timeout(() => aii.ioading = false)
    }),
    
    // 换成 strapi 的图片数据
    asyncImg: async (src: Media[]) => {
        for (let j= 0; j< src.length; j++ ) {
            const v = src[j]
            const res: Media = await server_pubplus.plus_media(media_tool.build_plus_data(v, prp.documentId))
            if (res.documentId) {
                const i: number = arrfindi(aii.success, res.urlSmall, 'link')
                console.log('对比 =', res, i, aii.success[i])
                media_tool.replace_upload_img(aii.success[i], v)
            }
        }
    },
    trashTag: (v: Tag) => {
        const i = arrfindi(prp.form.tags, v.documentId, 'documentId')
        prp.form.tags.splice(i, 1)
    },
    trashImg: (v: Form.UploadImage) => {
        const i = arrfindi(prp.form.banner, v.path, 'path');
        if (i >= 0) { prp.form.banner.splice(i, 1) }
        const j = arrfindi(aii.success, v.path, 'path');
        if (j >= 0) { aii.success.splice(i, 1) }
    },
    ediTag: () => {
        pan_tooi.open_def_r(pan_tag.idx)
    },
    vimg: () => {
        return view.value
    }
}

defineExpose(funn)


const ispc = computed((): boolean => uiGetters.ispc)

const pan_tag = { idx: 41, hui: <ElePanHui> { opacity: 0.1 } }
</script>