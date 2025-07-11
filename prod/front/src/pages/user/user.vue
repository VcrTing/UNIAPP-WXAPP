<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<UserCenterLayout :h="72.8" :clazz_con="''">
			<template #bg>
				<CoImg :src="user.background || info.userDefBackground" clazz="h-100"/>
			</template>
			<template #top>
				<VwUserCenterTop/>
			</template>
			<template #con>
				<VwUserCenterPan/>
			</template>
		</UserCenterLayout>
		<CoAppBottomBar :mat="false"/>
	</PageLayout>
</template>

<script setup lang="ts">
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import PageLayout from '../../components/layout/page/PageLayout.vue';
import VwUserCenterPan from '@/view/user/center/VwUserCenterPan.vue';
import VwUserCenterTop from '@/view/user/center/VwUserCenterTop.vue';
import { appState, authState, uiState } from '@/memory/global';
import UserCenterLayout from '@/components/layout/detail/UserCenterLayout.vue';
import { computed, nextTick, reactive, ref } from 'vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { promise, timeout } from '@/tool/util/future';
import { for_user_joing } from '@/conf/__for_index/for_user_loging';
//
const user = computed(() => authState.user)
const funn = {
	init: () => promise(() => {
        timeout(() => { for_user_joing() }, 600)
	})
}
nextTick(funn.init)

const info = computed((): AppInfo => appState.info) 
</script>
