<template>
    <view class="px-row">
        <view :class="isphone ? '' : 'row'">
            <view class="pt-x1" v-for="(v, i) in items" :key="i"
                :class="w_clazz">
                <CoMoIndexProductSearchItem :v="v"  @view="funn.view"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoIndexProductSearchItem from '@/components/modules/product/item/CoMoIndexProductSearchItem.vue';
import { uiGetters } from '@/memory/global';
import open_of_product from '@/server/__func/open_of_product';
import { future } from '@/tool/util/future';
import { computed } from 'vue';

const prp = defineProps<{
    items: Product[]
}>()

const funn = {
    view: (v: Product) => future(async () => {
        await open_of_product.view(v)
    })
}

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-333 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>