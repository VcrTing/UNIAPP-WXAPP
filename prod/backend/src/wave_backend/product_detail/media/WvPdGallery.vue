<template>
    <view v-if="gallery && gallery.length > 0">
        <view class="pt bg-con softer" v-if="aii.init">

            <CoProductImgs :medias="gallery" 
                @sex="(m: Media) => emt('sex', m)"/>
        </view>
    </view>
    <view v-else class="bg-con">
        <CkSpace :h="8"/>
    </view>
</template>

<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import { computed, nextTick, reactive } from 'vue';
import { timeout } from '@/tool/util/future';
import product_tool from '@/tool/modules/product_tool';
import CoProductImgs from '../__component/CoProductImgs.vue';
//
const prp = defineProps<{ v: Product }>()
const emt = defineEmits([ 'sex' ])
const aii = reactive({ init: false })

const gallery = computed(() => {
    return product_tool.getgallery(prp.v)
})

const funn = {
    init: () => { timeout(() => (aii.init = true), 200) }
}
nextTick(funn.init)

</script>