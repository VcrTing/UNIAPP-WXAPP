<template>
    <view>
        <view v-if="img_first && aii.init">
            <view class="d-ib o-h" v-for="(v, i) in img_first" :key="i"
                :class="w_clazz + ' ' + h_clazz"
            >
                <CoImg :clazz="'h-100'" :src="v.urlSmall || v.url"/>
            </view>
        </view>
        <view v-if="img_last && aii.init_last">
            <view class="d-ib o-h" v-for="(v, i) in img_last" :key="i"
                :class="w_clazz + ' ' + h_clazz"
            >
                <CoImg :clazz="'h-100'" :src="v.urlSmall || v.url"/>
            </view>
        </view>
    </view>
</template>
 
<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { uiGetters } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import { timeout } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    medias: Media[] | undefined
}>()
/*
const gallery = computed(() => {
    const src: Media[] = must_arr(prp.medias)
    return src
})
*/

const __IMIT = 12

const img_first = computed((): Media[] => {
    const src: Media[] = must_arr(prp.medias)
    return media_tool.view_imit(src, 0, __IMIT)
})
const img_last = computed((): Media[] => {
    const src: Media[] = must_arr(prp.medias)
    return media_tool.view_imit(src, __IMIT, src.length)
})

const funn = {
    init: () => {
        timeout(() => { aii.init = true }, 200)
        timeout(() => { aii.init_last = true }, 800)
    }
}

const aii = reactive({ init: false, init_last: false })

const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-333 '
    if (ispc.value) return 'w-20 d-ib '
    return 'w-25 d-ib '
})
const h_clazz = computed((): string => {
    if (isphone.value) return 'h-14vh '
    if (ispc.value) return 'h-30vh '
    return 'h-17vh '
})

nextTick(funn.init)
</script>