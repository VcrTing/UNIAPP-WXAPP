<template>
    <view class="px-row py-row">
        <view class="pb-row"
            v-for="(v, i) in aii.items" :key="i"
        >
            <view class="card px-col pt pb">
                <view class="fx-s">
                    <view class="fx-1" @tap="funn.detail(v)">
                        <view class="h6 fx-i">
                            <text>{{ v.name }}&nbsp;</text>
                        </view>
                    </view>
                    <view>
                        <view class="fx-r">
                            <ODiv clazz="err bg-err fs-s px-s py-t br-s">等待回应</ODiv>
                            <view class="pi-s"></view>
                            <CkAvatar clazz="w-2em h-2em" :id="0" :src="v.to.avatar"/>
                        </view>
                    </view>
                </view>
                <view class="pt-row" @tap="funn.detail(v)">
                    <view class="fx-s">
                        <view class="money fw-550">
                            <text><text>￥</text><text class="h7 fw-800">{{ v.money }}</text></text>
                            <text>&nbsp;</text>
                        </view>
                        <view class="tis fs-s">
                            <view>上周六发起</view>
                        </view>
                    </view>
                </view>
            </view>
            <view>

            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
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