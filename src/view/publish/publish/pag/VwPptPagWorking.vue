<template>
    <view class="px-row">
        <view>
            <view class="pb-row" v-for="(v, i) in aii.items" :key="i">
                <CoMoPublishViewItem :v="v">
                    <view>&nbsp;</view>
                    <view class="pr-row pt">
                        <view class="fx-r tis fs-s">
                            <UiI :i="'lock'"/>
                            <text class="pi-s">私密</text>
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