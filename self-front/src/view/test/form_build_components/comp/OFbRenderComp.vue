<template>
    <view>
        <view v-if="type == 'dialog'">
            <fb-dialog :one="one" :config="config">
                <o-fb-item :one="null" :config="config" :many="fb_get_list(one)"></o-fb-item>
            </fb-dialog>
        </view>
        <view v-else-if="type == 'report'">
            <fb-report :one="one" :config="config"></fb-report>
        </view>
        <view v-else-if="type == 'alert'">
            <fb-alert :one="one" :config="config"></fb-alert>
        </view>
        <view v-else>
            dialog NULL {{ type }}
        </view>
    </view>
</template>

<script setup lang="ts">
import FbReport from '@/test/form_build_cake/comp/FbReport.vue';
import FbDialog from '@/test/form_build_cake/comp/FbDialog.vue';
import FbAlert from '@/test/form_build_cake/comp/FbAlert.vue';
import OFbItem from '@/test/form_build/OFbItem.vue';

import { FB_ITEM_TYPES, fb_get_item_type, fb_get_list } from '@/test/form_build/form_build';
const prp = defineProps<{ one: ONE, config: ONE }>()

const type = computed(() => fb_get_item_type(prp.one))

const types: string[] = FB_ITEM_TYPES.comp
console.log("COMP ONE", fb_get_list(prp.one))
</script>