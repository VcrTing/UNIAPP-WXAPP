<template>
    <view>
        <ui-pan 
            :z_index="z_index"
            :clazz="'r-0 t-0 b-0 o-pan-r bc-fff' + clazz"
        >
            <slot></slot>
        </ui-pan>
    </view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    z_index: number,
    clazz: string
}>()

</script>