<template>
    <OPan :idx="loginhouse.pan_idx">
        <OPanInnerY :h="'100vh'" :idx="loginhouse.pan_idx" :orientation="'r'">
            <LoginLayout @back="pan_tooi.close_pan(loginhouse.pan_idx)">
                <template #bg>
                    <view class="w-100 h-100">
                        <CoImg :src="info.bgLogin" clazz="h-100"/>
                    </view>
                </template>
                <view class="w-100">
                    <VwLoginTop :info="info"/>
                    <view class="py"></view>
                    <view class="py"></view>
                    <view class="fx-c pt-t">
                        <view class="mxw-pc-s ani-fade-b">
                            <VwLoginForm :info="info" :aii="aii" @submit="funn.submit()"/>
                        </view>
                    </view>
                    <CkSpace :h="7"/>
                </view>
            </LoginLayout>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import OPan from '@/cake/pan/OPan.vue';
import { appState, authDispatch, authState  } from '@/memory/global';
import { tipwarn } from '@/tool/uni/uni-global';
import { futuring, promise } from '@/tool/util/future';
import { vid_phone } from '@/tool/web/vid';
import { computed, nextTick, reactive } from 'vue';
import server_auth_business from '@/server/auth/server_auth_business';
import { DEV_COUNTRY_CODE_DEF, DEV_GENERATE_SPECIAL } from '@/conf/conf-dev';
import LoginLayout from '@/components/layout/auth/LoginLayout.vue';
import VwLoginForm from '@/view/auth/login/VwLoginForm.vue';
import VwLoginTop from '@/view/auth/login/VwLoginTop.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import pan_tooi from '@/tool/app/pan_tooi';
import { storage } from '@/tool/web/storage';
import { is_nice_sn } from '@/tool/util/valued';
import { for_user_loging } from '@/conf/__for_index/for_user_loging';

const aii = reactive({ phone: '', ioading: false, ff: DEV_GENERATE_SPECIAL })
const info = computed((): AppInfo => appState.info) 

const funn = {
	collect: () => {
		return {
			...aii,
			phonedata: <AppPhoneWX>{
				countryCode: DEV_COUNTRY_CODE_DEF,
				phoneNumber: aii.phone,
				purePhoneNumber: aii.phone
			}
		}
	},
	submit: () => futuring(aii, async () => {
		const src: ONE = funn.collect()
        if (!src.phone) return false 
        //
        if (!vid_phone(src.phone)) {
            tipwarn('手机号码格式不正确。')
            return false
        }
        //
        const pd: AppPhoneWX = src.phonedata
		if (pd) {
            storage.set('AUTH_LOGIN_SEEK', pd.phoneNumber)
            const src: AuthResult = await server_auth_business.login(pd.phoneNumber, aii.ff(pd.countryCode, pd.phoneNumber))
            if (src.jwt && src.user) {
                funn.success(src, pd)
            }
		}
	}),
    success: async (src: AuthResult, phonedata: AppPhoneWX) => {
        try {
            pan_tooi.close_pan(loginhouse.value.pan_idx)
            // 
            src.phonedata = phonedata
            await authDispatch('login', src)
            //
            for_user_loging()
        }
        finally {
            pan_tooi.close_pan(loginhouse.value.pan_idx)
        }
    },
    init: () => promise(() => {
        const p: string | undefined = storage.get('AUTH_LOGIN_SEEK')
        if (is_nice_sn(p)) { aii.phone = p + ''; }
    })
}

const loginhouse = computed(() => authState.loginhouse)

defineExpose(funn)

nextTick(funn.init)
</script>