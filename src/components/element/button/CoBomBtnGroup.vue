<template>
    <view class="fx-s">
        <view class="w-25">
            <OButtonDef clazz="mh-btn w-100" @tap="emt('cancle')">
                返回
            </OButtonDef>
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
import OButtonDef from '@/cake/button/OButtonDef.vue';

const prp = defineProps<{
    tit?: string,
    ioading?: boolean
}>()

const emt = defineEmits([ 'submit', 'cancle' ])

</script>