<template>
    <view>
        <o-safe-area-top/>
        <view class="py">
            <view class="h3 bb cod-tih">下午好，刘德华</view>
        </view>
        
        <view class="pt-s">
            <view class="py">
                <view class="">
                    <view class="pr-s d-ib">
                        <o-div :clazz="'btn rnd btn-index'" :clazz_inner="'py-s mw-5em'">
                            导航
                        </o-div>
                    </view>
                    <view class="pr-s d-ib">
                        <o-div @touch="() => uniRouter.navigatorpg('report')" :clazz="'btn rnd btn-index'" :clazz_inner="'py-s mw-5em px-x1'">
                            销售订单
                        </o-div>
                    </view>
                </view>
            </view>
            <view class="py-s">
                <co-index-search></co-index-search>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniRouter from '@/tool/uni/uni-router';

// const prp = defineProps<{}>()

</script>