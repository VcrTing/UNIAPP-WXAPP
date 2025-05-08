<template>
    <!-- QUERY -->
    <view class="bg-con br pt-con">
        <view class="pr-con">
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
        </view>

        <view class="pt-con">
            <o-div :clazz="'btn w-100 br-bi br-br'" :clazz_inner="'fx-c mh-btn'">重置</o-div>
        </view>
    </view>
</template>

<script setup lang="ts">
defineProps<{
    schemas: ReportSchema[]
}>()
</script>