<template>
    <view class="px-row">
        <view class="py">
            <!--
            <OButton @tap="funn.editaddr" clazz="btn-app" color="wht">
                <view>
                    <UiI :i="'edit'"/>
                </view>
                <view class="pi-s">管理常用地址信息</view>
            </OButton>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButton from '@/cake/button/OButton.vue';
import { authGetters } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const funn = {
    editaddr: () => {
        appRouter.manager_addr()
    }
}
</script>