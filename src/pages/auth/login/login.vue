<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
	<PageLayout>
		<LoginLayout>
			<template #bg>
				<view class="w-100 h-100">
					<CoImg :src="src" clazz="h-100"/>
				</view>
			</template>
			<view class="w-100">
				<VwLoginTop/>
				<view class="py"></view>
				<view class="py"></view>
				<view class="fx-c pt-t">
					<view class="mxw-pc-s">
						<VwLoginForm :aii="aii" @submit="funn.submit()"/>
					</view>
				</view>
				<CkSpace :h="7"/>
			</view>
		</LoginLayout>
	</PageLayout>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import LoginLayout from '@/components/layout/auth/LoginLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { authDispatch, authGetters, authState, uiState } from '@/memory/global';
import { tipwarn } from '@/tool/uni/uni-global';
import { future, futuring, promise } from '@/tool/util/future';
import { vid_phone } from '@/tool/web/vid';
import VwLoginForm from '@/view/auth/login/VwLoginForm.vue';
import VwLoginTop from '@/view/auth/login/VwLoginTop.vue';
import { nextTick, reactive } from 'vue';

const src = 'https://pic.rmb.bdstatic.com/bjh/down/VO71yj0jXIpiVpiH4RncQwcdb339b9cbdc38e7d07ffb138c8269f9.jpg?for=bg'

const aii = reactive({
	phone: '', ioading: false
})

const funn = {
	collect: () => {
		return {
			...aii,
			phonedata: <AppPhoneWX>{
				countryCode: '86',
				phoneNumber: aii.phone,
				purePhoneNumber: aii.phone
			}
		}
	},
	submit: () => futuring(aii, async () => {
		const src: ONE = funn.collect()
		
        if (!vid_phone(src.phone)) {
            tipwarn('手机号码格式不正确')
            return false
        }

		if (src.phonedata) {
			
		}
	})
}

const func = {
	reset: (src: ONE) => {

	},
	init: () => future(async () => {
		await authDispatch('auto_login')
		const p: string = authState.phonedata.phoneNumber
		if (p) {
			aii.phone = p
			// appRouter.index()
		}
	})
}

nextTick(func.init)
</script>

<style lang="sass">
@use '../../../ui/sass/app/view/__conf' as *
page, uni-page-body
	background: $bg-pag

</style>