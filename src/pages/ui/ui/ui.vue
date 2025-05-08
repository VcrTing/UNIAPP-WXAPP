<template>
    <view>
        <view class="px">
            <view class="pb">
                <view class="h5">HEADER</view>
                <view class="header bb-s">HEADER</view>
                <view class="header">HEADER</view>
                <view class="header fw-800">HEADER. NOW FONT SIZE: {{ uiState.root_font_size_coefficient }}</view>
            </view>
            <view>
                <OButton @tap="funn.changeLoading">OButton Primary 点击改 LOADING: {{ appState.ioading }}</OButton>
                <OButtonIht @tap="">OButton Primary Iht</OButtonIht>
            </view>
            <view class="py"></view>
            <view>
                <view class="tih">你好，Hello Good Bye.</view>
                <view class="tit">你好，Hello Good Bye.</view>
                <view class="tid">你好，Hello Good Bye.</view>
                <view class="tis">你好，Hello Good Bye.</view>
                <view class="sus">你好，Hello Good Bye.</view>
            </view>

            <view class="ps-f i-0 b-0 px py">
                <view class="btn-pri-iht br-cir" @tap="uniRouter.back()">
                    <OFI :i="'i'"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import { appCommit, appState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';

const funn = {
	changeLoading: () => {
		const v = appState.ioading
		appCommit('change', [ 'ioading', v == 0 ? -1 : 0 ])
	}
}
</script>