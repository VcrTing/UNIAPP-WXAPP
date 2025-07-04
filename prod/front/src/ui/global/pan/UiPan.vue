<template>
    <view>
        <view class="o-pan ps-f" 
            :class="clazz" 
            :style="{
                'z-index': z_index ? z_index : 398
            }">
            <view class="o-pan-inner w-100 h-100 ps-r">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    clazz: string,
    z_index: number
}>()
</script>