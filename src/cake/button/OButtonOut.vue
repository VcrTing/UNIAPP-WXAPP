<template>
    <view class="btn bd tils fx-c" :class="cls">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const prp = defineProps<{ 
    clazz?: string,
    weak?: boolean,
    color?: O_BUTTON_COLOR
}>()

const cls = computed(() => {
    const cor = 'btn-' + (prp.color ? prp.color : 'pri') + '-out'
    return cor + ' ' + prp.clazz + ' ' + (prp.weak ? '' : ' py-s br-rnd px')
})
</script>
