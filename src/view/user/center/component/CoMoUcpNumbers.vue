<template>
    <view>
        <view class="fx-i">
            <CoMoUserNumberShow @tap="uniRouter.gopg('ui')" :num="0" class="px-row" :class="clazz">
                参与数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                收藏数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="0" class="px-row" :class="clazz">
                账户余额
            </CoMoUserNumberShow>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';
import uniRouter from '@/tool/uni/uni-router';

const prp = defineProps<{
    clazz?: string
}>()

</script>