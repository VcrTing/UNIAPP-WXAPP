<template>
    
    <co-app-top-bar>
        <view class="pb pt-s">
            <co-app-bar-header :i="'menu'" @tapi="funn.tapi">
                {{ menu.title ? menu.title : '我的报表' }}
            </co-app-bar-header>
        </view>
        <slot>

        </slot>
    </co-app-top-bar>
</template>

<script setup lang="ts">
import { authGetters, ulDispatch } from '@/memory/global';
import { reportDWState } from '@/pages/report/_memory/report-page-working-store';
import pan_tooi from '@/tool/app/pan_tooi';
import { futuring, promise } from '@/tool/util/future';

const prp = defineProps<{
    aii: ONE
}>()
const menu = computed(() => reportDWState.menu)

const funn = {
    tapi: () => futuring(prp.aii, async () => {
        if (authGetters.is_login) {
            ulDispatch('init_menus')
            pan_tooi.open_index_menu() 
        }
        else {
            console.log('没登录，不给打开 INDEX MENU')
        }
    }),
}
</script>