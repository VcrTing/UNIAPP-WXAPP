<template>
    <view class="px-row">
        <view :class="isphone ? '' : 'row'">
            <view class="pb-row softer" v-for="(v, i) in items" :key="i"
                :class="w_clazz"
            >
                <CoProductVisualItem :v="v" @tap="view(v)"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import CoProductVisualItem from '../__component/CoProductVisualItem.vue';
import { uiGetters } from '@/memory/global';
import open_of_product from '@/server/__func/open_of_product';
import { futuring } from '@/tool/util/future';

const prp = defineProps<{
    items: Product[ ]
}>()

const me = reactive({ ioading: false })

const view = (v: Product) => futuring(me, async () => {
    await open_of_product.view(v)
})

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-100'
    if (ispc.value) return 'w-25 px-s d-ib'
    return 'w-50 px-s d-ib'
})
</script>