<template>
    <view>
        <OSafeAreaTop/>
        <view class="mh-app-top-bar"></view>
        <view class="pt">
            <OScrollX>
                <view class="pi-row ">
                    <view class="d-ib pb-row" v-for="(v, i) in menus" :key="i"
                        @click="funn.chose(v)"
                        >
                        <view class="ts py-t h7"
                            :class="funn.checkIive(v) ? v.clazz_iive : v.clazz_die">
                            <view>
                                {{ v.txt }}
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollX>
        </view>
        <view class="pt-s">
            <OScrollY :clazz="'pag-index-cont'">
                <view class="px-row pt-row">
                    <VwIndexContList/>
                </view>
            </OScrollY>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { computed, reactive } from 'vue';
import VwIndexContList from './list/VwIndexContList.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    active: '',
    menu: [
        { txt: '推荐', v: '' },
        { txt: '丝袜诱惑', v: '丝袜诱惑' },
        { txt: '私人陪玩', v: '私人陪玩' },
        { txt: '日常约会', v: '日常约会' },
        { txt: '台球派对', v: '台球派对' },
        { txt: '爬山运动', v: '爬山运动' },
    ]
})

const funn = {
    chose: (one: ONE) => {
        aii.active = one.v
    },
    checkIive: (one: ONE) => {
        const v = one.v
        return aii.active === v
    }
}

const menus = computed(() => {
    const ms = aii.menu
    return ms.map(e => {
        return {
            ...e, 
            clazz_die: 'px-n',
            clazz_iive: 'px-row btn-pri-iht br-x3',
        }
    })
})
</script>

<style lang="sass" scoped>


.pag-index-cont
	height: calc( 100vh - 12em )
    
</style>