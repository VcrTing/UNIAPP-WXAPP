<template>
    <view>
        <view class="card pa-card">
            <view class="header-s py-col">邀请对象</view>
            <view class="pt-col">
                <view class="">
                    <view class="pb" v-for="(v, i) in mezi" :key="i">
                        <ODiv>
                            <CoMoUserInfo :v="v">
                                <OButton :weak="true" color="err" clazz="w-3em h-3em br-cir">
                                    <UiI :i="'trash'"/>
                                </OButton>
                            </CoMoUserInfo>
                        </ODiv>
                    </view>
                    <view class="" @tap="funn.addgirl">
                        <OButtonDef clazz="bd-x2 bd-s-d w-3em h-3em br-cir fx-c" :weak="true"><UiI class="" :i="'+'"/> </OButtonDef>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()
const mezi = computed(() => {
    return [ mock_meizi.items[0], mock_meizi.items[1] ]
})

const funn = {
    addgirl: () => {
        appRouter.chose_girl()
    }
}
</script>