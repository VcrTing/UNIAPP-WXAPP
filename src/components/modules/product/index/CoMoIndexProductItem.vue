<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br o-h">
            <view>
                <view class="o-h" v-if="gallerylen"
                    :style="{
                        'height': product_tool.getcover_h(gallery, w),
                        'max-height': '20vh'
                    }">
                    <CoImg 
                        :clazz="'br-tr br-ti o-h h-100 ani-scaie-aii'" :src="gallery[0].url"/>
                </view>
            </view>
            <!-- -->
            <view class="py-col pi-col pr-t fx-aii-btn-def" @tap="emt('detail', v)">
                <view class="fw-550 hih fs-n">
                    <view class="ani-scaie-aii d-ib c-p">{{ v.title }}</view>
                </view>
            </view>
            <!-- -->
            <view class=""  @tap="emt('detail', v)">
                <view class="fs-s pb-s fx-aii-btn-def px-col" v-if="product_tool.gettitle_sub(v)">
                    <view class="aoc">{{ product_tool.gettitle_sub(v) }}&nbsp;</view>
                </view>
                <view class="fx-s pb-s fx-aii-btn-def px-col">
                    <view class="fx-i fx-1">
                        <view class="money fx-i fx-b ani-scaie-aii">
                            <text class="fs-s">￥</text>
                            <text class="h8 fw-550">{{ product_tool.getprice(v) }}</text>
                        </view>
                        <view class="money px-s">
                            <view><text class="fs-s">{{ product_tool.getpricesub(v) }}</text></view>
                        </view>
                        <view class="pi-s"></view>
                    </view>
                    <view class="">
                        <view class="fx-aii-btn-def br-rnd tis">
                            <text class="fs-t">{{ product_tool.getnum_sell_txt(v) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { authDispatch } from '@/memory/global';
import media_tool from '@/tool/modules/common/media_tool';
import product_tool from '@/tool/modules/product_tool';
import uniRouter from '@/tool/uni/uni-router';
import { future, promise } from '@/tool/util/future';
import { computed } from 'vue';

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
    mainpg: (user: User) => future(async () => {
        if (user && user.id) {
            const u: UserMainPage = await authDispatch('fetch_someone_mainpag', { userid: user.id })
            // console.log('点击到的用户主页 =', u)
            uniRouter.gopg('user_mainpage')
        }
    })
}
</script>

                <!--
                <view class="fx-i" v-else-if="gallerylen == 2">
                    <view class="w-44 h-14vh">
                        <CoImg :clazz="'h-14vh br-ti br-bi '" :src="gallery[0].url"/>
                    </view>
                    <view class="w-44 h-14vh">
                        <CoImg :clazz="'h-14vh br-tr br-br'" :src="gallery[1].url"/>
                    </view>
                </view>
                <view class="br o-h fx-s" v-else-if="gallerylen > 2">
                    <view class="w-333 h-14vh" v-for="(m, n) in gallery" :key="n">
                        <CoImg :clazz="'h-14vh'" :src="m.url"/>
                    </view>
                </view>
                -->

<!--


            <view class="py-col" @tap="emt('detail', v)">
                <view class="fw-600 h5 hih tils-x1">
                    <view class="ani-scaie-aii d-ib c-p">{{ v.title }}</view>
                </view>
            </view>
            <view class="pt-s" v-if="v.publisher">
                <view class="fx-i">
                    <CkAvatar clazz="w-2em h-2em fs-w" :id="v.publisher.id" :src="v.publisher.avatarUrl"/>
                    <view class="pi-t">
                        <view class="d-ib">
                            <view class="d-ib fx-aii-btn-def px-t py-s br-1 c-p" @tap="funn.mainpg(v.publisher)">{{ v.publisher.nickName }}</view>
                            <view class="d-ib fx-aii-btn-def px-s br-cir">
                                <CkSex :sex="v.publisher.gender"/>
                            </view>
                        </view>
                        <view class="d-ib pri fs-w">
                            <CkSimpleTag>#&nbsp;十单十成</CkSimpleTag>
                        </view>
                    </view>
                </view>
            </view>
            <view class="py" @tap="emt('detail', v)">
                <view class="">
                    <CoSusAcyIndex :v="v" :joins="undefined"/>
                    <view class="d-ib px-t fs-n">
                        <CkSimpleTag><text class="">{{ activity_tool.getweek(v) }}</text>&nbsp;{{ activity_tool.gettime_start(v) }}</CkSimpleTag>
                        <text class="pi-t">|</text>
                    </view>
                    <view class="d-ib fs-n">
                        <CkSimpleTag>{{ activity_tool.getfar(v) }}</CkSimpleTag>
                        <CkSimpleTag>{{ activity_tool.getindex_address(v) }}</CkSimpleTag>
                    </view>
                </view>
            </view>
-->

                        <!--
                        <view class="tiw px-s">
                            <text>{{ activity_tool.getjoiner_len(v) }}</text>
                            <text class="fs-n">人已上车</text>
                        </view>
                        -->
                        <!--<CoViAvatarTogether :w="2" v-if="v.publisher" :items="[ v.publisher ]"/>-->