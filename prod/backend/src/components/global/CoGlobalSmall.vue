<template>
    <view v-if="view">
		<CoMoLoginModalSmall v-if="ismall"/>
        <CoMoLoginModalNormal v-else/>
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import CoMoLoginModalSmall from '../modules/auth/CoMoLoginModalSmall.vue';
import { authDispatch, authGetters, authState, uiGetters } from '@/memory/global';
import CoMoLoginModalNormal from '../modules/auth/CoMoLoginModalNormal.vue';
import { future, promise } from '@/tool/util/future';
import { tiperr, tipwarn } from '@/tool/uni/uni-global';

const view = ref<boolean>(false)


const funn = {
    // 自动登录
    init: () => future(async () => {
        await authDispatch('auto_login')
        setTimeout(() => { view.value = true }, 20);
        const io = authGetters.is_login
        const u = authState.user
        if (io) {
            if (u.phone === '13576639986') {
                tipwarn('ADMIN 登录成功')
            }
            else {
                tiperr('登录不是管理员')
            }
        }
        else {
            tipwarn('需要登录')
        }
    })
}

nextTick(funn.init)

const ismall = computed(() => uiGetters.ismall)
</script>