<template>
    <view>
        <view class="px-row py-row">
            <view class="h5 fw-550">历史订单</view>
        </view>
        <view>
            <OScrollY :clazz="'pag-order-his-cont'">
        <view class="px-row br pt-row">
            
            <view v-for="(v, i) in prp.items" :key="i"
                class="br pb-x1"
            >
                <view class="bg-con br-x1 px-col py-col">
                    <!-- TOP -->
                    <view class="fx-s fx-t">
                        <view class="pr">
                            <CkAvatar :clazz="'w-3em h-3em'" :src="v.publisher.avatar"/>
                        </view>
                        <view class="fx-1">
                            <view class="fx-s fx-t">
                                <view class="fx-i">
                                    <view class="">
                                        <view class="pb-s">{{ v.publisher.name }}</view>
                                        <view class="fx-i fs-n">
                                            <view class="pr-s" v-for="(m, n) in v.publisher.usely" :k="n">
                                                {{ m.txt }}
                                            </view>
                                        </view>
                                    </view>
                                </view>
                                <view>
                                    <OButtonIht :weak="true" :clazz="'px-s fs-n br-s'">已完成</OButtonIht>
                                </view>
                            </view>

                            <!-- CON -->
                            <view class="pt-col">
                                <view>
                                    {{ v.title }}
                                </view>
                                <view class="pt">
                                    
                                </view>
                            </view>
                        </view>
                    </view>

                    <!-- BOM -->
                    <view>
                        <view class="fx-s w-100">
                        </view>
                    </view>
                </view>
            </view>
        </view>
            </OScrollY>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';

const prp = defineProps<{
    items: MANY
}>()

</script>

<style lang="sass">
.pag-order-his-cont
    min-height: calc( 100vh - 34em )
</style>