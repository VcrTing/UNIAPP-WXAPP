<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            <template #top>
                <view class="px-row pt pb-col bg-con">
                    <view class="header">邀请</view>
                    <view class="pt tis fs-n">
                        <text>您可以邀请您的粉丝，或者跳转至微信，邀请对象。</text>
                    </view>
                </view>
            </template>
            <CkSpace :h="5"/>
            <view>
                <OScrollY :styie="{ height: '38.2vh' }">
                    <CoViDataLoading :ioading="aii.ioading" :items="aii.users">
                        <view v-for="(v, i) in aii.users" :key="i">
                            <view class="py-s fx-aii-btn-def">
                                <CoMoUserInfoItem :v="v" :clazz="'px-row'">
                                    <template #r>
                                        <view v-if="funn.has(v)">
                                            <view class="pi-row py-s br-s fx-i pri">
                                                <UiI i="check" clazz="pi-s"/>
                                                已邀请</view>
                                        </view>
                                        <view v-else>
                                            <OButton @tap="funn.invite(v)" v-if="v.id"
                                            :weak="true" color="def" clazz="px-row py-s br-s">邀请</OButton>
                                        </view>
                                    </template>
                                </CoMoUserInfoItem>
                            </view>
                        </view>
                    </CoViDataLoading>
                    <CkSpace :h="2"/>
                </OScrollY>
            </view>
            <CkSpace :h="4"/>
            <template #bom>
                <view class="px-row bg-con pt-s">
                    <CoBomBtnGroup tit="分享至微信" tit_ciose="关闭" 
                        @cancle="() => pan_tooi.close_pan(idx)" @submit="funn.goo"
                    />
                </view>
            </template>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import CoMoUserInfoItem from '@/components/modules/user/CoMoUserInfoItem.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { authGetters } from '@/memory/global';
import server_invite from '@/server/activity/server_invite';
import server_user from '@/server/user/user/server_user';
import pan_tooi from '@/tool/app/pan_tooi';
import { tipsucc } from '@/tool/uni/uni-global';
import { futuring } from '@/tool/util/future';
import { arrfindi } from '@/tool/util/iodash';
import { must_arr } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    idx: number,
    one: Activity
}>()

const aii = reactive({
    users: <User[]>[ ], ioading: false
})

const invite = reactive({
    ioading: false, invites: <ActivityInvite[]> [ ]
})

const origins = computed((): ActivityInvite[] => {
    const av: Activity = prp.one
    return must_arr(av.activity_invites)
})


const funn = {
    invite: (user: User) => futuring(invite, async () => {
        // console.log('user =', user)
        const src: ActivityInvite = await server_invite.plus(prp.one, user)
        if (src && src.documentId) {
            tipsucc('邀请成功。');
            invite.invites.push(src)
            emt('result')
        }
    }),
    fetching: () => futuring(aii, async () => {
        const uss: User[] = await server_user.aii()
        if (uss.length > 0) {
            aii.users = uss
        }
    }),
    init: () => {
        funn.fetching()
        invite.invites = origins.value
    },
    goo: () => {

    },
    has: (v: User) => {
        if ((v.id + '') == authGetters.userid) { return true }
        const ivs: ActivityInvite[] = invite.invites || []
        const i: number = arrfindi(ivs, v.id, 'inviteUserId')
        if (i >= 0) {
            return true
        }
        return false
    }
}

const emt = defineEmits([ 'result' ])

nextTick(funn.init)
</script>