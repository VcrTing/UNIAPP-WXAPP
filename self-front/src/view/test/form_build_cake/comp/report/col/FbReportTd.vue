<template>
    <view class="o-report-td" v-if="typed == 'td'">
        <view class="pb" v-for="(c, i) in list" :key="i">
            <o-fb-item :one="c" :many="null" :config="config"></o-fb-item>
        </view>
    </view>
    <view v-else>
        TD NULL {{ typed }}
    </view>
</template>

<script setup lang="ts">
import OFbItem from '@/test/form_build/OFbItem.vue';
import { fb_get_item_type, fb_get_list } from '@/test/form_build/form_build';

const prp = defineProps<{ col: ONE, config: ONE }>()

const list = computed((): ANYS => fb_get_list(prp.col))
const typed = computed(() => fb_get_item_type(prp.col))

if (list.value && list.value.length > 0) {
    console.log("TABLE TD = ", prp.col)
}
</script>