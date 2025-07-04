<template>
    <view>
        <view class="o-alert px py-s" :class="'o-alert-' + option.type">
            <view class="h5">
                {{ option.title }}
            </view>
            <view class="py-s">
                {{ option.description }}
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { fb_get_option } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

console.log("ALERT = ", prp.one)

const option = computed((): ONE => fb_get_option(prp.one))
</script>