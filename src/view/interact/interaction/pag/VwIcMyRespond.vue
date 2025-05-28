<template>
    <view class="px-row py-row">
        <view class="pb-x2"
            v-for="(v, i) in aii.items" :key="i"
        >
            <view class="fx-s fx-t">
                <view class="pr-row">
                    <CkAvatar clazz="w-3em h-3em" :src="v.to.avatar"/>
                </view>
                <view class="fx-1">
                    <view class="card px-col pt pb-s">
                        <view class="fx-s">
                            <view class="fx-1" @tap="funn.detail(v)">
                                <view class="fx-s">
                                    <view class="h6">
                                        <text>{{ v.name }}&nbsp;</text>
                                    </view>
                                    <view>
                                        <UiI :clazz="'d-ib fs-s'" :i="'user'"/>&nbsp;1
                                    </view>
                                </view>
                                <view class="pt">
                                    
                                </view>
                            </view>
                        </view>
                        <view class="pt">
                            <view class="fx-s fx-t">
                                <view class="fx-1 fx-i money">
                                    <text>打赏金额:&nbsp;</text>
                                    <text class="h6 fw-800">300</text>
                                </view>
                                <OButtonOut @tap="funn.detail(v)" :weak="true" clazz="btn-rnd px py-t">详情</OButtonOut>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
import OButton from '@/cake/button/OButton.vue';
import OTag from '@/cake/button/tag/OTag.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import mock_interact from '@/server/mock/interact/mock_interact';
import mock_meizi from '@/server/mock/user/mock_meizi';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';


// const prp = defineProps<{}>()
const meizi = computed(() => {
    return mock_meizi.items
})

const aii = reactive({
    items: mock_interact.items
})

const funn = {
    detail: (v: ONE) => {
        uniRouter.gopg('interaction_detail')
    }
}
</script>