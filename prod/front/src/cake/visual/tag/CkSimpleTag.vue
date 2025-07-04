<template>
    <view class="d-ib fx-aii-btn-def px-t br-t ani-scaie-aii c-p"
        :class="clazz"
    ><slot></slot></view>
</template>

<script setup lang="ts">
const prp = defineProps<{
    clazz?: string
}>()

</script>