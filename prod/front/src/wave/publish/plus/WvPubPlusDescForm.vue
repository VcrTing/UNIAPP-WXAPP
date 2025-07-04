<template>
    <view class="">
        <view class="bg-con pt-x1">
            <view class="px-inp pb-s"><text>描述</text></view>
            <view class="pb"></view>
            <CkInpItem :tit="''">
                <textarea auto-height maxlength="600" type="text"
                    class="inp-app" v-model="form.introduction"
                    :placeholder="'请输入简短的商品描述'" />
            </CkInpItem>
            <view class="py-s px-inp fx-aii-btn-def">
                <view class="fs-s tis">
                    <text>温馨提示：</text>
                    <text>系统自动识别'中文句号(。)'，展示描述时，会根据'中文句号'自动换行。</text>
                </view>
            </view>
        </view>
        <view class="bg-con px-inp py-col">
            <view class="py">详情图片</view>
            <view class="pt-s"></view>
            <view class="row">
                <view class="w-333 h-12vh d-ib ps-r zi-t mb-s" v-for="(v, i) in aii.paths" :key="i">
                    <view class="w-100 h-12vh px-s fx-c abs-b i-0">
                        <CoImg clazz="h-100 w-100 br" :src="v"/>
                        <view class="abs-b r-0 zi-n pr-s">
                            <view @tap="funn.trashImg(v)" class="px-s py-s bg-028 br-ti br-br">
                                <UiI i='trash' clazz="c-fff op-618"/>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="w-333 h-12vh d-ib px-s bs-bb mb-s">
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
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import { DATA_PUBLISH_MEDIA } from '@/conf/conf-datas';

const form = reactive({
    introduction: '', __medias: <Media[]>[ ]
})

const aii = reactive({
    data: { isGallery: 1 }, ioading: false, 
    files: <MANY>[ ], paths: <string[]>[ ],
    success: <Form.UploadImages>[ ], imit: DATA_PUBLISH_MEDIA.GALLERY_LIMIT
})

const funn = {
    choseImg: () => futuring(aii, async () => {
        const chose = await open_choise_img()
        const ps: string[] = must_arr(chose.tempFilePaths)
        const fs: File[] = must_arr(chose.tempFiles)
        aii.files.push(...fs)
        if (aii.paths.length > aii.imit) {
            tipwarn('图片上传数量，已达最大限度。')
            return
        }
        aii.paths.push(...ps)
        for (let j= 0; j< ps.length; j++ ) {
            const p = ps[j]
            const res: Media = await server_upload_media.product(p, aii.data);
            const op: Form.UploadImage = media_tool.generate_upload_img(p, fs[j], res)
            // details.push(op); 
            aii.success.push(op);
        }
        tipsucc('文件上传成功。')
    }),
    trashImg: (path: string) => {
        // console.log(aii.success, path)
        const i = arrfindi(aii.success, path, 'path')
        // console.log('i =', i)
        aii.success[i].__iive = false
        const j = aii.paths.indexOf(path)
        if (j >= 0) {
            aii.paths.splice(j, 1)
        }
    },
    vid: () => {
        const iives = aii.success.filter(f => f.__iive);
        form.__medias = iives.map((e) => (e.data as Media))
        //
        if (!is_nice_arr(form.__medias)) {
            tipwarn('请至少上传一张活动宣传图。')
            return false
        }
        return true
    },
    v: (): ONE | null => {
        if (funn.vid()) { 
            return form 
        }
        return null
    },
}

defineExpose(funn)
</script>