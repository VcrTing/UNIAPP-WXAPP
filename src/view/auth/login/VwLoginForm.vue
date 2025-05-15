<template>
    <view class="w-100">
        <view class="">
            <OButtonDef @tap="funn.login(0)" :clazz="'br-x3 w-100 mh-btn'">登录发起者</OButtonDef>
            <view class="py-s"></view>
            <OButton @tap="funn.login(1)" :clazz="'br-x3 w-100 mh-btn'">登录参与者</OButton>
            <view class="pt-s"></view>
            <view class="pt">
                <view class="fx-c fs-s tis">
					<radio class="" :value="'true'" :checked="aii.agree" />
                    <view>已同意并阅读<text class="pri">《约拍服务协议》</text><text class="pri">《隐私政策》</text></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import { authDispatch } from '@/memory/global';
import mock_user from '@/server/mock/user/mock_user';
import uniRouter from '@/tool/uni/uni-router';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    agree: 'true'
})

const funn = {
    login: (i: number) => {
        authDispatch('login', (i == 1) ? mock_user.boy : mock_user.girl)
        uniRouter.navigatorpg('user')
    }
}

</script>