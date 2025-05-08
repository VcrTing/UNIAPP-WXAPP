<template>
    <view>
        <view class="o-app-bottom-bar">
            <view class="bg-app-bottom-bar mh-app-bottom-bar">
                <slot></slot>
                <o-safe-area-bottom/>
            </view>
        </view>

        <view class="mh-app-bottom-bar"></view>
        <o-safe-area-bottom/>
    </view>
    
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()

</script>