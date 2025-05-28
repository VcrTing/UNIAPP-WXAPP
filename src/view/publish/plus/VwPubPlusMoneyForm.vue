<template>
    <view class="">
        <view class="card pa-card">
            <view class="header-s py">活动相册</view>
            <view class="pt"></view>
            <view class="o-h" :class="len3 ? 'br' : ''">
                <view class="w-333 h-12vh d-ib" v-for="(v, i) in aii.imgs" :key="i">
                    <CoImg :v="v.small" clazz="h-100"/>
                </view>
            </view>
            <view class="pb-s">
                <ODashBtn class="w-33">
                    <view class="fx-c py-col h-12vh">
                        <UiI :i="'+'"/>
                        <view class="pi-s">添加图片</view>
                    </view>
                </ODashBtn>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import ODashBtn from '@/cake/content/ODashBtn.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import mock_interact from '@/server/mock/interact/mock_interact';
import mock_meizi from '@/server/mock/user/mock_meizi';
import mock_user from '@/server/mock/user/mock_user';
import CoImg from '@/components/media/img/CoImg.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    form: {
        name: '', description: ''
    },
    imgs: [ mock_user.gallery[0] ] // mock_user.gallery // 
})

const len3 = computed((): boolean => {
    return aii.imgs.length > 3
})

const funn = {

}

defineExpose(funn)
</script>