<template>
    <view class="w-100">
        <view class="" v-if="is_publisher">
            <CoBomBackBtn :clazz="'btn-wht-s'"/>
        </view>
        <view v-else class="fx-s w-100 bg-con">
            <view class="fx-1 fx-i">
                <view class="ta-c pt-s pb-s fx-aii-btn-def" @tap="uniRouter.back">
                    <view class="px-x2 h-1em h8">
                        <UiI i="i" clazz=""/>
                    </view>
                    <view class="tis pt-s"><text class="fs-s">返回</text></view>
                </view>
                <view class="ta-c pt-s pb-s fx-aii-btn-def" @tap="funn.share">
                    <view class="px-x2 h-1em h8">
                        <UiI i="share" clazz=""/>
                    </view>
                    <view class="tis pt-s"><text class="fs-s">分享</text></view>
                </view>
            </view>
            <view class="px-row w-618">
                <OButton v-if="isjoin" clazz="btn-app"
                    color="def" @tap="uniRouter.back"
                >
                    <text>您已经报名</text>
                </OButton>
                <OButton v-else
                    :ioading="aii.ioading"
                    clazz="btn-app" @tap="funn.join">
                    <text class="">
                        <text class="h8">￥</text>
                        <text class="h7 fw-550">{{ one.fee }}</text>
                        <text>元，</text>
                    </text>
                    <text>上车</text>
                </OButton>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import { authGetters, needLogin, orderReFresh } from '@/memory/global';
import activity_tool from '@/tool/modules/activity_tool';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { future, futuring } from '@/tool/util/future';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{ one: Activity, user: User, isjoin: boolean }>()

const is_publisher = computed((): boolean => {
    const puber: User = must_one(prp.one.publisher)
    const uid: string = authGetters.userid
    return ((puber.id + '') === uid);
})

const aii = reactive({
    ioading: false
})

const funn = {
    submit: async () => {
        const order = {
            one: prp.one,
            joiner: prp.user,
            msg: {
                createTime: new Date(),
            }
        }
        orderReFresh('order_of_place', order); uniRouter.gopg('activity_order')
    },
    vid: () => {
        const newset: Activity = prp.one || { }
        const startTime = newset.startTime
        const isbg = times.bigger(startTime)
        if (isbg) {
            tipwarn('该活动已经开始了，无法在报名参加了。')
            return false;
        }
        const less: number = activity_tool.getjoin_remaining(newset)
        if (less <= 0) {
            tipwarn('该活动太火爆，已经满员了。')
            return false;
        }
        return true;
    },
    join: () => futuring(aii, async () => {
        if (await needLogin()) {
            console.log('需要登录')
        }
        else {
            if (funn.vid()) {
                funn.submit()
            }
        }
    }),
    //
    share: () => {
        console.log('SHARE')
    }
}
</script>