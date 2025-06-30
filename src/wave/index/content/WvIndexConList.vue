<template>
    <view :class="isphone ? 'px-row' : 'px-row'">
        <view :class="isphone ? 'row' : 'row'">
            <view v-for="(v, i) in items" :key="i" class="br pb-row"
                :class="w_clazz"
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
import open_of_activity from '@/server/__func/open_of_activity';
import { future, futuring } from '@/tool/util/future';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    items: Product[]
}>()

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-50 px-s d-ib'
    if (ispc.value) return 'w-20 px-s d-ib'
    return 'w-333 px-s d-ib'
})
const w_xs = computed((): number => {
    if (isphone.value) return 0.5;
    if (ispc.value) return 0.2;
    return 0.333;
})
const w_item = computed((): number => {
    return w_xs.value * uiState.w;
})

const aii = reactive({ ioading: false })

const joins = computed((): ActivityJoin[] => {
    return orderState.join_of_mine || [ ]
})

const funn = {
    detail: (v: Activity) => futuring(aii, async () => {
        console.log('访问 活动')
        await open_of_activity.view(v)
    })
}

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