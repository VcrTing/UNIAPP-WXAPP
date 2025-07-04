<template>
    <view class="px pb-x2">
        <view class="test-box"></view>
        <view class="test-box-2"></view>
        
        <view class="pb pt-x2">
            <view class="pb">LOADING: {{ ioading }}</view>
            <view class="pb">GETTERS.LOADING: {{ appStore.getters.is_ioading }}</view>
            <view class="pb">
                <o-button @tap="func.doing('ioading', 0)">修改 ioading = 0</o-button>
            </view>
            <view><button @tap="func.doing('ioading', -1)">修改 ioading = -1</button></view>
        </view>

        <view class="py">
            <view class="pb">MENU: {{ menu }}</view>
            <view><button @tap="func.doing('menu', menu +1)">修改 menu += 1</button></view>
            <view><button @tap="func.doing('menu', menu -1)">修改 menu -= 1</button></view>
        </view>
        
        <view class="py">
            <view class="pb">HUI: {{ hui }}</view>
            <view><button @tap="func.doing('hui', 0)">修改 hui = 0</button></view>
            <view><button @tap="func.doing('hui', -1)">修改 hui = -1</button></view>
        </view>
        
        <view class="py">
            <view class="pb">MOD: {{ mod }}</view>
            <view><button @tap="func.doing('mod', mod +1)">修改 mod += 1</button></view>
            <view><button @tap="func.doing('mod', mod -1)">修改 mod -= 1</button></view>
        </view>

        <view class="py">
            <view class="pb">PAN: {{ pan }}</view>
            <view><button @tap="func.doing('pan', pan +1)">修改 pan += 1</button></view>
            <view><button @tap="func.doing('pan', pan -1)">修改 pan -= 1</button></view>
        </view>

        <view class="">
            <o-button class="mb" @tap="uniRouter.gopg('sales_order')">跳转至销售订单</o-button>
            <o-button class="mb" @tap="uniRouter.redpg('login')">跳转至登录页面</o-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { goLogin } from '@/tool/router/router';
import { appStore, appState, appReFresh } from '../../../memory/global'
import uniRouter from '@/tool/uni/uni-router';
// const prp = defineProps<{}>()
// const state = appStore.state

const ioading = computed((): number => appState.ioading)
const menu = computed((): number => appState.menu)
const hui = computed((): number => appState.hui)
const mod = computed((): number => appState.mod)
const pan = computed((): number => appState.pan)

// mapGetters
// 没用
// const getters = mapGetters([ 'is_ioading' ])

// const actions = mapActions(appStore)

const func = {
    // doing: (name: APP_STORE_FIELD, v: number) => appDispatch('change', [ name, v])
    doing: (name: APP_STORE_FIELD, v: number) => appReFresh(name, v)
}
</script>

<style lang="sass">
.test-box
    width: 160px
    height: 1rem
    background: pink
.test-box-2
    width: 10rem
    height: 1rem
    background: pink
</style>