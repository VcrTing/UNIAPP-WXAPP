<template>
    <view class="d-ib">
        <view v-if="funn.isstar()">
            <view >
                <OButton color="err" clazz="d-ib fs-s br-1" :weak="true">
                    <text class="fs-s" v-if="funn.isend()">已结束</text>
                    <text class="fs-s" v-else>已开始</text>
                </OButton>
            </view>
        </view>
        <view v-else>
            <view v-if="funn.isfull()">
                <OButton color="pri-iht" clazz="d-ib fs-s br-1" :weak="true"><text class="fs-s">爆满了</text></OButton>
            </view>
            <view v-else>
                <OButton clazz="d-ib fs-s br-1" :weak="true"><text class="fs-s">报名中</text></OButton>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import activity_tool from '@/tool/modules/activity_tool';
import join_tool from '@/tool/modules/join_tool';
import times from '@/tool/web/times';

const prp = defineProps<{
    v: Activity,
    joins?: ActivityJoin[]
}>()

const funn = {
    isjoin: () => {
        return join_tool.judge_is_join(prp.joins || [ ], prp.v)
    },
    isfull: () => {
        const r: number = activity_tool.getjoin_remaining(prp.v)
        return r <= 0
    },
    isstar: () => {
        const notv: boolean = times.bigger(prp.v.startTime)
        return !notv
    },
    isend: () => {
        const noted: boolean = times.bigger(prp.v.endTime)
        return !noted
    }
}
</script>