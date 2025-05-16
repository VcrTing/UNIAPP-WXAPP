<template>
    <view>
        <view class="publish-plus-btn bd-s-d btn-wht br ts bd-x3"
            @tap="funn.plus"
        >
            <view class="px-row py-row fx-c">
                <UiI :i="'+'"/>&nbsp;新增
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
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