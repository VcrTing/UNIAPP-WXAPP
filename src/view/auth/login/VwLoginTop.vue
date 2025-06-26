<template>
    <view class="pb-x2">
        <view class="fx-c px py" @tap="appRouter.index()">
            <view class="mxw-12em">
                <CoLogo :clazz="'h7 w-5em h-5em br-x2'"/>
            </view>
        </view>
        <view class="fx-c pt-x1 c-fff">
            <view class="fw-500 op-80">{{ APP_GENERATE_DETAIL.desc_auth }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoLogo from '@/components/genra/logo/CoLogo.vue';
import { APP_GENERATE_DETAIL } from '@/conf/conf-app';
import appRouter from '@/tool/uni/app-router';

// const prp = defineProps<{}>()

</script>