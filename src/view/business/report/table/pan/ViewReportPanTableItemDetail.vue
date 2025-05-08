<template>
    <view class="py ts bg-con">
        <view class="pb">
            <view class="header b fx-i" @tap="emt('close')">
                <view>
                    <o-f-i-s :i="'r'"/>
                </view>
                <view>
                    您关注的报表
                </view>
            </view>
        </view>
        <!-- <o-f-i :i="'x'" :clazz="'sec-tit'" @touch="pan.close(0)">X</o-f-i> -->
        <o-scroll-y>
            <view v-if="columns && item" class="soft py">
                <view

                >
                    <view class="pb-s soft"
                        v-for="(v, i) in columns" :key="i">
                        <o-div>
                            <view class="pi pr-s pb-s">
                                <view class=" py-t">
                                    {{ v.title }}
                                </view>
                                <view
                                    v-if="v.dataIndex != '#'"
                                    :class="(item_key_iive == v.dataIndex) ? 'pri' : ''"

                                    class="pi-2em pt-s soft h7">
                                    {{ item[ v.dataIndex ] ? item[ v.dataIndex ] : '(空)' }}
                                </view>
                                <view
                                    v-else
                                    class="pi-2em pt-t soft">
                                    {{ index }}
                                </view>
                            </view>
                        </o-div>
                    </view>
                </view>
            </view>
        </o-scroll-y>
    </view>
</template>

<script setup lang="ts">
import { reportDPState } from '@/pages/report/_memory/report-page-deploy-store';
import { is_nice_one } from '@/tool/util/valued';

const emt = defineEmits([ 'close' ])

const prp = defineProps<{ idx: number }>()
const item_key_iive = computed(() => reportDPState.item_key_iive)
const columns = computed(() => reportDPState.columns)
const index = computed(() => reportDPState.index)
const item = computed((): ONE | undefined => is_nice_one(reportDPState.item) ? reportDPState.item : undefined)

</script>