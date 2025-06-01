<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="w-100 br px-col py-col">
            <view class="py-col">
                <view class="fw-600 h5 hih tils-x1">{{ v.title }}</view>
            </view>
            <view class="pt-s">
                <view class="fx-i">
                    <CkAvatar clazz="w-2em h-2em fs-w" :src="v.publisher.avatar"/>
                    <view class="pi-s">
                        <view class="d-ib">{{ v.publisher.name }}</view>
                        <view class="d-ib pi-t">
                            <CkSex :sex="v.publisher.sex"/>
                        </view>
                        <view class="d-ib pri pi fs-w">
                            <text class="pr">#&nbsp;十单十成</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="py">
                <view class="pt-s">
                    <OButton clazz="d-ib fs-s" :weak="true">报名中</OButton>
                    <view class="d-ib px-s fs-n">
                        周五 05.23 20:30 |
                    </view>
                    <view class="d-ib fs-n">
                        20.6km 深圳湾体育中心
                    </view>
                </view>
            </view>
            <view>
                <view class="br o-h fx-s" v-if="v.gallery ">
                    <view class="w-33" v-for="(m, n) in v.gallery" :key="n">
                        <CoImg :clazz="'h-14vh'" :src="m.src"/>
                    </view>
                </view>
                <view class="br o-h" v-else>
                    <CoImg :clazz="'h-14vh'" :src="v.banner"/>
                </view>
            </view>
            <view class="">
                
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoViAvatarTogether from '@/components/visual/imgs/CoViAvatarTogether.vue';

const prp = defineProps<{
    v: ONE,
    meizi: MANY
}>()

const emt = defineEmits([ 'detail' ])
</script>