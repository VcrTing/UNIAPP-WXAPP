<template>
    <view class="">
        <view class="bg-con pt-x1">
            <view class="px-inp pb-s"><text>活动描述</text></view>
            <view class="py-s px-inp fx-aii-btn-def">
                <view class="fs-s tid">
                    <text>温馨提示：</text>
                    <text>系统自动识别'中文句号(。)'，展示描述时，会根据'中文句号'自动换行。</text>
                </view>
            </view>
            <view class="pb"></view>
            <CkInpItem :tit="''">
                <!--
                <OTextarea class="pt-t" :def="aii.form.description" @result="(v) => aii.form.name = v" 
                    :pchd="'请输入活动描述'"/> -->
                <textarea auto-height maxlength="600" type="text"
                    class="inp-app" v-model="form.introduction"
                    :placeholder="'请输入活动描述'" />
            </CkInpItem>
        </view>
        <view class="bg-con px-inp py-col">
            <view class="py">活动相册</view>
            <view class="pt-s"></view>
            <view class="o-h row">
                <view class="w-333 h-12vh d-ib ps-r zi-t mb-s" v-for="(v, i) in view" :key="i">
                    <view class="w-100 h-12vh px-s fx-c abs-b i-0">
                        <CoImg clazz="h-100 w-100 br" :src="v.path"/>
                        <view class="abs-b r-0 zi-n pr-s" v-if="canedit">
                            <view @tap="funn.trashImg(v)" class="px-s py-s bg-028 br-ti br-br">
                                <UiI i='trash' clazz="c-fff op-618"/>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="w-333 h-12vh d-ib px-s bs-bb mb-s" v-if="canedit">
                    <view class="w-100 h-100 ps-r zi-t">
                        <OButton color="def" @tap="funn.choseImg" clazz="w-100 h-12vh abs-b i-0 br fx-c" :weak="true">
                            <view class="fs-n tiw">
                                <UiI :clazz="'d-ib'" :i="'+'"/>
                                <text class="px-s">添加优质</text>
                                <view>图片更吸引人</view>
                            </view>
                        </OButton>
                    </view>
                </view>
            </view>
            <view class="pt-s"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButton from '@/cake/button/OButton.vue';
import { arrfindi } from '@/tool/util/iodash';
import { tipsucc, tipwarn } from '@/tool/uni/uni-global';
import { open_choise_img } from '@/tool/uni/uni-app';
import { future, futuring, timeout } from '@/tool/util/future';
import server_upload_media from '@/server/media/server_upload_media';
import media_tool from '@/tool/modules/common/media_tool';
import { must_arr } from '@/tool/util/valued';
import server_pubplus from '@/server/publish/server_pubplus';
import { DATA_ACTIVITY_MEDIA } from '@/conf/conf-datas';

const prp = defineProps<{
    form: ONE, canedit: boolean, documentId: string
}>()

const view = computed((): Form.UploadImages => {
    const bn: Form.UploadImages = prp.form.gallery || []
    const us: Form.UploadImages = aii.success || []
    return [ ...bn, ...us ]
})

const aii = reactive({
    data: { isGallery: 1 }, ioading: false,
    success: <Form.UploadImages>[ ], imit: DATA_ACTIVITY_MEDIA.GALLERY_LIMIT
})

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
            const res: Media = await server_upload_media.activity(p, aii.data);
            const op: Form.UploadImage = media_tool.generate_upload_img(p, fs[j], res)
            aii.success.push(op);
            need.push(op.data as Media)
        }
        tipsucc('文件上传成功。')
        await funn.asyncImg(need);
    }),
    // 换成 strapi 的图片数据
    asyncImg: async (src: Media[]) => {
        for (let j= 0; j< src.length; j++ ) {
            const v = src[j]
            const res: Media = await server_pubplus.plus_media(media_tool.build_activity_plus_data(v, prp.documentId))
            if (res.documentId) {
                const i: number = arrfindi(aii.success, res.urlSmall, 'link')
                console.log('对比 =', res, i, aii.success[i])
                media_tool.replace_upload_img(aii.success[i], v)
            }
        }
    },
    trashImg: (v: Form.UploadImage) => {
        const i = arrfindi(prp.form.gallery, v.path, 'path');
        if (i >= 0) { prp.form.gallery.splice(i, 1) }
        const j = arrfindi(aii.success, v.path, 'path');
        if (j >= 0) { aii.success.splice(i, 1) }
    },
    vimg: () => {
        return view.value
    }
}

defineExpose(funn)
</script>