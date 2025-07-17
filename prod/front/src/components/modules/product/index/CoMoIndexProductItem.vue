<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br o-h">
            <view @tap="emt('detail', v)">
                <view class="o-h" v-if="gallerylen"
                    :style="{
                        'height': product_tool.getcover_h(gallery, w),
                    }">
                    <CoImg 
                        :clazz="'br-tr br-ti o-h h-100 ani-scaie-aii c-p'" :src="gallery[0].url"/>
                </view>
            </view>
            <!-- -->
            <view class="pi-col pr-t fx-aii-btn-def" @tap="emt('detail', v)">
                <view class="fw-550 hih fs-n d-ib c-p pb-s pt-t">
                    <text class="ani-scaie-aii">{{ v.title }}</text>
                </view>
            </view>
            <!-- -->
            <view class="" @tap="emt('detail', v)">
                <CoMoProductSubTitle :v="v" :clazz="'px-col'"/>
                <view class="pb-s fx-aii-btn-def px-col c-p">
                    <view v-if="product_tool.is_sm(v)" class="fx-s fx-b">
                        <!-- L -->
                        <view class="fx-i fx-1 fx-b">
                            <view class="fx-i" v-if="product_build_tool.which_sub_price(v) === product_build_tool.__VIEW_MODE_PRICE_FIRST">
                                <view class="money ani-scaie-aii">
                                    <text class="fs-s">￥</text>
                                    <text class="h9 fw-550">{{ product_tool.getprice_less(v) }}</text>
                                </view>
                                <view class="money px-s">
                                    <view><text class="fs-t">首单价</text></view>
                                </view>
                            </view>
                            <view v-else class="fx-i">
                                <view class="money ani-scaie-aii">
                                    <text class="fs-s">￥</text>
                                    <text class="h9 fw-550">{{ product_tool.getprice(v) }}</text>
                                </view>
                                <view class="tis ani-scaie-aii px-s">
                                    <text class="fs-t td-lt">￥</text>
                                    <text class="fs-t fw-550 td-lt">{{ product_tool.getprice_less(v) }}</text>
                                </view>
                            </view>
                        </view>
                        <!-- R -->
                        <view class="">
                            <view v-if="product_build_tool.which_sub_tip(v) === product_build_tool.__VIEW_MODE_TIP_TYPED">
                                <!--
                                <OButtonTag color="def" clazz="fx-c px-t br-1"><text class="fs-t">{{ product_tool.getinv_typed_sub(v) }}</text></OButtonTag>
                                -->
                                <OButtonTag color="def" clazz="fx-c px-t br-1">
                                    <text class="fs-t">浏览</text>
                                    <text class="fs-s pi-t">{{ product_build_tool.view_num_sell(v.numView) }}</text>
                                </OButtonTag>
                            </view>
                            <view v-else-if="product_build_tool.which_sub_tip(v) === product_build_tool.__VIEW_MODE_TIP_SELL">
                                <OButtonTag color="def" clazz="fx-c px-t br-1">
                                    <text class="fs-t pr-t">已售</text>
                                    <text class="fs-s">{{ product_build_tool.view_num_sell(v.numSell) }}</text>
                                </OButtonTag>
                            </view>
                            <view v-else-if="product_build_tool.which_sub_tip(v) === product_build_tool.__VIEW_MODE_TIP_HIGHT">
                                <OButtonTag color="err" clazz="fx-c px-t br-1">
                                    <text class="fs-t px-s">VIP品质</text>
                                </OButtonTag>
                            </view>
                            <!--
                            <view v-else class="fx-aii-btn-def br-rnd tis">
                                <text class="fs-t">{{ product_tool.getnum_sell_txt(v) }}</text>
                            </view>
                            -->
                        </view>
                    </view>
                    <view class="fx-s fx-b" v-else>
                        <view>

                        </view>
                        <view class="">
                            <!--
                            <text>{{ product_tool.getnum_view(v) }}</text>
                            <text class="fs-t">浏览</text>
                            -->
                            
                            <OButtonTag color="def" clazz="fx-c px-t br-1">
                                <text class="fs-t">浏览</text>
                                <text class="fs-s">{{ product_build_tool.view_num_sell(v.numView) }}</text>
                            </OButtonTag>
                        </view>
                    </view>
                </view>
            </view>

            <!-- -->
            <view v-if="IS_TEST_DEV">
                <view class="px-row fs-t pb-col">
                    <view class="px-t br-1 btn-def d-ib">{{ product_tool.getinv_typed_txt(v) }}</view>
                    <view class="pi-s d-ib">库存: {{ v.inv }}, 虚拟: {{ v.invWeak }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import product_tool from '@/tool/modules/product_tool';
import { is_json } from '@/tool/util/typed';
import { computed } from 'vue';
import CoMoProductSubTitle from '../inner/CoMoProductSubTitle.vue';
import UiI from '@/ui/element/i/UiI.vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import { IS_TEST_DEV } from '@/conf/conf';
import product_build_tool from '@/tool/modules/func/product_build_tool';

const prp = defineProps<{
    v: Product, w: number,
    joins: ActivityJoin[ ]
}>()

const gallery = computed((): Media[] => {
    return product_tool.getindex_banner(prp.v)
})

const gallerylen = computed((): number => gallery.value.length)

const emt = defineEmits([ 'detail' ])

const funn = {
    /*
    mainpg: (user: User) => future(async () => {
        if (user && user.id) {
            const u: UserMainPage = await authDispatch('fetch_someone_mainpag', { userid: user.id })
            // console.log('点击到的用户主页 =', u)
            uniRouter.gopg('user_mainpage')
        }
    })
    */
}
</script>
