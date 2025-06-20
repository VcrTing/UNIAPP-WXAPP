<template>
    <view class="abs-t w-100 zi-t">
        <view class="w-100 h-18vh" :style="{
            'margin-top': '-3.1em'
        }">
            <image class="w-100 h-18vh" mode="aspectFill" :src="banner"/>
        </view>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()

const src = 'https://pic.rmb.bdstatic.com/15302801526a3e5f91b9aa002095a4363289433612.jpeg'

const banner = '/static/bg/index_top.jpg'
</script>