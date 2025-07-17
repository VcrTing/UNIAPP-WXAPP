<template>
    <view v-if="publisher">
        <view class="softer">
            <view class="fx-i py-s fx-aii-btn-def px-row bg-con">
                <view class="pi-col h9" @tap="funn.__to(publisher.id)">
                    <CkAvatar v-if="publisher" :clazz="'w-2em h-2em'" :not_mainpage="true" :id="publisher.id" 
                        :src="publisher.avatarUrl || info.userDefAvatarUrl"/>
                </view>
                <view class="fx-1 pi-s" @tap="funn.__to(publisher.id)">
                    <view class="fs-n">
                        <view class="fx-aii-btn-def py d-ib px-s c-p">{{ publisher.nickName }}</view>
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
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authDispatch, soDispatch } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';
import { PUBLISHER_DEF } from '@/conf/conf-role';
import CkSex from '@/cake/visual/ider/CkSex.vue';
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
            const u: UserMainPage = await soDispatch('fetch_someone_mainpag', { userid })
            uniRouter.gopg('user_mainpage')
        }
    },
}
</script>