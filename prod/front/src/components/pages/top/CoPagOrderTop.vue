<template>
    <view class="ps-r zi-t o-h">
        <view class="abs-b i-0 w-100 h-100 zi-s">
            <WvIndexBanner :h="h_v"/>
        </view>
        <OSafeAreaTop/>
        <!-- -->
        <view class="mxw-pc softer" :class="ispc ? '' : 'px-row'">
            <view class="fx-i ps-r zi-n py-s ts">
                <view v-for="(v, i) in tabs" :key="i" class="ts  mr">
                    <OButton :color="(tab.main == v.v) ? 'wht-s' : 'wht-s'" :weak="true" v-if="tab.main == v.v" 
                        :clazz="'ts py-s px-row br-s'">
                        <text class="fw-550">{{ v.name }}</text>
                    </OButton>
                    <view @tap="emt('choise', v)" class="ts py-s px-row fx-aii-btn-wht-s br-s c-p bf-s" v-else>
                        <text class="tid fs-w">{{ v.name }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OButton from '@/cake/button/OButton.vue';
import { uiGetters } from '@/memory/global'
import WvIndexBanner from '@/wave/index/WvIndexBanner.vue';
import { computed } from 'vue'

const prp = defineProps<{
    tabs: MANY,
    tab: ONE
}>()

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const h_v = computed((): string => { return h.value + 'px' })
const h = computed((): number => { if (ispc.value) return 52; return isphone.value ? 0 : 120 })

const emt = defineEmits([ 'choise' ])
</script>