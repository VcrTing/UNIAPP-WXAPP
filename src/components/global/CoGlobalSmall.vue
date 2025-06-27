<template>
    <view v-if="view">
		<CoMoLoginModalSmall v-if="ismall"/>
        <CoMoLoginModalNormal v-else/>
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import CoMoLoginModalSmall from '../modules/auth/CoMoLoginModalSmall.vue';
import { authDispatch, uiGetters } from '@/memory/global';
import CoMoLoginModalNormal from '../modules/auth/CoMoLoginModalNormal.vue';
import { promise } from '@/tool/util/future';

const view = ref<boolean>(false)

const funn = {
    // 自动登录
    init: () => promise(() => {
        authDispatch('auto_login')
        setTimeout(() => { view.value = true }, 1200)
    })
}

nextTick(funn.init)

const ismall = computed(() => uiGetters.ismall)
</script>