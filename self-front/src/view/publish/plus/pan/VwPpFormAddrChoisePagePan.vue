<template>
    <OPan :idx="idx">
        <OPanInnerX :idx="idx" :mw="'100vw'">
            <FeakPageLayout @back="ciose" :tit="'地址选择'" :clazz="'bg-pag-pri'">
                <VwAddrChoiseContent :form="form"/>
                <template #bom>
                    <view class="w-100 py px-row">
                        <OButton @tap="ciose" color="wht" clazz="btn-app">确认选择</OButton>
                    </view>
                </template>
            </FeakPageLayout>
        </OPanInnerX>
    </OPan>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerX from '@/cake/pan/OPanInnerX.vue';
import FeakPageLayout from '@/components/layout/feak/FeakPageLayout.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import OButton from '@/cake/button/OButton.vue';
import VwAddrChoiseContent from '../cont/VwAddrChoiseContent.vue';

const prp = defineProps<{
    idx: number,
    form: ONE
}>()

const ciose = () => pan_tooi.close_pan(prp.idx)
</script>