<template>
    <view>
        <view class="o-app-top-bar bg-app-top-bar">
            <o-safe-area-top/>
            <view class="mh-app-top-bar">
                <slot></slot>
            </view>
        </view>
        
        <o-safe-area-top/>
        <view class="mh-app-top-bar"></view>
    </view>
    
</template>

<script setup lang="ts">
</script>