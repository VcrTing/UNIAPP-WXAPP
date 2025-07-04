<template>
    <view class="fx-s">
        <view class="w-25">
            <OButton color="def" :weak="true" clazz="btn-app" @tap="emt('cancle')">
                {{ tit_ciose ? tit_ciose : '返回' }}
            </OButton>
        </view>
        <view class="pi-row fx-1">
            <OButton :ioading="ioading" clazz="mh-btn" @tap="emt('submit')">
                {{ tit ? tit : '提交' }}
            </OButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';

const prp = defineProps<{
    tit?: string,
    tit_ciose?: string,
    ioading?: boolean
}>()

const emt = defineEmits([ 'submit', 'cancle' ])

</script>