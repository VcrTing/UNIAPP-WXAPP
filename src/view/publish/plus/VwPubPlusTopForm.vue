<template>
    <view class="bg-con">
        <view class="pt-x2">
            <!--<view class="header-s py">基本资料</view>-->
            <view class="">
                <OScrollX>
                    <view class="d-ib pi-inp"></view>
                    <view class="w-28 h-12vh d-ib">
                        <view class="w-100 h-12vh fx-c ps-r zi-t">
                            <CoImg clazz="h-100 w-100 br" :v="mock_orders.banner"/>
                            <view class="abs-b r-0">
                                <view class="px-s py-s bg-028 br-ti br-br">
                                    <UiI i='trash' clazz="c-fff op-618"/>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="px-s d-ib"></view>
                    <view class="w-28 h-12vh br-s d-ib ps-r zi-t">
                        <OButtonDef clazz="h-100 fx-c abs-b i-0 w-100 br" :weak="true" @tap="funn.choseImg">
                            <view class="fs-n tiw">
                                <UiI :clazz="'d-ib'" :i="'+'"/>
                                <text class="px-s">添加优质</text>
                                <view>图片更吸引人</view>
                            </view>
                        </OButtonDef>
                    </view>
                </OScrollX>
            </view>
            <view class="bg-con">
                <CkInpItem class="pt-x2 pb" :tit="''">
                    <OInput :def="form.title" @result="(v) => form.title = v" 
                        class="h6" :pchd="'请输入活动标题'"/>
                </CkInpItem>
                <view class="pt pb">
                    <view class="pi-inp pb">
                        <text>活动标签</text>
                        <text class="fs-s pi tis">({{ taglen }}/{{ form.taglimit }})</text>
                    </view>
                    <view class="mh-inp " :class="taglen ? 'pi-inp' : ''">
                        
                        <OScrollX>
                            <view class="" >
                                <view class="d-ib pr" v-for="(v, i) in form.tags" :key="i">
                                    <OButtonDef :weak="true" clazz="fs-n tid pi br-s">
                                        <text>{{ v.name }}</text>
                                        <OButtonDef @tap="funn.trashTag(v)">
                                            <UiI clazz="d-ib fs-s" i="trash"/>
                                        </OButtonDef>
                                    </OButtonDef>
                                </view>
                                <view v-if="taglen < form.taglimit" class="d-ib px-inp" @tap="funn.ediTag">
                                    <view class="btn-def w-2em fx-c h-2em br-cir"><UiI i="+"/></view>
                                </view>
                            </view>
                        </OScrollX>
                    </view>
                </view>
            </view>
            <VwPpFormTagChoisePagePan :idx="pan_tag.idx" :form="form"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import CoImg from '@/components/media/img/CoImg.vue';
import { arrfind, arrfindi } from '@/tool/util/iodash';
import { is_nice_arr, must_arr } from '@/tool/util/valued';
import VwPpFormTagChoisePagePan from './pan/VwPpFormTagChoisePagePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { open_choise_img } from '@/tool/uni/uni-app';
import server_upload_media from '@/server/media/server_upload_media';
import { tipwarn } from '@/tool/uni/uni-global';

// const prp = defineProps<{}>()
const form = reactive({
    title: '', tags: <ActivityTag[]>[ ], taglimit: 3,
    __banner: [
        { url: 'https://img0.baidu.com/it/u=4007537519,3388078189&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1050' }
    ]
})

const taglen = computed(() => must_arr(form.tags).length)

const emt = defineEmits([ 'refresh' ])

const funn = {
    trashTag: (v: ActivityTag) => {
        const i = arrfindi(form.tags, v.id, 'id')
        // console.log('删掉 =', i)
        form.tags.splice(i, 1)
    },
    ediTag: () => {
        pan_tooi.open_def_r(pan_tag.idx)
    },
    choseImg: async () => {
        const res = await open_choise_img()
        // console.log('chooseIMG RES =', res)
        // const ph: string = JSON.stringify(res.tempFilePaths)
        const fs: File[] = must_arr(res.tempFiles);
        // console.log(fs)
        await server_upload_media.upload(fs)
    },
    vid: () => {
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
        if (funn.vid()) { return form }
        return null
    },
}

const func = {
    refresh: () => emt('refresh')
}

defineExpose(funn)

const pan_tag = { idx: 41, hui: <ElePanHui> { opacity: 0.1 } }

</script>