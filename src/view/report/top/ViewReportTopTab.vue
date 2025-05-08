<template>
    <view>
        <o-scroll-x>
            <!-- TABS -->
            <view v-if="schemas">
                <view class="row" v-show="schemas.length > 0">
                    <view class="d-ib" v-for="(v, i) in schemas" :key="i">
                        <view @tap="tab(v.id)" :class="v.__tab_iive ? 'px-s' : ''">
                            
                            <o-div :clazz="(v.__tab_iive ? 'btn-pri-iht btn ' : 'btn')">
                                <view class="ts py" :class="v.__tab_iive ? 'px-x1' : 'px'">
                                    {{ v.__tab_name }}
                                </view>
                            </o-div>
                        </view>
                    </view>
                </view>
                <view v-show="schemas.length <= 0">
                    <view class="btn py">&nbsp;</view>
                </view>
            </view>
        </o-scroll-x>
    </view>
</template>

<script setup lang="ts">
import report_cache_util from '@/tool/business/report/report_cache_util';
import report_router_util from '@/tool/business/report/report_router_util';
import { promising } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    schemas: ReportSchema[] | undefined
}>()

const me = reactive({
    ioading: false
})

const tab = (id: SN) => report_router_util.switch_schema_tab(me, prp.schemas, id)
</script>