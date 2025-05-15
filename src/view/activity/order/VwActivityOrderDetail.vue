<template>
    <view>
        <view>

        </view>
        <view>
            活动标题: {{ one.title }}
        </view>
        <view>
            <view class="fx-s">
                <view class="w-25">
                    <view>
                        <CkAvatar clazz="w-2em h-2em" :src="publisher.avatar"/>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const prp = defineProps<{
    item?: ONE
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const publisher = computed(() => must_one<ONE>(one.value).publisher || { })
</script>