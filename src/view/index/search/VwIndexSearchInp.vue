<template>
    <view>
        <view class="py-x2"></view>
        <view class="py">
            <view>
                <CoSearchInput class="bg-con br-x3" :i="'search'" :ir="'x'"
                    :def="form.search" 
                    @result="(v) => form.search = v"
                    @tapi="funn.submit" @tapr="funn.submit"
                    :pchd="'请输入您的喜好名称'"/>
            </view>
        </view>
        <view class="py-row">
            <view class="pt">
                <view class="btn br-s fs-n px-s">&nbsp;&nbsp;&nbsp;&nbsp;</view>
                <OTag>黑丝</OTag> <OTag>JK</OTag>
                <OTag>约会</OTag> <OTag>Lolita</OTag>
                <OTag>
                    <view class="fx-c"><view>更多标签&nbsp;</view><UiI :i="'b'"/></view>
                </OTag>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OTag from '@/cake/button/tag/OTag.vue';
import CoSearchInput from '@/components/element/input/CoSearchInput.vue';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const form = reactive({ search: '' })

const funn = {
    submit: () => {
        console.log('')
    }
}
</script>