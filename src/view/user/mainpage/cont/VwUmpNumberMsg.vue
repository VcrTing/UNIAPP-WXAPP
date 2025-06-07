<template>
    <view class="py-row">
        <view class="fx-c">
            <CoMoUcpNumbers :clazz="'px-x1'" :is_publisher="is_publisher"/>
        </view>
        <view class="pt-x2 px-row">
            <view class="fx-c pt-col">
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">黑丝</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">JK</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">丝袜诱惑</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">Lolita</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">内射</OButtonDef>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoMoUcpNumbers from '../../center/component/CoMoUcpNumbers.vue';
import { authGetters } from '@/memory/global';
import OButtonDef from '@/cake/button/OButtonDef.vue';

// const prp = defineProps<{}>()
const is_publisher = computed(() => authGetters.is_publisher)

</script>