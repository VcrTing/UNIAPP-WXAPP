<template>
    <view>
        <view class="py">
            <view class="fx-c">
                <text>选择：{{ unreal.phoneNumber }}</text>
            </view>
        </view>
        <view class="">
            <view class="w-100">
                <view class="pt">
                    <OButton clazz="btn-app" @tap="switchUser(0)">
                        <view class="">切换“administrator”</view>
                    </OButton>
                </view>
                <view class="pt">
                    <OButton color="pri-iht" clazz="btn-app" @tap="switchUser(1)">
                        <view class="">切换“一颗甜草莓”</view>
                    </OButton>
                </view>
                <view class="pt">
                    <OButton color="pri-out" clazz="btn-app" @tap="switchUser(2)">
                        <view class="">切换“龙华馨妍 - 06在校兼职”</view>
                    </OButton>
                </view>
            </view>
            <view>
                <view class="pt-x2">
                    <OButton color="def" clazz="btn-app" @tap="emt('next', unreal)">
                        <view class="">下一步</view>
                    </OButton>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import { USER_DEF, USER_TEST } from '@/conf/conf-role';
import { authDispatch, authState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import { computed } from 'vue';

// const prp = defineProps<{}>()
const loginhouse = computed(() => authState.loginhouse)

const unreal = computed(() => authState.__unreal)

const switchUser = (i: number = 0) => {
    const fk: AppPhoneWX = USER_TEST[ i + '' ]
    authDispatch('change', [ '__unreal', fk ])
    // pan_tooi.close_pan(loginhouse.value.pan_idx)
}

const emt = defineEmits([ 'next' ])
</script>