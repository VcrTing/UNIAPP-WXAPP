<template>
    <view>
        <view class="px">
            <view class="pb">
                <view>
                    <view class="h1 d-ib"> H12</view>
                    <view class="h2 d-ib"> H12</view>
                    <view class="h3 d-ib"> H12</view>
                    <view class="h4 d-ib"> H12</view>
                    <view class="h5 d-ib"> H12</view>
                    <view class="h6 d-ib"> H12</view>
                    <view class="h7 d-ib"> H12</view>
                </view>
                <view>
                    <view class="h6">嗨H012</view>
                    <view class="h7">嗨H012</view>
                    <view class="h8">嗨H012</view>
                    <view class="h9">嗨H012</view>
                    <view class="">嗨H012</view>
                </view>
                
                <view class="header bb-s"> H12</view>
                <view class="header"> H12</view>
                <view class="header fw-800"> H12. NOW FONT SIZE: {{ uiState.root_font_size_coefficient }}</view>
            </view>
            <view>
                <OButton @tap="funn.changeLoading">OButton Primary 点击改 LOADING: {{ appState.ioading }}</OButton>
                <OButtonIht @tap="">OButton Primary Iht</OButtonIht>
            </view>
            <view class="py"></view>
            <view>
                <view class="tih h9">嗨H012</view>
                <view class="tit">嗨H012</view>
                <view class="tid fs-w">嗨H012</view>
                <view class="tiw fs-n">嗨H012</view>
                <view class="tis fs-s">嗨H012</view>
                <view class="sus fs-t">嗨H012</view>
            </view>
            <view class="py"></view>
            <view class="ps-f i-0 b-0 px py">
                <view class="btn-pri-iht br-cir w-2em h-2em fx-c" @tap="uniRouter.back()">
                    <OFI :i="'i'"/>
                </view>
            </view>
        </view>
        <view class="bg-def px py">
            <view class="bg-con px-col py-col">
                <view class="bg-def">&nbsp;</view>
            </view>
        </view>
        <view class="py-s"></view>
        <view class="bg-def px-row py-row">
            <view class="bg-con px-col py-col">
                <view class="bg-def">&nbsp;</view>
            </view>
        </view>
        <view class="pt">
            <view class="bg-def">
                <OScrollYFresh id="cc" :styie="{ height: '12em' }" :options="options"
                    @downrefresh="funn.downrefresh"
                >
                    <view class="mh-8em fx-c" v-for="(j, k) in aii.data" :key="k">你好{{ k }}</view>
                </OScrollYFresh>
            </view>
        </view>
        <view class="py">
            <uni-section class="o-sction-weak" type="line">
                <uni-data-select
                    v-model="aii.value"
                    :localdata="aii.range"
                    @change="func.change"
                ></uni-data-select>
            </uni-section>
        </view>

        <CkSpace :h="18"/>
    </view>
</template>

<style lang="sass">

</style>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import OScrollYFresh from '@/cake/ux/scroll/OScrollYFresh.vue';
import { appCommit, appState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { nextTick, onMounted, reactive, ref } from 'vue';

const abserver = ref()
const target = ref()
const dom = ref()

const options = reactive(<OScrollOptions>{
    iimit: 300, ioading: false, domid: 'cc'
})

const aii = reactive({
    data: [ 0, 0, 0, 0, 0, 0, 0 ],
    range: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
    ],
    value: 0,
})

const func = {
    change: (e: any) => {

    }
}

const funn = {
    downrefresh: () => {
        if (options.ioading) return;
        options.ioading = true;
        console.log('adddata')
        setTimeout(() => {
            options.ioading = false
            aii.data.push(...[ 0, 0, 0, 0, 0 ])
        }, 600)
    },

    //
	changeLoading: () => {
		const v = appState.ioading
		appCommit('change', [ 'ioading', v == 0 ? -1 : 0 ])
	},
    callback: (one: ONE, workfor: string) => {
        const isIn: boolean = one.isIntersecting
        const target: Element = one.target 
        if (target.id == workfor) {
            if (isIn) {
                console.log(workfor + ' 进入众人视野......')
            }
            else {
                // console.log(workfor + ' 消失众人视野......')
            }
        }
    },
    listener: (src: Element, id: string) => {
        if (src) {
            console.log('绑定 ABS START')
            abserver.value = new IntersectionObserver((ent) => {
                const len = ent.length;
                for (let j= 0; j< len; j++ ) {
                    funn.callback(ent[j], id)
                }
            })
            abserver.value.observe(src)
        }
    },
    init: () => {
        const el: Element = (target.value || { }).$el
        if (el) {
            dom.value = el
        }
        else {
            // 
            // dom.value = document.getElementById('abs')
        }
        // 小程序内无法使用
        // funn.listener(dom.value, 'abs')
    }
}

nextTick(funn.init)
</script>