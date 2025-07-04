<template>
    <view>
        <ui-pan 
            :z_index="z_index"
            :clazz="'o-pan-b ' + clazz"
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