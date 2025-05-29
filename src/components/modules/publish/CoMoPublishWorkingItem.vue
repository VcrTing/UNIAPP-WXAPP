<template>
    <view class="card fx-s o-h">
        <image class="w-5em h-5em" mode="aspectFill" :src="v.banner.src"/>
        <view class="fx-1 px-row">
            <view>{{ v.title }}</view>
            <view class="fx-s pt">
                <view class="fx-1">
                    <view class="fx-i">
                        <UiI class="fs-s" :i="'time'"/>
                        <view class="fs-n pi-s tis">{{ v.timed.start }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view>
            <!--
            <OButtonDef :weak="true" clazz="fs-s px-s br-s">已完成</OButtonDef>
            -->
            <slot>
                <view class="pr-row pi-s">
                    <view class="pb">&nbsp;</view>
                    <view v-if="v.status == 2" class="money fx-r">
                        <UiI class="fs-s" :i="'+'"/>
                        <view class="pi-t fw-550">{{ v.money.price }}</view>
                    </view>
                    <view v-if="v.status == -1" class="fx-r">
                        <OButtonDef :weak="true" clazz="fs-s px-s br-s">已取消</OButtonDef>
                    </view>
                </view>
            </slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: ONE
}>()

</script>