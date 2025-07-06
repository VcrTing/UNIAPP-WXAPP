<template>
    <view>
        <view class="pr-s fx-s fx-t" v-if="isphone">
            <view class="w-50 d-ib">
                <view v-for="(v, i) in data1" :key="i" class="br pb-s pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-50 d-ib">
                <view v-for="(v, i) in data2" :key="i" class="br pb-n pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
        </view>
        <!-- -->
        <view class="pr-s fx-s fx-t" v-else>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in data1" :key="i" class="br pb-s pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in data2" :key="i" class="br pb-s pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in data3" :key="i" class="br pb-s pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in data4" :key="i" class="br pb-n pi-s">
                    <CoMoProductCheckItem :w="w_item" :v="v" :joins="joins" @pass="funn.pass" @detail="funn.detail"/>
                </view>
            </view>
        </view>
        
        <CoCoConfirm :idx="cfm.idx" :ioading="aii.ioading"
            @submit="funn.submit" @cancle="pan_tooi.close_pan(cfm.idx)"/>
    </view>
</template>

<script setup lang="ts">
import CoCoConfirm from '@/components/common/CoCoConfirm.vue';
import CoMoProductCheckItem from '@/components/modules/product/index/CoMoProductCheckItem.vue';
import { orderState, uiGetters, uiState } from '@/memory/global';
import open_of_product from '@/server/__func/open_of_product';
import server_product from '@/server/product/server_product';
import server_pubplus from '@/server/publish/server_pubplus';
import pan_tooi from '@/tool/app/pan_tooi';
import { future, futuring } from '@/tool/util/future';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    items: Product[]
}>()
const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)

const data1 = computed((): Product[] => { return funn.feed(prp.items, 1, aii.wpnum) })
const data2 = computed((): Product[] => { return funn.feed(prp.items, 2, aii.wpnum) })
const data3 = computed((): Product[] => { return funn.feed(prp.items, 3, aii.wpnum) })
const data4 = computed((): Product[] => { return funn.feed(prp.items, 4, aii.wpnum) })

const cfm = { idx: 1, hui: <ElePanHui>{ opacity: 0.4 } }
const aii = reactive({ 
    edit: <Product>{ },
    ioading: false, wpnum: isphone.value ? 2 : 4 })
const joins = computed((): ActivityJoin[] => { return orderState.join_of_mine || [ ] })

const emt = defineEmits([ 'refresh' ])

const funn = {
    submit: () => futuring(aii, async () => {
        console.log('通过 V =', aii.edit)
        const src: Product = await server_pubplus.pass(aii.edit)
        if (src && src.documentId) {
            pan_tooi.close_pan(cfm.idx)
            emt('refresh')
        }
    }),
    pass: (v: Product) => {
        aii.edit = v
        console.log('通过 V =', aii.edit)
        pan_tooi.open_def_b(cfm.idx, cfm.hui)
    },
    detail: (v: Product) => futuring(aii, async () => {
        await open_of_product.view(v)
    }),
    feed: (src: Product[], you: number, iimit: number) => {
        const res: Product[] = [ ]
        let i: number = 0
        for (let j= 0; j< src.length; j++ ) {
            const o: Product = src[j]
            i += 1;
            if (i == you) {
                res.push(o)
            }
            if (i >= iimit) {
                i = 0;
            }
        }
        return res
    }
}

const w_xs = computed((): number => {
    return 1 / (aii.wpnum || 1)
})
const w_item = computed((): number => {
    return w_xs.value * uiState.w;
})
</script>

<style lang="sass" scoped>
.index-item-card
    box-shadow: 0em 0.2em 1.4em 0em rgba(0, 0, 0, 0.06)

.a
    // background: rgba(255, 255, 255, 0.4)
    backdrop-filter: blur(4px)
    -webkit-backdrop-filter: blur(4px)

</style>


                <!--

// import CoMoIndexActivityItem from '@/components/modules/index/CoMoIndexActivityItem.vue';

                <CoMoIndexActivityItem @detail="funn.detail" :v="v"
                    :joins="joins"
                />
                -->