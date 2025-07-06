<template>
    <view>
        <view v-for="(v, i) in gallery" :key="i"
            :class="w_clazz" class="d-ib"
            :style="{
                    'height': media_tool.img_h_view(w_item, v.w, v.h)
                }">
            <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import { uiGetters, uiState } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { timeout } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive, ref } from 'vue';

const prp = defineProps<{
    content: ProductContent,
    v: Product
}>()

const gallery = computed(() => {
    const src: Media[] = must_arr(prp.content.galleries)
    return media_tool.fer_sex(src)
})

const w_screen = computed(() => uiState.w)
const isphone = computed(() => uiGetters.isphone)
const w_item = computed(() => {
    if (isphone.value) { return w_screen.value / 2 }
    return w_screen.value / 5
})
const w_clazz = computed(() => {
    if (isphone.value) return 'w-50'
    return 'w-20'
})

const init = ref(false)
const funn = {
    init: () => { timeout(() => (init.value = true), 200) }
}
nextTick(funn.init)
</script>