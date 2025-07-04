<template>
    <view class="">
        <view class="pt-s bg-hui"></view>
        <view class="">
            <view class="bg-con">
                <CoMoActivityPublisherTitle :one="one" :invites="invites" @go="funn.open"/>
                <OScrollX>
                    <view class="pb-s pt-s px-row">
                        <view class="fx-i">
                            <view class="w-20 d-ib fx-c">
                                <CoMoActivityJoinerBtn @tap="funn.open"/>
                            </view>
                            <view class="w-20 d-ib" v-for="(v, i) in members" :key="i">
                                <view class="fx-aii-btn-def pt-s br-s">
                                    <CoMoActivityJoinerBlock :v="v"/>
                                </view>
                            </view> 
                        </view>
                    </view>
                </OScrollX>
            </view>
        </view>
        <VwAdInvitePan :idx="pan_ivt.idx" :one="one"/>
    </view>
</template>

<script setup lang="ts">
import CoMoActivityJoinerBlock from '@/components/modules/activity/CoMoActivityJoinerBlock.vue';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import CoMoActivityJoinerBtn from '@/components/modules/activity/CoMoActivityJoinerBtn.vue';
import VwAdInvitePan from '../pan/VwAdInvitePan.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoMoActivityPublisherTitle from '../component/CoMoActivityPublisherTitle.vue';
import { promise, timeout } from '@/tool/util/future';

const prp = defineProps<{
    one: Activity, joiners: ActivityJoin[]
}>()

const invites = computed((): ActivityInvite[] => {
    const av: Activity = prp.one
    return must_arr(av.activity_invites)
})

const members = computed((): User[] => {
    let src = invites.value; // mock_meizi.items
    if (src && src.length >= 5) {
        src = must_arr([
            src[0], src[1], src[2], src[3]
        ])
    }
    return src.map((e: ActivityInvite) => {
        return e.invite_user
    })
})

const pan_ivt = { idx: 14, hui: <ElePanHui>{ opacity: 0.4 } }

const funn = {
    open: () => {
        pan_tooi.open_def_b(pan_ivt.idx, pan_ivt.hui)
    },
    
    init: () => promise(() => {
        timeout(() => {

        })
    })
}
</script>

        <!--
        <CoMoActivityJoinerBlockMore v-if="last" :user="last" clazz="w-20"/>
        -->