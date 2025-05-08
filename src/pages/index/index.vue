<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<view class="px">
		<view class="pb">
			<view class="header fw-800">HEADER. NOW FONT SIZE: {{ uiState.root_font_size_coefficient }}</view>
		</view>
		<view>
			<OButtonIht @tap="funn.goUi">前往 UI 页面. LOADING: {{ appState.ioading }}</OButtonIht>
		</view>
	</view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import { appCommit, appState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';

const funn = {
	changeLoading: () => {
		const v = appState.ioading
		appCommit('change', [ 'ioading', v == 0 ? -1 : 0 ])
	},
	goUi: () => uniRouter.gopg('ui')
}
</script>