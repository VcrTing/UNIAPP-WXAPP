<template>
    <view class="o-ing-wp">
        <view class="o-ing">
            <view class="o-ing-in" :class="clazz_ing"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    clazz_ing?: string
}>()

</script>