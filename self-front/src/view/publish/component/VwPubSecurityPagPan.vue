<template>
    <OPan :idx="idx">
        <OPanInnerX :idx="idx" :mw="'100vw'">
            <FeakPageLayout @back="ciose" :tit="lookv == 0 ? '隐私政策' : '服务协议'" :clazz="'bg-pag-pri'">
                <view>
                    <VwSecurityFuWuXY v-if="lookv == 1" />
                    <VwSecurityYsZc v-else-if="lookv == 0"/>
                </view>
                <template #bom>
                    <view class="w-100 py px-row">
                        <OButton @tap="ciose" color="wht" clazz="btn-app">确认阅读并返回</OButton>
                    </view>
                </template>
            </FeakPageLayout>
        </OPanInnerX>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerX from '@/cake/pan/OPanInnerX.vue';
import FeakPageLayout from '@/components/layout/feak/FeakPageLayout.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import VwSecurityFuWuXY from '@/view/security/xy/VwSecurityFuWuXY.vue';
import VwSecurityYsZc from '@/view/security/xy/VwSecurityYsZc.vue';

const prp = defineProps<{
    idx: number,
    lookv: number
}>()

const ciose = () => pan_tooi.close_pan(prp.idx)
</script>