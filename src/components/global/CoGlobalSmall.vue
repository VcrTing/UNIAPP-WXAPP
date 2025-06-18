<template>
    <view v-if="view">
		<CoMoAuthLoginModal/>
    </view>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import CoMoAuthLoginModal from '../modules/auth/CoMoAuthLoginModal.vue';

// const prp = defineProps<{}>()
const view = ref<boolean>(false)

nextTick(() => {
    setTimeout(() => {
        view.value = true
    }, 1200)
})
</script>