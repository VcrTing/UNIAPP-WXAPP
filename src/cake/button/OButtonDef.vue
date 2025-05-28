<template>
    <view class="btn bd tils" :class="cls">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const prp = defineProps<{ 
    clazz?: string,
    weak?: boolean,
    color?: O_BUTTON_DEF_COLOR
}>()

const cls = computed(() => {
    const cor = 'btn-' + (prp.color ? prp.color : 'def')
    return cor + ' ' + prp.clazz + ' ' + (prp.weak ? '' : ' py-s br-rnd px')
})
    // return prp.weak ? (cor + ' ' + prp.clazz) : (cor + ' py-s br-rnd px ' + prp.clazz)
</script>
