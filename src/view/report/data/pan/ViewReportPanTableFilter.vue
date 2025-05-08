<template>
    <!-- QUERY -->
    <view class="pt-con" v-if="schemas">
        <view class="pr-con pi-s">
            <view class="py"></view>
            <view v-for="(v, i) in schemas" :key="i">
                <view class="pb-s" v-for="(j, k) in v.queryParams" :key="k">
                    <view class="fx-i">
                        <text class="mw-6em ta-r">{{ j.__label }}：</text> 
                        <view class="pi fx-1">

                            <co-br-query-inputer
                                :src="j"
                            />
                        </view>
                    </view>
                </view>
            </view>
            <view class="py"></view>
        </view>

        <view class="pt-con">
            <o-div :clazz="'btn w-100'">
                <view class="fx-c mh-btn-x1">
                    重置
                </view>
                <o-safe-area-bottom />
            </o-div>
        </view>
    </view>
    <view v-else>
        shcemas 为空
    </view>
</template>

<script setup lang="ts">
defineProps<{
    schemas: ReportSchema[] | undefined
}>()
</script>