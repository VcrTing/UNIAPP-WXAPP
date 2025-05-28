<template>
    <view class="">
        <view class="px-row">
            <VwChoseTagTop/>
            <view class="py-row"></view>
        </view>

        <CoBomCenterBtn @go="funn.submit" :clazz="'mh-btn w-9em'" :color="'pri'">确认选择</CoBomCenterBtn>
    </view>
</template>

<script setup lang="ts">
import CoBomCenterBtn from '@/components/element/button/CoBomCenterBtn.vue';
import uniRouter from '@/tool/uni/uni-router';
import VwChoseTagTop from './tag/VwChoseTagTop.vue';

// const prp = defineProps<{}>()
const funn = {
    submit: () => {
        uniRouter.back()
    }
}
</script>