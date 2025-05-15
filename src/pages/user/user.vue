<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<UserCenterLayout>
			<template #bg>
				<image mode="aceptFit" class="uni-img w-100 h-100"
					:src="user.background"/>
					
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
import { authState, uiState } from '@/memory/global';
import UserCenterLayout from '@/components/layout/detail/UserCenterLayout.vue';
import { computed } from 'vue';

const user = computed(() => authState.user)
</script>