<template>
    <view v-if="isphone">
        <view v-for="(v, i) in first" :key="i"
            :style="{
                    'height': media_tool.img_h_view(w_screen, v.w, v.h, 2999)
                }">
            <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
        </view>
        <view v-if="init">
            <view v-for="(v, i) in last" :key="i"
                :style="{
                        'height': media_tool.img_h_view(w_screen, v.w, v.h, 2999)
                    }">
                <image class="w-100 h-100" :src="v.url" mode="aspectFill"/>
            </view>
        </view>
    </view>
    <view v-else class="px-row">
        <view v-for="(v, i) in gallery" :key="i" class="w-333 d-ib br-t o-h">
            <image class="w-100 h-27vh ani-scaie-aii c-p" :src="v.url" mode="aspectFill"/>
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

const first = computed((): Media[] => {
    return media_tool.view_imit(gallery.value, 0, 3)
})

const last = computed((): Media[] => {
    return media_tool.view_imit(gallery.value, 3, gallery.value.length)
})

const w_screen = computed(() => uiState.w)

const init = ref(false)
const funn = {
    init: () => { timeout(() => (init.value = true), 200) }
}
nextTick(funn.init)

const isphone = computed((): boolean => uiGetters.isphone)
</script>