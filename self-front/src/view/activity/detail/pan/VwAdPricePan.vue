<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :h="'51.8vh'" :idx="idx" :orientation="'b'">
                <template #top>
                    <view class="px-row py bg-con">
                        <view class="header">豪华套餐</view>
                    </view>
                </template>
                <view class="py-s header">&nbsp;</view>
                
                <view class="px-row py-row">
                    <view class="py">
                        <view>
                            <view class="pb" v-for="(v, i) in assistant" :key="i">
                                <CoMoActivityMoneyItem @chose="aii.chose = v" :item="v" >
                                    <radio :value="i + ''" :checked="true" v-if="aii.chose == v"></radio>
                                    <view class="pi" v-else>&nbsp;</view>
                                </CoMoActivityMoneyItem>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="mh-btn"><view class="py-x3"></view></view>

                <template #bom>
                    <view class="fx-s px-row bg-con pb-row pt-s">
                        <OButton color="def" @tap="pan_tooi.close_pan(idx)" clazz="w-382 mh-btn fx-aii-btn-pri">再想想</OButton>
                        <view class="d-ib px-s"></view>
                        <OButton @tap="funn.submit" clazz="fx-1 mh-btn">下单套餐</OButton>
                    </view>
                </template>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CoMoActivityMoneyItem from '@/components/modules/activity/CoMoActivityMoneyItem.vue';
import { orderReFresh } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import { must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    idx: number,
    one: ONE
}>()

const aii = reactive({
    choses: [ ], chose: { }
})

const assistant = computed((): MANY => {
    return must_one<ONE>(prp.one).assistant || [ ]
})

const emt = defineEmits([ 'submit' ])

const funn = {
    submit: () => {
        emt('submit', { assistant: aii.chose })
    },
    init: () => {
        aii.chose = assistant.value[0]
    },
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../__sass/vw_activity_style'
</style>