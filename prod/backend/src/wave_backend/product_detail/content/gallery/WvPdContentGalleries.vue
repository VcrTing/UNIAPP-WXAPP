<template>
    <view>
        <CoProductImgs :medias="gallery"
            @sex="(m: Media) => emt('sex', m)"/>
    </view>
</template>

<script setup lang="ts">
import media_tool from '@/tool/modules/common/media_tool';
import { timeout } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive, ref } from 'vue';
import CoProductImgs from '../../__component/CoProductImgs.vue';

const prp = defineProps<{
    content: ProductContent,
    v: Product
}>()
const emt = defineEmits([ 'sex' ])

const gallery = computed(() => {
    const src: Media[] = must_arr(prp.content.galleries)
    return media_tool.fer_sex(src)
})

const init = ref(false)
const funn = {
    init: () => { timeout(() => (init.value = true), 200) }
}
nextTick(funn.init)
</script>