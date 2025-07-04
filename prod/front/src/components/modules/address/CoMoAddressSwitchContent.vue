<template>
    <view>
        <view class="px-row softer">
            <view><text class="header-s">当前城市</text></view>
            <view class="py">
                <OButton color="def" :weak="true" clazz="mw-6em py-s">{{ city.name }}</OButton>
            </view>
        </view>
        <view class="px-row softer pt-x2">
            <view><text class="header-s">切换城市</text></view>
            <view class="pt-x1">
                <view class="w-100 pb" v-for="(v, i) in aii.citys" :key="i"
                    @tap="aii.iive = v"
                >
                    <OButton :color="isiive(v) ? 'def' : 'wht'" :weak="true" 
                        clazz="mw-6em py-s w-100">
                        {{ v.name }}
                    </OButton>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import { DATA_CITY_DEF, DATA_CITYS } from '@/conf/conf-datas';
import { pageIndexState } from '@/memory/page';
import { promise } from '@/tool/util/future';
import { must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive, watch } from 'vue';

const city = computed(() => {
    return pageIndexState.city
})

const aii = reactive({
    iive: DATA_CITY_DEF,
    citys: DATA_CITYS
})

const isiive = (v: Conf.City) => {
    const __id = v.documentId;
    const id = must_one<Conf.City>(aii.iive).documentId
    return __id == id
}

const funn = { 
    init: promise(() => {
        aii.iive = city.value
    }),
    v: () => { return aii.iive } }

defineExpose(funn)
</script>