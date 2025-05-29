<template>
    <view class="pt-s">
        <view class="px-row py-row">     
            
            <view class="" >
                <view v-if="msgs && msgs.length > 0">
                    <view>
                        <view class="py-s" v-for="(v, i) in msgs" :key="i">
                            <view class="card">
                                <view class="fx-aii-btn-def py px-x2">
                                    <view class="py">
                                        <text :class="v.isAdd ? 'money' : 'err'" class="h5 fw-550">
                                            <text v-if="v.isAdd">+</text>
                                            <text v-else>-</text>
                                            <text>{{v.money}}</text>
                                        </text>
                                    </view>
                                    <view class="">
                                        <view class="tiw">
                                            您的账户于2025年5月27日，入账300元
                                        </view>
                                    </view>
                                    <view class="py">
                                        <view class="bg-hr h-1"></view>
                                    </view>
                                    <view class="fx-r">
                                        <text class="sus">{{ v.timed }}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-else class="pt-x2">
                    <CoEmpty/>
                </view>
            </view>
            
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoEmpty from '@/components/genra/empty/CoEmpty.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_msg from '@/server/mock/msg/mock_msg';
import mock_meizi from '@/server/mock/user/mock_meizi';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()

const msgs = mock_msg.sys_pays

const aii = reactive({
    i: 0
})

const funn = {
    focusyou: (v: ONE) => {
        aii.i = 0
    },
    loveyou: (v: ONE) => {
        aii.i = 1
    }
}
</script>