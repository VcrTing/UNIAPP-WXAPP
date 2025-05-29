<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br px-col py-col">
            <view class="py-col">
                <view class="fw-600 h5 hih tils-x1">{{ v.title }}</view>
            </view>
            <view class="pt-s">
                <view class="fx-i">
                    <CkAvatar clazz="w-2em h-2em h8" :src="v.publisher.avatar"/>
                    <view class="pi-s">
                        <view class="d-ib">{{ v.publisher.name }}</view>
                        <view class="d-ib pi-t">
                            <CkSex :sex="v.publisher.sex"/>
                        </view>
                        <view class="d-ib pri pi-row h8">
                            <text class="pr">#&nbsp;服务好</text>
                            <text class="pr">#&nbsp;十单十成</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="py-row">
                <view class="pt-s">
                    <OButton clazz="d-ib fs-s" :weak="true">报名中</OButton>
                    <view class="d-ib px-s fs-n">
                        周五 05.23 20:30 |
                    </view>
                    <view class="d-ib">
                        20.6km 深圳湾体育中心
                    </view>
                </view>
            </view>
            <view>
                <view class="br o-h fx-s" v-if="v.gallery ">
                    <view class="w-33" v-for="(m, n) in v.gallery" :key="n">
                        <image class="w-100 h-14vh" mode="aspectFill" :src="m.src"/>
                    </view>
                </view>
                <view class="br o-h" v-else>
                    <view >
                        <image class="w-100 h-14vh" mode="aspectFill" :src="v.banner"/>
                    </view>
                </view>
            </view>
            <view class="pt-x1">
                <view class="fx-s">
                    <view class="fx-i fx-1">
                        <view class="fx-i">
                            <view v-for="(v, i) in [meizi[2], meizi[3]]" :key="i">
                                <CkAvatar clazz="w-2em h-2em" :src="v.avatar"/>
                            </view>
                        </view>
                        <view class="pi-s tid fs-n">
                            11人已上车
                        </view>
                    </view>
                    <view>
                        <OButton :weak="true" @tap="emt('detail', v)" :clazz="'fw-550 mw-5em mh-btn br-rnd'">上车</OButton>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

const prp = defineProps<{
    v: ONE,
    meizi: MANY
}>()

const emt = defineEmits([ 'detail' ])
</script>