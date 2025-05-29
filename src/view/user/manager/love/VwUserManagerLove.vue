<template>
    <view class="pt-s">
        <view class="bg-con">
            <view class="py">
                <view class="" v-for="(v, i) in meizis" :key="i">
                    <view class="fx-aii-btn-def px-row py">
                        <view class="fx-s">
                            <view class="fx-1">
                                <CoMoUserInfo :v="v" :clazz="'h6 pr-s'"/>
                            </view>
                            <view v-if="aii.i == 0">
                                <OButtonDef @tap="funn.loveyou(v)" :weak="true" clazz="py-s px-col br-s">
                                    <view class="fx-c">
                                        <!--<UiI i="love"/>-->
                                        <text>已关注</text>
                                    </view>
                                </OButtonDef>
                            </view>
                            <view v-else-if="aii.i == 1">
                                <OButton color="err" @tap="funn.focusyou(v)" :weak="true" clazz="py-s px-col br-s">
                                    <view class="fx-c">
                                        <UiI i="love"/>
                                        <text>关注</text>
                                    </view>
                                </OButton>
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
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()

const meizis = [
    ...mock_meizi.items, ...mock_meizi.items, ...mock_meizi.items
]

const aii = reactive({
    i: 0
})

const funn = {
    focusyou: (v: ONE) => {
        aii.i = 0
    },
    loveyou: (v: ONE) => {
        aii.i = 1
    }
}
</script>