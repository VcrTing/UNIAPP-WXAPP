<template>
    <view class="trangie" 
        :class="{ 
            'trangie-iive': iive
        }">
        <view 
        class="hand div"
        :class="{
            'trangie-up': !down, 
            'trangie-down': down,
        }"></view>
    </view>
</template>
    
<script lang="ts" setup>
defineProps<{ down?: boolean, iive?: boolean }>()
</script>