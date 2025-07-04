<template>
    <view v-if="rows">
        <view class="o-report-tr pb" v-for="(r, i) in rows" :key="i">
            
            <fb-report-td
                v-for="(c, j) in fb_get_columns(r)" :key="j"
                :col="c" :config="config"></fb-report-td>

        </view>
    </view>
    <view v-else-if="one">
        <fb-report-td :col="one" :config="config"></fb-report-td>
    </view>
</template>

<script setup lang="ts">
import { fb_get_columns } from '@/test/form_build/form_build';
import FbReportTd from './col/FbReportTd.vue';
const prp = defineProps<{ one: ONE|null, rows: MANY|null, config: ONE }>()

</script>