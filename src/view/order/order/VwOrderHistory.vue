<template>
    <view>
        
        <view>
        <view class="px-row br pt-row">
            <!-- -->
            <view v-for="(v, i) in datas" :key="i"
                class="br pb-x1"
            >
                <view class="card pt-col ">
                    <view class="py-col px-col">
                        <view class="fw-600 h5 hih tils-x1">{{ v.title }}</view>
                    </view>
                    <view class="pb-row px-col">
                        <view class="fx-s">
                            <CoMoUserInfoS :v="v.publisher"/>
                            <view class="h8">
                                <OButtonIht :weak="true" clazz="fs-s px-s py-t">
                                    已完成
                                </OButtonIht>
                            </view>
                        </view>
                    </view>
                    <view class="ps-r zi-t">
                        <view class="fx-s" v-if="getgallery(v, [ mock_orders.banner ]).length > 1">
                            <view class="w-333 h-13vh" v-for="(m, n) in getgallery(v, [ mock_orders.banner ])" :key="n">
                                <CoImg :v="m" clazz="h-100"/>
                            </view>
                        </view>
                        <view v-else class="">
                            <view class="w-618 h-13vh">
                                <CoImg :v="mock_orders.banner" clazz="h-100 br-s" />
                            </view>
                        </view>
                        <!--
                        <view class="abs-bi">
                            <view class="px-col pb-s">
                                <text class="c-fff">{{ v.title }}</text>
                            </view>
                        </view>
                        -->
                    </view>
                    <view class="px-col fx-s py-col">
                        <view>
                            <text></text>
                            <text class="tis pi">2025-05-05 08:20</text>
                        </view>
                        <view class="">
                            <view class="pri">详情</view>
                        </view>
                    </view>
                </view>
            </view>

            <!--
            <view class="fx-c py-row">
                <view class="sus fx-c">
                    <view>查看更多</view>
                    <view><UiI :i="'r'"/> </view>
                </view>
            </view>
            -->
        </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import OButtonOut from '@/cake/button/OButtonOut.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import CoMoUserInfoS from '@/components/modules/user/CoMoUserInfoS.vue';
import mock_orders from '@/server/mock/order/mock_orders';
import { must_arr } from '@/tool/util/valued';
import { getgallery } from '@/tool/view/view_media';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const datas = computed((): MANY => {
    const src = mock_orders.items || [ ]
    if (src && src.length) {
        return [ src[0], src[1], src[2] ]
    }
    return src;
})

const funn = {
    
}
</script>

<style lang="sass">
.pag-order-his-cont
    min-height: calc( 100vh - 34em )
</style>


                <!--
                <view class="bg-con br-x1 px-col py-col">
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
                            <view class="pt-col">
                                <view>
                                    {{ v.title }}
                                </view>
                                <view class="pt">
                                    
                                </view>
                            </view>
                        </view>
                    </view>
                    <view>
                        <view class="fx-s w-100">
                        </view>
                    </view>
                </view>
                -->