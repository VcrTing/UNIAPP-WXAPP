<template>
    <view class="py-s c-p fx-c"
        :class="iive ? '' + clazz : 'tiw ' + clazz"
    >
        <view class="px py br-rnd" 
            :class="iive ? 'btn-wht-t fw-550 tils' : ''"
        >
            <view class="h6 ">{{ tit }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    iive: boolean,
    tit: string,
    clazz?: string
}>()

</script>