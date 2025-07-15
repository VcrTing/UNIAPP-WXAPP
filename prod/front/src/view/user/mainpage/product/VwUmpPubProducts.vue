<template>
    <view class="py-s">
        <CoViDataLoading :ioading="aii.ioading" :items="working" @refresh="func.init">
            <WvIndexConList :items="working"/>
        </CoViDataLoading>
    </view>
</template>

<script setup lang="ts">
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_product from '@/server/product/server_product'
import { future, timeout } from '@/tool/util/future'
import { must_one } from '@/tool/util/valued';
import WvIndexConList from '@/wave/index/content/WvIndexConList.vue';
import { computed, nextTick, reactive, ref } from 'vue'

const prp = defineProps<{
    data: UserMainPage
}>()

const aii = reactive({ ioading: false })
const user = computed((): User => must_one(prp.data.user))
// 上架中
const working = ref<Product[]>([ ])
//
const funn = {
    freshWorking: () => future(async () => {
        const dts: Product[] = await server_product.she_working(user.value.id)
        console.log('搜索个人产品 =', dts)
        working.value = dts
    }),
}
const func = {
    init: () => future(async () => {
        aii.ioading = true
        await funn.freshWorking()
        timeout(() => aii.ioading = false)
    })
}
nextTick(func.init)
</script>