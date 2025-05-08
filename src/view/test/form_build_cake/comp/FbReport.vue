<template>
    <view>
        <view class="pb">
            {{ fb_get_name(one) }}
        </view>
        <view>
            <fb-report-def :one="null" :rows="rows" :config="config"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import FbReportDef from './report/FbReportDef.vue';
import { fb_get_name, fb_get_rows } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

const rows = computed(() => fb_get_rows(prp.one))

console.log("REPORT = ", prp.one)
</script>