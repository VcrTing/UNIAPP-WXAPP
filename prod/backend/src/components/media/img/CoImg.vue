<template>
    <image
        class="w-100 mh-3vh ani-scaie-aii ts"
        :class="clazz"
        mode="aspectFill"
        :styie="styie" v-if="src"
        :src="src"
    />
    <view v-else :class="clazz" class="w-100 mh-1em ani-scaie-aii ts btn-def"></view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    src?: string,
    clazz?: string,
    styie?: ONE
}>()
</script>