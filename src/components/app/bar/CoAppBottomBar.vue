<template>
    <o-app-bottom-bar>
        <view class="fx-s pb-n px-row w-100 ta-c">

            <view 
                class="d-ib app-bottom-bar-item fx-c br-br br-bi"
                v-for="(v, i) in me.bars" :key="i"
                :class="(code == v.respond_standard_code) ? 'app-bottom-bar-item-iive ' + v.clazz_iive : v.clazz_die"
                @tap="v.func()"
                >
                <view>
                    <view class="app-bottom-bar-item-icon h5">
                        <ui-i :i="v.icon" />
                    </view>
                    <view v-if="v.tit" class="mw-3em px-s pt-t soft">
                        <view class="h9">{{ v.tit }}</view>
                    </view>
                </view>
            </view>

        </view>
    </o-app-bottom-bar>
</template>

<script setup lang="ts">
import { authGetters, ulDispatch } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';

// const prp = defineProps<{}>()

const rt = computed((): string => {
    const info: Page.PageInstance = uniRouter.info()
    return info.route ? info.route : ''
})

const code = computed((): string => {
    const n: string = rt.value
    const src: CoAppBottomBarItem[] = me.bars
    for (let i= 0; i< src.length; i ++) {
        const _code: string = src[i].respond_standard_code
        if (n.indexOf(_code) > -1) { return _code }
    }
    return ''
})

const me = reactive({
    bars: <CoAppBottomBarItem[]> [
        {
            tit: '首页',
            icon: 'home',
            icon_iive: 'home',
            path: 'pages/index/index',
            respond_standard_code: 'index',
            clazz_die: '',
            clazz_iive: 'app-bottom-bar-item-iive',
            func: () => {
                uniRouter.navigatorpg('index')
            }
        },
        {
            tit: '报表',
            icon: 'report',
            icon_iive: 'report',
            path: 'pages/report/report',
            respond_standard_code: 'report',
            clazz_die: '',
            clazz_iive: 'app-bottom-bar-item-iive',
            func: () => {
                uniRouter.navigatorpg('report')
            }
        },
        {
            tit: '',
            icon: 'menu',
            icon_iive: 'menu',
            path: '',
            respond_standard_code: 'menu',
            clazz_die: 'app-bottom-bar-btn',
            clazz_iive: 'app-bottom-bar-item-iive',
            func: () => {
                funn.index_manu()
            }
        },
        {
            tit: '表单',
            icon: 'form',
            icon_iive: 'form',
            path: 'pages/form/form',
            respond_standard_code: 'form',
            clazz_die: '',
            clazz_iive: 'app-bottom-bar-item-iive',
            func: () => {
                uniRouter.navigatorpg('form')
            }
        },
        {
            tit: '我的',
            icon: 'user',
            icon_iive: 'user-f',
            path: 'pages/user/user',
            respond_standard_code: 'user',
            clazz_die: '',
            clazz_iive: 'app-bottom-bar-item-iive',
            func: () => {
                uniRouter.navigatorpg('user')
            }
        },
    ]
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