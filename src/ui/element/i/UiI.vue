<template>
    <!--
    <image mode="aspectFit" class="ui-i" 
        :src="iconnoir(i)"
    ></image>-->
    <view class="ui-i" :class="clazz">
        <text class="ui-i-inner" :class="booticon[i]" :style="booticon_styles[i] ? booticon_styles[i] : {}"></text>
    </view>
</template>

<script setup lang="ts">
// import { iconnoir } from '@/plugin/icon/iconnoir';
// import { colorui } from '@/plugin/icon/colorui';
// import { fontawasome } from '@/plugin/icon/fontawasome';
import { booticon } from '@/plugin/icon/boostrap';
import { booticon_styles } from '@/plugin/icon/boostrap';
defineProps<{
    i: ICONS | string,
    clazz?: string
}>()
</script>