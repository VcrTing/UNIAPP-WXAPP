<template>
    <view class="py-x3">
        <view class="pt-x3"></view>
        <view class="fx-c px py">
            <view class="mxw-12em">
                <CoLogo :clazz="'h7 w-5em h-5em br-x2'"/>
            </view>
        </view>
        <view class="fx-c pt-x1">
            <view class="tid fw-500">{{ APP_GENERATE_DETAIL.desc_auth }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoLogo from '@/components/genra/logo/CoLogo.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';

// const prp = defineProps<{}>()

</script>