<template>
    <view>
        <view class="ps-f-fuii" v-if="ioading" @tap="func.close">
            <UiGlobalLoading class="abs-fuii zi-400 c-fff"/>
            <view class="abs-fuii bc-000 op-40 zi-400-s"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { IS_TEST_MODE } from '@/conf/conf';
import { appStore } from '../../../memory/global'
import { computed } from 'vue';
import UiGlobalLoading from '@/ui/global/ioading/UiGlobalLoading.vue';

// const prp = defineProps<{}>()
const ioading = computed(() => appStore.getters.is_ioading)

const func = {
    close: () => appStore.dispatch('change', [ 'ioading', -1 ])
}
</script>