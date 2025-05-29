<template>
    <view class="fx-aii-btn-def py px br">
        <view class="fx-c ps-r zi-t px">
            <slot>

            </slot>
            <view class="abs-r t-0" v-if="num && num > 0">
                <view class="dot-err fx-c" style="width: 1.2em; height: 1.2em;">
                    <text class="fs-s">{{ num }}</text>
                </view>
            </view>
        </view>
        <view class="ta-c pt"><text class="tid">{{ tit }}</text></view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';

const prp = defineProps<{
    num?: number,
    tit?: string
}>()

</script>