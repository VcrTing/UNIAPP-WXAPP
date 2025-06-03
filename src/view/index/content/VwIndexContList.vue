<template>
    <view>
        <view v-for="(v, i) in activities" :key="i" class="br pb-row w-100">
            <CoMoIndexActivityItem @detail="funn.detail" :v="v" :meizi="aii.meizi"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CoMoIndexActivityItem from '@/components/modules/index/CoMoIndexActivityItem.vue';
import { acyReFresh, authGetters } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import mock_meizi from '@/server/mock/user/mock_meizi';
import uniRouter from '@/tool/uni/uni-router';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    activities: Activity[]
}>()

const aii = reactive({
    items: mock_orders.items,
    meizi: mock_meizi.items
})

const funn = {
    detail: (v: Activity) => {
        acyReFresh('view', v);
        uniRouter.gopg('activity_detail');
    }
}

</script>

<style lang="sass" scoped>
.index-item-card
    box-shadow: 0em 0.2em 1.4em 0em rgba(0, 0, 0, 0.06)

.a
    // background: rgba(255, 255, 255, 0.4)
    backdrop-filter: blur(4px)
    -webkit-backdrop-filter: blur(4px)

</style>

                <!--
                <view class="py-s abs-i zi-s a br-rt br-it">
                    <view class="fx-s">
                        <view class="br-rnd fx-i pi-row">
                            <CkAvatar clazz="h6 w-2em h-2em" :src="v.publisher.avatar"/>
                            <view class="px-s">
                                <view class="fs-n">{{ v.publisher.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="abs-r t-0 zi" v-if="!is_publisher">
                    <view class="pr-s pt-s">
                        <OButton :weak="true" clazz="fs-n px br-rnd py-t">参加</OButton>
                    </view>
                </view>
                <view class="fx-1">
                    <image class="w-100 h-22vh br" mode="aspectFill" :src="v.banner"/>
                </view>
                <view class="w-100 abs-bi">
                    <view class="px-row py-row c-fff bg-ig-black-b br-rb br-ib">
                        <view class="h6 fw-550">{{ v.title }}</view>
                        <view class="pt-s">{{ v.description }}</view>
                    </view>
                </view>
                -->

            <!--
            <view class="bg-con index-item-card br-x1 px-col py">
                <view class="fx-s fx-t">
                    <view class="fs-w">
                        <CkAvatar :clazz="'w-4em h-4em'" :src="v.publisher.avatar"/>
                    </view>
                    <view class="fx-1 pi">
                        <view class="fx-s fx-t">
                            <view class="fx-i">
                                <view class="pt-s">
                                    <view class="pb-s">{{ v.publisher.name }}</view>
                                    <view class="fx-i fs-n">
                                        <view class="pr-s" v-for="(m, n) in v.publisher.usely" :k="n">
                                            {{ m.txt }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view >
                                <view v-if="is_publisher"></view>
                                <OButton v-else @tap="funn.detail(v)" :clazz="'fs-n br px-n py-t'" :weak="true">参加</OButton>
                            </view>
                        </view>

                        <view class="pt-col pb-s">
                            <view>
                                {{ v.description }}
                            </view>
                            <view class="pt">
                                <view class="w-618 h-7em">
                                    <image mode="aspectFill" class="uni-img w-100 h-100 uni-img-br-n"
                                        :src="v.banner"/>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            -->