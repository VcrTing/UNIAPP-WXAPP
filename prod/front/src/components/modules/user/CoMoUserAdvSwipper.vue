<template>
    <view>
        <view v-for="(v, i) in banners" :key="i">
            <image
                :class="clazz"
                :src="v.url || def"
                mode="aspectFill" 
                class="w-100 h-18vh ani-scaie-s-aii"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    info: AppInfo,
    clazz?: string
}>()

const banners = computed((): Media[] => {
    return must_arr(prp.info.user_banners)
})

const def = 'https://img1.baidu.com/it/u=2526566902,3466742482&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=438'
</script>