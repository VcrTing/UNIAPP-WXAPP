<template>
    <view class="mxw-pc">
        <view v-if="isphone" class="pr-s fx-s fx-t">
            <view class="w-50 d-ib">
                <view v-for="(v, i) in ps1" :key="i" class="br pb-s pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-50 d-ib">
                <view v-for="(v, i) in ps2" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
        </view>
        <view v-else-if="ispad" class="pr-s fx-s fx-t">
            <view class="w-25 d-ib">
                <view v-for="(v, i) in ps1" :key="i" class="br pb-s pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in ps2" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in ps3" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-25 d-ib">
                <view v-for="(v, i) in ps4" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
        </view>
        <view v-else class="pr-s fx-s fx-t">
            <view class="w-20 d-ib">
                <view v-for="(v, i) in ps1" :key="i" class="br pb-s pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-20 d-ib">
                <view v-for="(v, i) in ps2" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-20 d-ib">
                <view v-for="(v, i) in ps3" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-20 d-ib">
                <view v-for="(v, i) in ps4" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
            </view>
            <view class="w-20 d-ib">
                <view v-for="(v, i) in ps5" :key="i" class="br pb-n pi-s softer">
                    <CoMoIndexProductItem :w="w_item" :v="v" :joins="joins" @detail="funn.detail"/>
                </view>
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

const isphone = computed((): boolean => uiGetters.isphone)
const ispad = computed((): boolean => uiGetters.ispad)
const ispc = computed((): boolean => uiGetters.ispc)

const wpnum = computed((): number => {
    if (isphone.value) return 2;
    if (ispad.value) return 4;
    return 5
})

const ps1 = computed((): Product[] => { return funn.feed(prp.items, 1, wpnum.value) })
const ps2 = computed((): Product[] => { return funn.feed(prp.items, 2, wpnum.value) })
const ps3 = computed((): Product[] => { return funn.feed(prp.items, 3, wpnum.value) })
const ps4 = computed((): Product[] => { return funn.feed(prp.items, 4, wpnum.value) })
const ps5 = computed((): Product[] => { return funn.feed(prp.items, 5, wpnum.value) })


const aii = reactive({ ioading: false })
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

const w_xs = computed((): number => {
    return 1 / (wpnum.value || 1)
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