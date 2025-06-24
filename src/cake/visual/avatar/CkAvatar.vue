<template>
    <image class="mxw-12em uni-img br-cir ani-scaie-aii c-p" :class="clazz"
        mode="aspectFill" @tap="funn.tomainpage"
        :src="src" v-if="src"/>
    <view class="mxw-12em bg-def fx-aii-btn-def br-cir ani-scaie-aii" :class="clazz" v-else></view>
</template>

<script setup lang="ts">
import { authDispatch } from '@/memory/global';
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
            const u: UserMainPage = await authDispatch('fetch_someone_mainpag', { userid })
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