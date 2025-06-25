<template>
    <view v-if="publisher">
        <view class="softer">
            <CoMoAdHeader>发布者</CoMoAdHeader>
            <view class="fx-i py fx-aii-btn-def px-row bg-con">
                <view class="pi-col h9" @tap="funn.__to(publisher.id)">
                    <CkAvatar v-if="publisher" :clazz="'w-3em h-3em'" :not_mainpage="true" :id="publisher.id" :src="publisher.avatarUrl"/>
                </view>
                <view class="fx-1 pi-x1">
                    <view class="h9 pt-s">
                        <text>{{ publisher.nickName }}</text>
                        <view class="d-ib pi">
                            <CkAgeSex :sex="publisher.gender" :age="publisher.age"/>
                        </view>
                    </view>
                    <view class="pt fx-i">
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
                </view>
                <view class="pr-col"  @tap="funn.__to(publisher.id)">
                    <view class="fx-r tiw">
                       
                        <OFI i="r"/>
                    </view>
                </view>
            </view>
            <view class="btn-pri px-row" v-if="is_publisher">
                <view class="px-col py-s fs-w fx-c">
                    <text>您是改活动的发布者，可以更改公告等内容。</text>
                </view>
            </view>
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
import CoMoAdHeader from '../component/CoMoAdHeader.vue';

const prp = defineProps<{
    one: Activity, is_publisher: boolean
}>()

const tags = computed((): MANY => {
    return must_one<ONE>(prp.one).tags || [ ]
})
const publisher = computed((): User => {
    return must_one<Activity>(prp.one).publisher || { }
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
 <!--
                        <view class="fs-w">查看主页</view>
                        <view><UiI i="r"/></view>
                        -->
                        <!--
                        <UiI i="check" clazz="d-ib" />
                        -->
                        <!--
                        <view class="pr-x2">
                            <view class="tis">
                                <text class="fs-s">发布数</text>
                                <text class="pi-s fs-s">23</text>
                            </view>
                        </view>
                        <view class="pr-x2">
                            <view class="tis">
                                <text class="fs-s">会员数</text>
                                <text class="pi-s fs-s">123</text>
                            </view>
                        </view>
                        -->

                    <!--
                    <view class="d-ib pi">
                        <view class="d-ib pri fs-w">
                            <text class="pr">#&nbsp;<text class="fs-n">十单十成</text></text>
                        </view>
                    </view>
                    -->
                    <!--
                    <view class="fx-s pt-s">
                        <OButtonDef :weak="true" clazz="px-t br-s fs-n">
                            <CkAgeSex :sex="publisher.sex" :age="publisher.age"/>
                        </OButtonDef>
                    </view>
                    -->