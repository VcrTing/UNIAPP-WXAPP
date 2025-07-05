<template>
    <view v-if="publisher">
        <view class="softer">
            <CoMoPdHeader>发布者</CoMoPdHeader>
            <view class="fx-i py fx-aii-btn-def px-row bg-con">
                <view class="pi-col h9" @tap="funn.__to(publisher.id)">
                    <CkAvatar v-if="publisher" :clazz="'w-3em h-3em'" :not_mainpage="true" :id="publisher.id" :src="publisher.avatarUrl"/>
                </view>
                <view class="fx-1 pi-x1">
                    <view class="">
                        <text>{{ publisher.nickName }}</text>
                        <view class="d-ib pi">
                            <CkSimpleTag>
                                <CkSex :sex="publisher.gender"/>
                            </CkSimpleTag>
                            <CkSimpleTag>
                                <text>{{ publisher.age }}</text>
                            </CkSimpleTag>
                        </view>
                    </view>
                    <view class="pt-s fx-i">
                        <view class="d-ib fs-s">
                            <view class="sus">
                                <view class=" mr d-ib">
                                    <text>#</text>
                                    <text class="pi-s">平台认证</text>
                                </view>
                                <view class=" mr d-ib">
                                    <text>#</text>
                                    <text class="pi-s">十单十成</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!---->
                </view>
                <view class="pr-col"  @tap="funn.__to(publisher.id)">
                    <view class="fx-r tiw">
                        <OFI i="r"/>
                    </view>
                </view>
                <!--
                -->
            </view>
            <!--
            <view class="btn-pri px-row ani-scaie-aii" v-if="is_publisher">
                <view class="px-col py-s fs-w fx-c">
                    <text>您是改活动的发布者，可以更改公告等内容。</text>
                </view>
            </view>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import { authDispatch } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';
import CoMoPdHeader from '../__component/CoMoPdHeader.vue';
import { PUBLISHER_DEF } from '@/conf/conf-role';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CkDefTag from '@/cake/visual/tag/CkDefTag.vue';
import CkSimpleTag from '@/cake/visual/tag/CkSimpleTag.vue';

const prp = defineProps<{
    v: Product, is_publisher: boolean
}>()

const publisher = computed((): User => {
    return must_one<Product>(prp.v).user || PUBLISHER_DEF
})

const funn = {
    __to: async (userid: any) => {
        if (userid) {
            const u: UserMainPage = await authDispatch('fetch_someone_mainpag', { userid })
            // console.log('点击到的用户主页 =', u)
            uniRouter.gopg('user_mainpage')
        }
    },
}
</script>