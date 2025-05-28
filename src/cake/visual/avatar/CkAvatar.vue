<template>
    <image class="mxw-12em uni-img br-cir" :class="clazz"
        mode="aspectFit" @tap="funn.tomainpage"
        :src="src"/>
</template>

<script setup lang="ts">
import uniRouter from '@/tool/uni/uni-router';

// const prp = defineProps<{}>()
const prp = defineProps<{
    src?: string
    clazz?: string,
    not_mainpage?: boolean
}>()

const funn = {
    tomainpage: () => {
        if (prp.not_mainpage) {

        }
        else {
            uniRouter.gopg('user_mainpage')
        }
    }
}
</script>