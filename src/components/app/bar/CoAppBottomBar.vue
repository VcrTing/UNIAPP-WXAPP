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
                        <UiI clazz="" :i="v.icon" />
                    </view>
                    <view v-if="v.tit" class="mw-3em px-s pt-t soft">
                        <view class="fs-s app-bottom-bar-item-txt">{{ v.tit }}</view>
                    </view>
                </view>
            </view>

        </view>
    </OAppBottomBar>
</template>

<script setup lang="ts">
import OAppBottomBar from '@/cake/app/bar/OAppBottomBar.vue';
import { APP_BAR_JOINER } from '@/conf/conf-app';
import uniRouter from '@/tool/uni/uni-router';
import UiI from '@/ui/element/i/UiI.vue';
import { onLaunch } from '@dcloudio/uni-app';
import { computed, reactive } from 'vue';

onLaunch(() => { uni.hideTabBar({ success: () => { } }) });
defineProps<{
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

const bars = computed(() => {
    return APP_BAR_JOINER
})

</script>