<template>
    <view>
        
        <view class="px-row py-row">
            <view>
                <view class="ps-r zi-n">
                    <view class="w-100 h-18vh">
                        <image class="w-100 h-100 br" mode="aspectFill" :src="item.banner"/>
                    </view>
                    <view class="abs-bi zi-s c-fff pb w-100">
                        <view class="px-col pb-s">
                            <view class=" h7 fw-550">{{ item.name }}</view>
                        </view>
                        <view class="px-col fx-s w-100">
                            <view class="fx-i fs-n fx-1">
                                <view><UiI :i="'user'"/></view>
                                <view class="px-row">私人一对一</view>
                            </view>
                            
                            <view class="fx-r fs-n">
                                <view><UiI :i="'time'"/></view>
                                <view class="pi-row">{{ item.timed }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="py-row">
                    <view class="py-row">活动标签</view>
                    <view class="py-row">
                        <view>
                            <view class="pr d-ib" v-for="(v, i) in tags" :key="i">
                                <OButton color="def" :clazz="'px-row br-s'" :weak="true">{{ v.tit }}</OButton>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">

import OButton from '@/cake/button/OButton.vue';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    item: ONE,
    tags: MANY
}>()

</script>