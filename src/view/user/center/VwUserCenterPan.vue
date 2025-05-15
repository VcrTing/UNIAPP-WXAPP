<template>
    <view>
        <view class="py-row">
            <VwUcpNumberMsg/>
            <view class="fx-r px-row pt">
                <view class="btn px py" @tap="funn.logout">
                    <view class="fx-c pb">
                        <UiI class="h5" :i="'r'"/>
                    </view>
                    <view>退出登录</view>
                </view>
            </view>
            <!--
            <view class="fx-s">
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
                <view class="w-333">
                    <view class="px py fx-c h7">
                        <view>我的妹子</view>
                    </view>
                </view>
            </view>-->
            <view class="pt-col pb"></view>
            <view>
                <VwUcpMyLove/>
            </view>
            <view v-if="!is_publisher">
                <VwUcpRecommend/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import VwUcpMyLove from './center/VwUcpMyLove.vue';
import VwUcpRecommend from './center/VwUcpRecommend.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import VwUcpNumberMsg from './center/VwUcpNumberMsg.vue';
import UiI from '@/ui/element/i/UiI.vue';
import { authDispatch, authGetters } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';

// const prp = defineProps<{}>()

const aii = reactive({

})

const is_publisher = computed(() => authGetters.is_publisher)

const funn = {
    logout: () => {
        authDispatch('logout');
        uniRouter.launchpg('login')
    }
}
</script>