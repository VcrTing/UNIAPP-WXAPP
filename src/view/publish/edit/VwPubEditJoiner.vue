<template>
    <view>
        <view class="py-col">
            <view class="py-col">
                <view class="fx-i">
                    <view v-for="(v, i) in aii.tabs" :key="i">
                        <view class="pi-inp" @tap="aii.iive = i">
                            <view :class="aii.iive == i ? 'tiw' : 'sus'">{{ v.tit }}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="pt-col">
                <view class="" v-if="aii.iive == 0">
                    <view class="pb" v-for="(v, i) in mezi" :key="i">
                        <view class="px-inp py-s">
                            <CoMoUserInfoItem :v="v" :clazz="'btn-wht btn-rnd'"
                                @tap="funn.inviteinfo(v)"
                            >
                                <template #b>
                                    <view class="fx-i">
                                        
                                        <view>
                                            <view class="" v-if="v.agree">
                                                <view :weak="true" color="succ" clazz="px-s br-t">
                                                    <text class="fs-t tis">
                                                        <text></text>
                                                        <text>已同意</text>
                                                    </text>
                                                </view>
                                            </view>
                                            <view class="pt-s" v-else>
                                                <OButton :weak="true" color="err" clazz="px-s br-t">
                                                    <text class="fs-t">等待回应</text>
                                                </OButton>
                                            </view>
                                        </view>
                                    </view>
                                </template>
                                <template #r>
                                    <view class="h-3em h7 fx-c br-cir money pr">
                                        <text>￥<text class="h6 fw-550">300</text></text>
                                    </view>
                                </template>
                            </CoMoUserInfoItem>
                        </view>
                    </view>
                    <view class="px-inp">
                        <OButtonWht @tap="funn.addgirl" clazz="bd-x2 bd-s-d w-3em h-3em br-cir fx-c" :weak="true"><UiI class="" :i="'+'"/> </OButtonWht>
                    </view>
                </view>
                <view v-else class="bg-co n">
                    <OScrollX>
                        <view class="px w-100 mh-6em">
                            <view class="w-100 fx-i pt">
                                <view class="px-s py-s br fx-aii-btn-def w-6em" v-for="(v, i) in meizis" :key="i">
                                    <CoMoActivityJoinerBlock :v="v"/>
                                </view>
                            </view>
                        </view>
                    </OScrollX>
                </view>
            </view>
        </view>

        <VwPubEditPanInviteYou ref="invite" :idx="aii.pan_invite_idx"/>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import CoMoUserInfoItem from '@/components/modules/user/CoMoUserInfoItem.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import appRouter from '@/tool/uni/app-router';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';
import VwPubEditPanInviteYou from './pan/VwPubEditPanInviteYou.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import CoMoActivityJoinerBlock from '@/components/modules/activity/CoMoActivityJoinerBlock.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';

// const prp = defineProps<{}>()
const mezi = computed(() => {
    return [ mock_meizi.items[0], mock_meizi.items[1] ]
})

const meizis = mock_meizi.items

const aii = reactive({
    tabs: [
        { tit: '邀请对象' },
        { tit: '参与者' }
    ], 
    iive: 0, pan_invite_idx: 1, pan_hui: <ElePanHui>{ opacity: 0.4 }
})

const funn = {
    inviteinfo: (v: ONE) => {
        pan_tooi.open_def_b(aii.pan_invite_idx, aii.pan_hui)
    },
    addgirl: () => {
        appRouter.chose_girl()
    }
}
</script>
                                        <!--
                                        <view class="fs-s money">
                                            <text>打赏金额</text>
                                            <text>￥<text class="h8 fw-550">300</text></text>
                                        </view>-->


                                    <!--
                                    <view class="fx-aii-btn-def w-3em h-3em h7 fx-c br-cir">
                                        <view><UiI :i="'more'"/> </view>
                                    </view>
                                    -->
                                    <!--
                                    <view>&nbsp;</view>
                                    <view class="pt-s" v-if="v.agree">
                                        <OButton :weak="true" color="succ" clazz="px-s br-t">
                                            <text class="fs-s">已同意</text>
                                        </OButton>
                                    </view>
                                    <view class="pt-s" v-else>
                                        <OButton :weak="true" color="err" clazz="px-s br-t">
                                            <text class="fs-s">等待回应</text>
                                        </OButton>
                                    </view>
                                    -->