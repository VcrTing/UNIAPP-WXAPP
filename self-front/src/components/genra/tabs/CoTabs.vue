<template>
    <view>
        <view class="fx-i zi-s">
            <view class="py-s" v-for="(v, i) in tabs" :key="i"
                @tap="aii.iive = i"
                :class="aii.iive == i ? 'bd-b-x2 bd-c-x2' : 'sus'"
            >
                <view class="px py-row fx-c">
                    <view class="h6 fw-550">{{ v.tit }}</view>
                </view>
            </view>
        </view>
        <view class="zi-t bd-b w-100 bd-c-s tsf-y-100-r"></view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const prp = defineProps<{
    tabs: MANY
}>()

const aii = reactive({
    iive: 1
})

const emt = defineEmits([ 'change' ])

const funn = {
    change: (v: number) => {
        emt('change', aii.iive)
    }
}

defineExpose(funn)
</script>