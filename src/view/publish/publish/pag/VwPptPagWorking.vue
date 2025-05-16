<template>
    <view class="px-row">
        <view>
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishViewItem :v="v">
                    <view>&nbsp;</view>
                    <view class="pr-row pt">
                        <view v-for="(m, n) in v.boys" :key="n">
                            <CkAvatar clazz="w-2em h-2em" :src="m.user.avatar"/>
                        </view>
                    </view>
                </CoMoPublishViewItem>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoMoPublishViewItem from '@/components/modules/publish/CoMoPublishViewItem.vue';
import mock_publish from '@/server/mock/publish/mock_publish';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    items: mock_publish.now
})

</script>