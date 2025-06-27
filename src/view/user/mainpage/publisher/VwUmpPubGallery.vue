<template>
    <view>
        <view class="d-ib o-h" v-for="(v, i) in gallery" :key="i"
            :class="w_clazz + ' ' + h_clazz"
        >
            <CoImg @tap="funn.view(v)" :clazz="'h-100'" :src="v.urlSmall || v.url"/>
        </view>
    </view>
</template>
 
<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { uiGetters } from '@/memory/global';
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    medias: Media[]
}>()

const gallery = computed(() => {
    const src: Media[] = must_arr(prp.medias)
    return src
})

const funn = {
    view: (v: ONE) => {
        const many = gallery.value
    }
}

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
</script>