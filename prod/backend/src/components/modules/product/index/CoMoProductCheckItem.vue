<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br o-h">
            <view @tap="emt('detail', v)" class="">
                <OScrollX>
                    <view class="o-h w-7em h-8em d-ib" v-for="(v, i) in gallery" :key="i"
                        :style="{
                            'height': '',
                            'max-height': '14em'
                        }">
                        <CoImg 
                            :clazz="'h-100 ani-scaie-aii'" :src="v.url"/>
                    </view>
                </OScrollX>
            </view>
            <!-- -->
            <view class="pt-col pi-col pr-t fx-aii-btn-def" @tap="emt('detail', v)">
                <view class="fw-550 hih fs-n d-ib c-p">
                    <text class="ani-scaie-aii">{{ v.title }}</text>
                </view>
                
                <view v-for="(v, i) in v.tags" :key="i" class="d-ib mi">
                    <OButtonTag clazz="fs-t px-s br-1" color="def">{{ v.name }}</OButtonTag>
                </view>
            </view>
            <!-- -->
            <view class="">
                <CoMoProductSubTitle :v="v" :clazz="'px-col'"/>
                <view class="py-t fx-aii-btn-def px-col">
                    <view class="fx-s fx-b" v-if="product_tool.is_free(v)">
                        <view>

                        </view>
                        <view class="fs-s tis">
                            <text>{{ product_tool.getnum_view(v) }}</text>
                            <text class="fs-t">浏览</text>
                        </view>
                    </view>
                    <view v-else class="fx-s fx-b">
                        <!-- L -->
                        <view class="fx-i fx-1 fx-b">
                            <view class="money ani-scaie-aii">
                                <text class="fs-s">￥</text>
                                <text class="h9 fw-550">{{ product_tool.getprice(v) }}</text>
                            </view>
                            <view class="money px-s">
                                <view><text class="fs-s">{{ product_tool.getprice_less(v) }}</text></view>
                            </view>
                            <view class="pi-s"></view>
                        </view>
                        <!-- R -->
                    </view>
                </view>
                
                <view class="pb-col pr-col">
                    <view class="fx-r fs-t" v-if="v.user">
                        <CkAvatar clazz="w-2em h-2em" :src="v.user.avatarUrl" :id="v.user.id"/>
                        <text class="pi-s">{{ v.user.nickName }}</text>
                    </view>
                    <view class="px-s"></view>
                    <view class="fx-r">
                        <view class="pr fx-r">
                            <OButtonTag color="def" clazz="fs-s px-s br-1">
                                {{ product_tool.gettyped_txt(v) }}
                            </OButtonTag>
                            <view class="px-s"></view>
                            <OButtonTag color="def" clazz="fs-s px-s br-1">
                                {{ product_tool.getinv_typed_txt(v) }}
                            </OButtonTag>
                        </view>
                        <OButtonTag clazz="fs-t px-s py-t br-rnd" @tap="emt('pass', v)">审核通过</OButtonTag> 
                    </view>
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
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import OButton from '@/cake/button/OButton.vue';

const prp = defineProps<{
    v: Product, w: number,
    joins: ActivityJoin[ ]
}>()

const gallery = computed((): Media[] => {
    return product_tool.getimgs(prp.v)
})

const gallerylen = computed((): number => gallery.value.length)

const emt = defineEmits([ 'detail', 'pass' ])

const funn = {
    pass: () => {
        emt('pass')
    }
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
