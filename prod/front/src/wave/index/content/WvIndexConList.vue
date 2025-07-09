<template>
    <view class="pr-s fx-s fx-t">
        <view class="w-50 d-ib">
            <view v-for="(v, i) in first" :key="i" class="br pb-s pi-s softer"
            >
                <CoMoIndexProductItem :w="w_item"
                    :v="v" :joins="joins" @detail="funn.detail"/>
            </view>
        </view>
        <view class="w-50 d-ib">
            <view v-for="(v, i) in last" :key="i" class="br pb-n pi-s softer"
            >
                <CoMoIndexProductItem :w="w_item"
                    :v="v" :joins="joins" @detail="funn.detail"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoIndexProductItem from '@/components/modules/product/index/CoMoIndexProductItem.vue';
import { orderState, uiGetters, uiState } from '@/memory/global';
import open_of_product from '@/server/__func/open_of_product';
import { future, futuring } from '@/tool/util/future';
import { computed, reactive } from 'vue';

const prp = defineProps<{ items: Product[] }>()

const first = computed((): Product[] => {
    return funn.feed(prp.items, 1, aii.wpnum)
})
const last = computed((): Product[] => {
    return funn.feed(prp.items, 2, aii.wpnum)
})

const aii = reactive({ ioading: false, wpnum: 2 })
const joins = computed((): ActivityJoin[] => {
    return orderState.join_of_mine || [ ]
})

const funn = {
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

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
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