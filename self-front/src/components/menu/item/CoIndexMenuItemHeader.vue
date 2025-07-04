<template>
    <o-div>
        <view class="fx-s mh-btn w-100 pi-con">
            <view class="fx-i">
                <!--
                <ui-i v-if="v.icon" :i="v.icon"/>
                <view class="pi"></view>
                -->
                <view>
                    {{ v.title }}
                </view>
            </view>

            <view>

            </view>
        </view>
    </o-div>
</template>

<script setup lang="ts">
defineProps<{
    v: LayoutMenuItem
}>()

</script>