<template>
    <view class="px-row">
        <view class="pb" v-if="is_publisher">
            <ODiv @tap="funn.editaddr" clazz="bg-con mh-btn tils fx-c btn br-rnd">
                <view>
                    <UiI :i="'edit'"/>
                </view>
                <view class="py-n pi-s">管理常用地址信息</view>
            </ODiv>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import { authGetters } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const is_publisher = computed(() => authGetters.is_publisher)


const funn = {
    editaddr: () => {
        storage.set('PAGE_MANAGER_KEY', 2)
        uniRouter.gopg('manager')
    }
}
</script>