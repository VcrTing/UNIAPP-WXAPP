<template>
    <view>
        <view class="o-app-bottom-bar">
            <view class="bg-app-bottom-bar mh-app-bottom-bar">
                <slot></slot>
                <OSafeAreaBottom/>
            </view>
        </view>

        <view v-if="mat" class="mh-app-bottom-bar"></view>
        <OSafeAreaBottom v-if="mat"/>
    </view>
    
</template>

<script setup lang="ts">
import OSafeAreaBottom from '../safearea/OSafeAreaBottom.vue';

// const prp = defineProps<{}>()
defineProps<{
    mat?: boolean
}>()
</script>