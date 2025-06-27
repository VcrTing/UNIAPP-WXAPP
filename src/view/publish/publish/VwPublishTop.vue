<template>
    <view>
        <!--
        <OScrollX class="">
            <view class="fx-i">
                <OButtonDef clazz="w-25 h-12vh fx-c br-s" :weak="true">
                    <view class="fs-n tiw">
                        <UiI :clazz="'d-ib'" :i="'+'"/>
                        <view>新建活动</view>
                    </view>
                </OButtonDef>
            </view>
        </OScrollX>
        <view class="publish-plus-btn bd-s-d br ts bd-x3"
            @tap="funn.plus"
        >
            <view class="px-row py-row fx-c">
                <UiI :i="'+'"/>&nbsp;新增活动
            </view>
        </view>
        -->
    </view>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';

// const prp = defineProps<{}>()

const funn = {
    plus: () => {
        uniRouter.gopg('publish_plus')
    }
}

</script>

<style lang="sass">
</style>