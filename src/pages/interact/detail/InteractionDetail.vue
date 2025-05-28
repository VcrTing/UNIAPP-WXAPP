<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<UserFaceLayout :h="74">
			<template #bg>
				<image mode="aspectFill" class="uni-img w-100 h-100"
					:src="user.background"/>
			</template>
			<template #top>
                <CoAppTopBackBar @back="uniRouter.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
			</template>
			<template #con>
                <VwInteractUserInfo :user="user"/>
                <VwInteractMoney />
                <VwInteractCon />
                <CkSpace :h="2"/>

                <CkSpace :h="4"/>
                <view class="abs-bi w-100 ps-f-imp px-row">
                    <CoBomBtnGroup @cancle="uniRouter.back" :tit="'同意 / 下一步'"/>
                    <OSafeAreaBottom/>
                </view>
			</template>
		</UserFaceLayout>
	</PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/layout/page/PageLayout.vue';
import VwUserCenterTop from '@/view/user/center/VwUserCenterTop.vue';
import { authState, uiState } from '@/memory/global';
import { computed } from 'vue';
import UserFaceLayout from '@/components/layout/detail/UserFaceLayout.vue';
import VwInteractUserInfo from '@/view/interact/detail/VwInteractUserInfo.vue';
import CoBomCenterBtn from '@/components/element/button/CoBomCenterBtn.vue';
import VwInteractMoney from '@/view/interact/detail/VwInteractMoney.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import uniRouter from '@/tool/uni/uni-router';
import VwInteractCon from '@/view/interact/detail/VwInteractCon.vue';
import OButton from '@/cake/button/OButton.vue';
import OFI from '@/cake/button/i/OFI.vue';
import CoMoUserOptionBtn from '@/components/modules/user/CoMoUserOptionBtn.vue';
import CoBomBtnGroup from '@/components/element/button/CoBomBtnGroup.vue';
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';

const user = computed(() => authState.user)
</script>