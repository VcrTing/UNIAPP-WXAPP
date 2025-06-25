<template>
    <view class="">
        <view class="">
            <view class="px-row">
                <VwChoseUserTop/>
            </view>
            <VwChoseUserCon/>
            <view class="py"></view>
            <VwChoseUserCollection/>
        </view>
        
        <CoBomCenterBtn @go="funn.submit" :clazz="'mh-btn w-9em'">确认选择</CoBomCenterBtn>
    </view>
</template>

<script setup lang="ts">
import CoBomCenterBtn from '@/components/element/button/CoBomCenterBtn.vue';
import VwChoseUserTop from './user/VwChoseUserTop.vue';
import VwChoseUserCon from './user/VwChoseUserCon.vue';
import uniRouter from '@/tool/uni/uni-router';
import VwChoseUserCollection from './user/VwChoseUserCollection.vue';

// const prp = defineProps<{}>()
const funn = {
    submit: () => {
        uniRouter.back()
    }
}
</script>