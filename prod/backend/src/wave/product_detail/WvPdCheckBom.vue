
<template>
    <view>
        <CkSpace :h="8"/>
        <view class="w-100 bg-con softer abs-b i-0 ps-f-imp">
            <view class="mxw-pc py" :class="isphone ? '' : 'fx-s'">
                <view class="fx-i fx-1">
                    <view>
                        <OFI i="i" clazz="w-2em h-2em" @tap="uniRouter.back"/>
                    </view>
                    <view class="fx-1">
                        <input class="inp-app btn-def br-rnd" v-model="aii.remark" placeholder="审核信息"/>
                    </view>
                    <view class="pi">
                        <OButton :ioading="aii.ioading" @tap="funn.fail(v)" color="err">审核不通过</OButton>
                    </view>
                </view>
                <view class="pi">
                    <OButton :ioading="aii.ioading" @tap="funn.pass(v)" color="pri">审核通过</OButton>
                </view>
            </view>
        </view>
        
        <CoCoConfirm :idx="cfm.idx" :ioading="aii.ioading"
            @submit="funn.submit" @cancle="pan_tooi.close_pan(cfm.idx)"/>

    </view>

</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import CoCoConfirm from '@/components/common/CoCoConfirm.vue';
import { uiGetters } from '@/memory/global';
import { pageIndexDispatch } from '@/memory/page';
import server_pubplus from '@/server/publish/server_pubplus';
import pan_tooi from '@/tool/app/pan_tooi';
import { tipwarn } from '@/tool/uni/uni-global';
import uniRouter from '@/tool/uni/uni-router';
import { futuring } from '@/tool/util/future';
import { computed, reactive } from 'vue';

const prp = defineProps<{ v: Product }>()

const cfm = { idx: 1, hui: <ElePanHui>{ opacity: 0.4 } }

const isphone = computed((): boolean => uiGetters.isphone)

const aii = reactive({ 
    edit: <Product>{ }, remark: '',
    ioading: false, wpnum: isphone.value ? 2 : 4 })
    
const funn = {
    pass: (v: Product) => {
        aii.edit = v
        // console.log('通过 V =', aii.edit)
        pan_tooi.open_def_b(cfm.idx, cfm.hui)
    },
    submit: () => futuring(aii, async () => {
        console.log('通过 V =', aii.edit)
        const src: Product = await server_pubplus.pass(aii.edit)
        if (src && src.documentId) {
            await pageIndexDispatch('refresh')
            pan_tooi.close_pan(cfm.idx)
            emt('refresh')
        }
    }),
    fail: (v: Product) => futuring(aii, async() => {
        aii.edit = v
        console.log('不通过 V =', aii.edit)
        if (aii.remark && aii.remark.length >= 1) {
            const src: Product = await server_pubplus.fail(aii.edit, aii.remark)
            if (src && src.documentId) {
                await pageIndexDispatch('refresh')
                tipwarn('审核不通过成功。')
                uniRouter.back()
            }
        }
        else {
            tipwarn('审核要有文字信息。')
        }
    })
}

const emt = defineEmits([ 'refresh' ])
</script>