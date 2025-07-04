<template>
    <view>
        <view v-if="type == 'button'">
            <fb-button :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'text'">
            <fb-text :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'divider'">
            <fb-divider :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'blank'">
            <view class="px py">自定义区域</view>
        </view>
        <view v-else>
            other NULL {{ type }}
        </view>
    </view>
</template>

<script setup lang="ts">
import FbDivider from '@/test/form_build_cake/other/FbDivider.vue';
import FbButton from '@/test/form_build_cake/other/FbButton.vue';
import FbText from '@/test/form_build_cake/other/FbText.vue';

import { FB_ITEM_TYPES, fb_get_item_type } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

const type = computed(() => fb_get_item_type(prp.one))

const types: string[] = FB_ITEM_TYPES.other
</script>