<template>
    <view v-if="publisher">
        <view class="softer">
            <view class="fx-i py-s fx-aii-btn-def px-row bg-con">
                <view class="pi-col h9" @tap="funn.__to(publisher.id)">
                    <CkAvatar v-if="publisher" :clazz="'w-2em h-2em'" :not_mainpage="true" :id="publisher.id" 
                        :src="publisher.avatarUrl || info.userDefAvatarUrl"/>
                </view>
                <view class="fx-1 pi-s">
                    <view class="fs-n">
                        <view class="fx-aii-btn-def py d-ib px-s">{{ publisher.nickName }}</view>
                        <view class="d-ib">
                            <CkSimpleTag>
                                <CkSex :sex="publisher.gender"/>
                            </CkSimpleTag>
                            <CkSimpleTag>
                                <text>{{ publisher.age || 18 }}</text>
                                <text class="fs-s">岁</text>
                            </CkSimpleTag>
                        </view>
                    </view>
                    <!--
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
                    </view>-->
                </view>
                <view class="pr-s"  @tap="funn.__to(publisher.id)">
                    <view class="fx-r sus" v-if="is_publisher">
                        <OButtonTag color="blue" clazz="px-s br-1 fx-r">
                            <text class="fs-s">我是发布者</text>
                        </OButtonTag>
                    </view>
                    <view class="fx-r sus" v-else>
                        <!--
                        <OFI i="r"/>
                        -->
                        <OButtonTag color="blue" clazz="pi-s br-1 fx-r">
                            <text class="fs-s">主页</text>
                            <OFI i="r" clazz="fs-s"/>
                        </OButtonTag>
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
import OButtonTag from '@/cake/button/OButtonTag.vue';

const prp = defineProps<{
    v: Product, is_publisher: boolean, info: AppInfo
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