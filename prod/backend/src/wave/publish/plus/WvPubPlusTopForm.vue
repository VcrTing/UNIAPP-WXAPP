<template>
    <view class="bg-con">
        <view class="pt">
            <!--<view class="header-s py">基本资料</view>-->
            <view class="">
                <OScrollX>
                    <view class="py">
                        <view class="d-ib pi-inp"></view>
                        <view class="w-28 h-12vh d-ib ps-r zi-t mr" v-for="(v, i) in aii.paths" :key="i">
                            <view class="w-100 h-12vh fx-c abs-b i-0">
                                <CoImg clazz="h-100 w-100 br" :src="v"/>
                                <view class="abs-b r-0">
                                    <view @tap="funn.trashImg(v)" class="px-s py-s bg-028 br-ti br-br">
                                        <UiI i='trash' clazz="c-fff op-618"/>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="w-28 h-12vh br-s d-ib ps-r zi-t">
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
            </view>
            <view class="bg-con">
                <CkInpItem class="pt pb" :tit="''">
                    <OInput :def="form.title" @result="(v) => form.title = v" 
                        class="h6" :pchd="'请输入一个吸引人的标题'"/>
                </CkInpItem>
                <view class="pt pb">
                    <view class="pi-inp pb">
                        <text>标签</text>
                        <text class="fs-s pi tis">({{ taglen }}/{{ form.taglimit }})</text>
                    </view>
                    <view class="mh-inp " :class="taglen ? 'pi-inp' : ''">
                        <OScrollX>
                            <view class="">
                                <view class="d-ib pr" v-for="(v, i) in form.tags" :key="i">
                                    <OButton color="def" :weak="true" clazz="tid pi br-s h-2em">
                                        <view class="fs-n fx-c">
                                            <text class="px-s">{{ v.name }}</text>
                                            <OButton color="def" :weak="true" clazz="px-t py-t br-s" @tap="funn.trashTag(v)">
                                                <UiI clazz="d-ib fs-s" i="trash"/>
                                            </OButton>
                                        </view>
                                    </OButton>
                                </view>
                                <view v-if="taglen < form.taglimit" class="d-ib px-inp" @tap="funn.ediTag">
                                    <OButton color="def" :weak="true" clazz="w-2em fx-c h-2em br-cir"><UiI i="+"/></OButton>
                                </view>
                            </view>
                        </OScrollX>
                    </view>
                </view>
            </view>
            <CoCoTagChoisePagePan :idx="pan_tag.idx" :form="form"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButton from '@/cake/button/OButton.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import pan_tooi from '@/tool/app/pan_tooi';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { open_choise_img, upload_file } from '@/tool/uni/uni-app';
import server_upload_media from '@/server/media/server_upload_media';
import { tipsucc, tipwarn } from '@/tool/uni/uni-global';
import { __net_file_url } from '@/conf/conf-endpoints';
import media_tool from '@/tool/modules/common/media_tool';
import { DATA_PUBLISH_LIMIT } from '@/conf/conf-datas';
import CoCoTagChoisePagePan from '../pan/CoCoTagChoisePagePan.vue';

// const prp = defineProps<{}>()
const form = reactive({
    title: '', tags: <Tag[]>[ ], taglimit: DATA_PUBLISH_LIMIT.TAG,
    __banner: <Media[]>[ ]
})

const taglen = computed(() => must_arr(form.tags).length)

const emt = defineEmits([ 'refresh' ])

const aii = reactive({
    paths: <string[]>[ ], data: { isGallery: 0 },
    files: <MANY>[ ], 
    success: <Form.UploadImages>[ ], imit: 6
})

const funn = {
    trashTag: (v: Tag) => {
        const i = arrfindi(form.tags, v.documentId, 'documentId')
        form.tags.splice(i, 1)
    },
    ediTag: () => {
        pan_tooi.open_def_r(pan_tag.idx)
    },
    trashImg: (path: string) => {
        console.log(aii.success, path)

        const i = arrfindi(aii.success, path, 'path')
        console.log('i =', i)

        aii.success[i].__iive = false
        const j = aii.paths.indexOf(path)
        if (j >= 0) {
            aii.paths.splice(j, 1)
        }
    },

    choseImg: async () => {
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
    },
    vid: () => {
        const iives = aii.success.filter(f => f.__iive);
        form.__banner = iives.map((e) => (e.data as Media))

        if (!is_nice_arr(form.__banner)) {
            tipwarn('请至少上传一张活动宣传图。')
            return false
        }
        if (form.tags.length == 0) {
            tipwarn('活动标签为空，请至少选择一个标签。')
            return false
        }
        if (!form.title || form.title.length < 3) {
            tipwarn('活动标题至少大于4个字符。')
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

const pan_tag = { idx: 41, hui: <ElePanHui> { opacity: 0.1 } }
</script>