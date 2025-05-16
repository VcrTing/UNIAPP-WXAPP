<template>
    <view class="">
        <view class="card pa-card">
            <view class="header-s py">套餐设置</view>
            <view class="pt">
                <ODashBtn class="w-100">
                    <view class="fx-c py-col">
                        <UiI :i="'+'"/>
                        <view class="pi-s">添加套餐</view>
                    </view>
                </ODashBtn>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import ODashBtn from '@/cake/content/ODashBtn.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    form: {
        name: '', description: ''
    }
})

const funn = {

}

defineExpose(funn)
</script>