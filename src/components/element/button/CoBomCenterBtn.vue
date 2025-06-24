<template>
    <view class="abs-b ps-f-imp w-100">
        <view class="fx-c w-100 pb-x3">
            <OButton v-if="color == 'pri'" :clazz="clazz" @tap="emt('go')">
                <slot></slot>
            </OButton>
            <OButton color="wht" v-else :clazz="clazz" @tap="emt('go')">
                <slot></slot>
            </OButton>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';

defineProps<{
    clazz?: string,
    color?: O_BUTTON_COLOR
}>()

const emt = defineEmits([ 'go' ])

</script>