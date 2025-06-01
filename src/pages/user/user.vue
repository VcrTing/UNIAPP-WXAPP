<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<UserCenterLayout :h="72.8" :clazz_con="'bg-con'">
			<template #bg>
				<CoImg :src="user.background" clazz="h-100"/>
			</template>
			<template #top>
				<VwUserCenterTop/>
			</template>
			<template #con>
				<VwUserCenterPan/>
				<CoMoAuthLoginModal ref="mod"/>
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
import { authState, uiState } from '@/memory/global';
import UserCenterLayout from '@/components/layout/detail/UserCenterLayout.vue';
import { computed, reactive, ref } from 'vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoMoAuthLoginModal from '@/components/modules/auth/CoMoAuthLoginModal.vue';
import CoImg from '@/components/media/img/CoImg.vue';

const user = computed(() => authState.user)

const aii = reactive({
	
})

</script>
