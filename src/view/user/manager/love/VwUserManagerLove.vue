<template>
    <view class="pt">
        <view class="bg-con">
            <view class="py">
            <CoViDataLoading :ioading="aii.ioading" :items="aii.loves">
                <view class="" v-for="(v, i) in aii.loves" :key="i">
                    <view class="px-row py">
                        <view class="fx-s">
                            <view class="fx-1">
                                <CoMoUserInfo :v="v.love" :clazz="'h4 pr-s'"/>
                            </view>
                            <view v-if="v.__love">
                                <OButton color="def" @tap="funn.losslove(v)" :weak="true" clazz="py-s px-col br-s">
                                    <view class="fx-c">
                                        <!--<UiI i="love"/>-->
                                        <text>已关注</text>
                                    </view>
                                </OButton>
                            </view>
                            <view v-else>
                                <OButton color="err" @tap="funn.loveyou(v)" :weak="true" clazz="py-s px-col br-s">
                                    <view class="fx-c">
                                        <UiI i="love"/>
                                        <text>关注</text>
                                    </view>
                                </OButton>
                            </view>
                        </view>
                    </view>
                </view>
            </CoViDataLoading>
                
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import server_love from '@/server/user/love/server_love';
import { future, futuring, promise } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { nextTick, reactive } from 'vue';

const aii = reactive({
    i: 0, ioading: false, loves: <UserLove[]>[ ]
})

const funn = {
    losslove: (v: UserLove) => future(async () => {
        const src: UserLove = await server_love.losslove(v)
        if (src && src.id) { v.__love = false }
    }),
    loveyou: (v: UserLove) => future(async () => {
        const src: UserLove = await server_love.focuslove(v.loveId)
        if (src && src.id) { v.__love = true }
    }),

    fetch: () => futuring(aii, async () => {
        const us: UserLove[] = await server_love.myloves()
        if (us) {
            aii.loves = us.map(e => { (e.__love = true); return e})
        }
    }),
    init: () => promise(() => {
        funn.fetch()
    })
}

nextTick(funn.init)
</script>