<template>
    <view>
        <CoProductImgs :medias="banners"
            @sex="(m: Media) => emt('sex', m)"/>
    </view>
</template>

<script setup lang="ts">
import CoProductImgs from '../__component/CoProductImgs.vue';

defineProps<{
    banners: Media[], toph: number
}>()
const emt = defineEmits([ 'sex' ])


</script>