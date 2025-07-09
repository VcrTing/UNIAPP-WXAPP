<template>
    <image class="mxw-12em uni-img br-cir ani-scaie-aii c-p" :class="clazz"
        mode="aspectFill" @tap="funn.tomainpage"
        :src="src" v-if="src"/>
    <Ov class="mxw-12em bg-def br-cir" :clazz="clazz" v-else></Ov>
</template>

<script setup lang="ts">
import Ov from '@/cake/button/touch/Ov.vue';
import { authDispatch, soDispatch } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { future } from '@/tool/util/future';

const prp = defineProps<{
    src: string | undefined,
    id: number | string | undefined,
    clazz?: string,
    not_mainpage?: boolean
}>()

const funn = {
    __to: async (userid: any) => {
        if (userid) {
            const u: UserMainPage = await soDispatch('fetch_someone_mainpag', { userid })
            // console.log('点击到的用户主页 =', u)
            uniRouter.gopg('user_mainpage')
        }
    },

    tomainpage: () => future(async () => {
        if (prp.not_mainpage) {

        }
        else {
            funn.__to(prp.id)
        }
    })
}
</script>