<template>
    <view class="card pa-card">
        <view class="py-col">
            <view class="header-s">搜索历史</view>
        </view>
        <OScrollY 
            :styie="{
                'height': 'calc(80vh - 30em)'
            }"
        >
            <view class="card py-col">
                <view v-for="(v, i) in tags" :key="i">
                    <ODiv :clazz="((i == aii.i) ? 'btn-def' : '') + ' px-x2 py-col br-rnd'"
                        @tap="funn.chose(v, i)">
                        <view>
                            {{ v.tit }}
                        </view>
                    </ODiv>
                </view>
            </view>
        </OScrollY>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_tags from '@/server/mock/publish/mock_tags';
import mock_meizi from '@/server/mock/user/mock_meizi';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    chose: { }, i: -1
})

const tags = computed(() => {
    return mock_tags.tags
})

const funn = {
    chose: (v: ONE, i: number) => {
        aii.chose = v; aii.i = i;
        console.log('切换选择 =', aii.i)
    }
}
</script>