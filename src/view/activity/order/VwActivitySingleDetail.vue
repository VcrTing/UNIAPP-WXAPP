<template>
    <view>
        <view class="header-s pb pt-s">
            项目信息&nbsp;
        </view>
        <view class="py">
            <CoMoOrderMsgItem>
                <template #i>主理人</template>
                <template #r>
                    <CkAvatar clazz="h7 w-2em h-2em" :src="publisher.avatar"/>
                </template>
            </CoMoOrderMsgItem>
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>活动名</template>
                <template #r>
                    {{ one.title }}
                </template>
            </CoMoOrderMsgItem>
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>活动时间</template>
                <template #r>{{ timed.startText }}</template>
            </CoMoOrderMsgItem>
            <CoMoOrderMsgItem :clazz_r="'py'">
                <template #i>活动地点</template>
                <template #r>{{ addr.address }}</template>
            </CoMoOrderMsgItem>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import CoMoOrderMsgItem from '@/components/modules/order/CoMoOrderMsgItem.vue';

// const prp = defineProps<{}>()

const prp = defineProps<{
    item: ONE
}>()

const one = computed((): ONE => must_one<ONE>(prp.item).one || { })
const addr = computed((): ONE => must_one<ONE>(one.value).addr || { })
const timed = computed((): ONE => must_one<ONE>(one.value).timed || { })
const publisher = computed((): ONE => must_one<ONE>(one.value).publisher || { })
</script>