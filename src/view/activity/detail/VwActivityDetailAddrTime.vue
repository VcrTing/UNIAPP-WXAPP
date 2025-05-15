<template>
    <view>
        <view class="fx-s py">
            <view class="pi fx-1 fx-i">
                <UiI class="h6" :i="'time'"/>
                <view class="pi d-ib">
                    {{ timed.startText }}
                </view>
            </view>
            <view></view>
        </view>
        <view class="fx-s py">
            <view class="pi fx-1 fx-i">
                <UiI class="h6" :i="'addr'"/>
                <view class="pi d-ib">
                    {{ addr.address }}
                </view>
            </view>
            <view>
                导航
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    one: ONE
}>()

const timed = computed((): ONE => {
    return must_one<ONE>(prp.one).timed || { }
})
const addr = computed((): ONE => {
    return must_one<ONE>(prp.one).addr || { }
})
</script>