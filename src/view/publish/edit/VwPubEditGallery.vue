<template>
    <view class="">
        <view class="bg-con pt-x1">
            <view class="px-inp pb-x1"><text>活动描述</text></view>
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
                <view class="w-333 d-ib px-s" v-for="(v, i) in aii.imgs" :key="i">
                    <CoImg :v="v.small" clazz="h-12vh br o-h"/>
                </view>
                <view class="w-333 d-ib px-s bs-bb" v-if="canedit">
                    <view class="w-100 h-100 ps-r zi-t">
                        <OButtonDef clazz="w-100 h-12vh abs-b i-0 br fx-c" :weak="true">
                            <view class="fx-c py-col tiw fs-n">
                                <UiI :i="'+'"/>
                                <view class="pi-s">添加图片</view>
                            </view>
                        </OButtonDef>
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
import ODashBtn from '@/cake/content/ODashBtn.vue';
import mock_user from '@/server/mock/user/mock_user';
import CoImg from '@/components/media/img/CoImg.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';

const prp = defineProps<{
    form: ONE, canedit: boolean
}>()

const aii = reactive({
    imgs: [ mock_user.gallery[0] ] // mock_user.gallery // 
})

const len3 = computed((): boolean => {
    return aii.imgs.length > 3
})

const funn = {

}

defineExpose(funn)
</script>