<template>
    <view>
        <view class="">
            <view class="pb-col pt-x2 px-row">
                <view class="sus px-col">发布者</view>
            </view>
            <view class="fx-i pt-col pb-col fx-aii-btn-def px-row">
                <view class="pi-col">
                    <CkAvatar :clazz="'w-3em h-3em'" :id="publisher.id" :src="publisher.avatarUrl"/>
                </view>
                <view class="fx-1 pi-x1">
                    <view class="h9">
                        <text>{{ publisher.nickName }}</text>
                        <view class="d-ib pi">
                            <CkAgeSex :sex="publisher.gender" :age="publisher.age"/>
                        </view>
                        <!--
                        <view class="d-ib pi">
                            <view class="d-ib pri fs-w">
                                <text class="pr">#&nbsp;<text class="fs-n">十单十成</text></text>
                            </view>
                        </view>
                        -->
                    </view>
                    <view class="pt-s fx-i">
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
                    </view>
                </view>
                <view class="pr-col">
                    <view class="fx-r tiw">
                        <!--
                        <view class="fs-w">查看主页</view>
                        <view><UiI i="r"/></view>
                        -->
                        <OFI i="r"/>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    one: Activity
}>()

const tags = computed((): MANY => {
    return must_one<ONE>(prp.one).tags || [ ]
})
const publisher = computed((): User => {
    return must_one<Activity>(prp.one).publisher || { }
})
</script>


                    <!--
                    <view class="fx-s pt-s">
                        <OButtonDef :weak="true" clazz="px-t br-s fs-n">
                            <CkAgeSex :sex="publisher.sex" :age="publisher.age"/>
                        </OButtonDef>
                    </view>
                    -->