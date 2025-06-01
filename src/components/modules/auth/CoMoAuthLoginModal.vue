<template>
    <OPan :idx="loginhouse.pan_idx">
        <OPanInnerY :h="'38.2vh'" :idx="loginhouse.pan_idx" :orientation="'b'">
            <view class="py-row">
                
            </view>
            <view class="px-row" v-if="is_login">
                <VwLoginModInit v-if="aii.next == 0"/>
                <VwLoginModCon v-else-if="aii.next == 1"/>
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
import { authDispatch, authGetters, authState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniSmall from '@/tool/uni/uni-small';
import { promise } from '@/tool/util/future';
import VwLoginModCon from '@/view/auth/content/VwLoginModCon.vue';
import { computed, onMounted, reactive, watch } from 'vue';
import VwLoginModInit from '@/view/auth/content/VwLoginModInit.vue';
import VwLoginModLogined from '@/view/auth/content/VwLoginModLogined.vue';
import mock_login from '@/server/mock/mock_login';
import { tipsucc } from '@/tool/uni/uni-global';


const aii = reactive({
    hasinfo: false, next: 0, phone: ''
})


watch(() => authGetters.__fresh, () => {
    console.log('refresh')
    funn.open()
})

const common = {
    phonesucc: (phone: string) => {
        aii.phone = phone
        authDispatch('change', [ 'phone', phone ])
    },
    tokensucc: (code: string) => {
        // common.getUserPhone(code)
        mock_login.getphonebycode((res: ONE) => {
            common.phonesucc(res.phoneNumber)
        })
    }
}

const funn = {
    init: () => promise(() => {
        if (is_login.value) {
            console.log('已经登录了')
        }
        else {
            const mk = mock_login.gettoken()
            if (mk) {
                common.tokensucc(mk.code)
            }
            else {
                funn.gettoken()
            }
        }
    }),

    gettoken: () => {
        uniSmall.gettoken((succ: ONE, code: string) => {
            console.log('获取用户数据成功 =', succ)
            common.tokensucc(code)
        },
        (err: ONE) => {
            console.log('err =', err)
        })
    },
    open: () => {
        console.log('funn.open ===========')
        if (aii.hasinfo) {

        }
        else {
        }
    },
    iive: (v: boolean) => promise(() => {
        
    })
}

const loginhouse = computed(() => authState.loginhouse)
const is_login = computed(() => authGetters.is_login)
onMounted(funn.init)

defineExpose(funn)
</script>