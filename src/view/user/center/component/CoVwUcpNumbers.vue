<template>
    <view>
        <view v-if="is_publisher" class="fx-i">
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                成单数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                粉丝数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                账户金额
            </CoMoUserNumberShow>
        </view>
        <view v-else  class="fx-i">
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                成单数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                妹子数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                付出金额
            </CoMoUserNumberShow>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';

const prp = defineProps<{
    is_publisher: boolean | undefined,
    clazz?: string
}>()

</script>