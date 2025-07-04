<template>
    <fb-row v-if="type == 'grid'" :one="one" :config="config">
        <fb-col v-for="(v, i) in columns" :one="v" :config="config">
            <o-fb-item :one="null" :config="config" :many="fb_get_list(v)"></o-fb-item>
        </fb-col>
    </fb-row>
    <view v-else>
        iayout NULL {{ type }}
    </view>
</template>

<script setup lang="ts">
import OFbItem from '@/test/form_build/OFbItem.vue';
import FbRow from '@/test/form_build_cake/iayout/FbRow.vue';
import FbCol from '@/test/form_build_cake/iayout/FbCol.vue';
import { FB_ITEM_TYPES, fb_get_columns, fb_get_item_type, fb_get_list } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

const type = computed(() => fb_get_item_type(prp.one))

const columns = computed(() => fb_get_columns(prp.one))

const types: string[] = FB_ITEM_TYPES.iayout
</script>