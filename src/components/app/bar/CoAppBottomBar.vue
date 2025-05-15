<template>
    <OAppBottomBar :mat="mat">
        <view class="fx-c px-row px-x2 w-100 ta-c jc-sa">

            <view 
                class="d-ib app-bottom-bar-item fx-c br-br br-bi"
                v-for="(v, i) in bars" :key="i"
                :class="(code == v.respond_standard_code) ? 'app-bottom-bar-item-iive ' + v.clazz_iive : v.clazz_die"
                @tap="v.func()"
                >
                <view class="pt-s">
                    <view class="app-bottom-bar-item-icon h5">
                        <UiI :i="v.icon" />
                    </view>
                    <view v-if="v.tit" class="mw-3em px-s pt-t soft">
                        <view class="h9">{{ v.tit }}</view>
                    </view>
                </view>
            </view>

        </view>
    </OAppBottomBar>
</template>

<script setup lang="ts">
import OAppBottomBar from '@/cake/app/bar/OAppBottomBar.vue';
import { APP_BAR_JOINER, APP_BAR_PUBLISHER } from '@/conf/conf-app';
import { authGetters, ulDispatch } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { onLaunch } from '@dcloudio/uni-app';
import { computed, reactive } from 'vue';

onLaunch(() => { uni.hideTabBar({ success: () => { } }) });
const prp = defineProps<{
    mat?: boolean
}>()

const rt = computed((): string => {
    const info: Page.PageInstance = uniRouter.info()
    return info.route ? info.route : ''
})

const code = computed((): string => {
    const n: string = rt.value
    const src: CoAppBottomBarItem[] = bars.value
    for (let i= 0; i< src.length; i ++) {
        const _code: string = src[i].respond_standard_code
        if (n.indexOf(_code) > -1) { return _code }
    }
    return ''
})

const me = reactive({
    bars: [ ]
})

const is_publisher = computed(() => authGetters.is_publisher)
const bars = computed(() => {
    return is_publisher ? APP_BAR_PUBLISHER : APP_BAR_JOINER
})

const aii = reactive({
    ioading: false
})

const funn = {
    // 打开首页 MENU
    index_manu: () => futuring(aii, async () => {
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