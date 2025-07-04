<template>
    <OPan :idx="loginhouse.pan_idx">
        <OPanInnerY :h="'38.2vh'" :idx="loginhouse.pan_idx" :orientation="'b'">
            <view class="py-row">
                <!-- 
                <view class="ta-c">
                    <text v-if="!is_login">未登录</text>
                    <text v-if="is_login">已登录</text>
                </view>
                -->
            </view>
            <view class="px-row" v-if="!is_login">
                <view v-if="aii.next == 0">
                    <VwLoginModUnreal v-if="hasdoc" @next="funn.next"/>
                    <VwLoginModInit v-else @next="funn.next"/>
                </view>
                <VwLoginModCon v-else-if="aii.next == 1" :user="aii.user" @back="() => aii.next = 0"/>
            </view>
            <view v-else>
                <VwLoginModLogined />
            </view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { appState, authDispatch, authGetters, authState, eleState, uiState } from '@/memory/global';
import uniSmall from '@/tool/uni/uni-small';
import { futuring, promise } from '@/tool/util/future';
import VwLoginModCon from '@/view/auth/content/VwLoginModCon.vue';
import { computed, nextTick, onMounted, reactive, watch } from 'vue';
import VwLoginModInit from '@/view/auth/content/VwLoginModInit.vue';
import VwLoginModLogined from '@/view/auth/content/VwLoginModLogined.vue';
import mock_login from '@/server/mock/mock_login';
import VwLoginModUnreal from '@/view/auth/content/VwLoginModUnreal.vue';
import server_user from '@/server/user/user/server_user';

const aii = reactive({
    hasinfo: false, next: 0, phone: '', ioading: false,
    user: <User> { }
})

const hasdoc = computed((): boolean => appState.document)

watch(() => authGetters.__fresh, () => { console.log('refresh') })

const common = {
    phonesucc: (src: AppPhoneWX) => {
        aii.phone = src.phoneNumber
        console.log('登录用户的电话 =', src)
        authDispatch('change', [ 'phone', src.phoneNumber ])
    },
    tokensucc: (code: string) => {
        // common.getUserPhone(code)
        mock_login.getphone_bycode((res: AppPhoneWX) => {
            common.phonesucc(res)
        })
    }
}

const funn = {
    init: () => promise(() => {

        aii.next = 0

        /*
        if (is_login.value) {
            console.log('已经登录了')
            aii.next = 1
        }
        else {
            const mk: ONE | null = mock_login.gettoken()
            if (mk && mk.code) {
                common.tokensucc(mk.code)
            }
            else {
                funn.wx_token()
            }
        }
        */
    }),

    wx_token: () => {
        uniSmall.gettoken((succ: ONE, code: string) => {
            console.log('小程序，获取用户数据成功 =', succ)
            common.tokensucc(code)
        },
        (err: ONE) => {
            console.log('err =', err)
        })
    },
    next: (phonedata: AppPhoneWX) => futuring(aii, async () => {
        console.log('切换这个 phonedata =', phonedata)
        authDispatch('change', [ 'phonedata', phonedata ])
        const u: User = await server_user.byphone(phonedata.phoneNumber);
        console.log('u =', u)
        if (u && u.id) {
            aii.user = u
            aii.next = 1
        }
    })
}

const loginhouse = computed(() => authState.loginhouse)
const is_login = computed(() => authGetters.is_login)

nextTick(funn.init)

defineExpose(funn)
</script>