<template>
    <view class="fx-s fx-t ps-r zi-m w-100" >
        <view class="card w-100 br px-col py-col">
            <view class="py-col">
                <view class="fw-600 h5 hih tils-x1">{{ v.title }}</view>
            </view>
            <view class="pt-s">
                <view class="fx-i" v-if="v.publisher">
                    <CkAvatar clazz="w-2em h-2em fs-w" :src="v.publisher.avatar"/>
                    <view class="pi-s">
                        <view class="d-ib">{{ v.publisher.nickname }}</view>
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
                    <OButton clazz="d-ib fs-s br-1" :weak="true">报名中</OButton>
                    <view class="d-ib px-s fs-n">
                        <text>{{ activity_tool.gettime(v) }}</text>
                        <text class="pi-t">|</text>
                    </view>
                    <view class="d-ib fs-n">
                        <text>{{ activity_tool.getfar(v) }}</text>
                        
                        <text class="eiies pi-t">{{ activity_tool.getindex_address(v) }}</text>
                    </view>
                </view>
            </view>
            <view>
                <view class="" v-if="gallerylen == 1">
                    <CoImg :clazz="'h-14vh br o-h'" :src="gallery[0].url"/>
                </view>
                <view class="fx-i" v-else-if="gallerylen == 2">
                    <view class="w-44">
                        <CoImg :clazz="'h-14vh br-ti br-bi'" :src="gallery[0].url"/>
                    </view>
                    <view class="w-44">
                        <CoImg :clazz="'h-14vh br-tr br-br'" :src="gallery[1].url"/>
                    </view>
                </view>
                <view class="br o-h fx-s" v-else-if="gallerylen > 2">
                    <view class="w-33" v-for="(m, n) in gallery" :key="n">
                        <CoImg :clazz="'h-14vh'" :src="m.url"/>
                    </view>
                </view>
            </view>
            <view class="pt-x1">
                <view class="fx-s">
                    <view class="fx-i fx-1">
                        <CoViAvatarTogether :w="2" v-if="v.publisher" :items="[ v.publisher ]"/>
                        <view class="pi-s tid">
                            <text>{{ activity_tool.getjoiner_len(v) }}</text>
                            <text class="fs-n">人已上车</text>
                        </view>
                    </view>
                    <view>
                        <OButton :weak="true" @tap="emt('detail', v)" :clazz="'fw-550 mw-5em py-s br-rnd'">上车</OButton>
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
import CoImg from '@/components/media/img/CoImg.vue';
import CoViAvatarTogether from '@/components/visual/imgs/CoViAvatarTogether.vue';
import activity_tool from '@/tool/modules/activity_tool';
import { computed } from 'vue';

const prp = defineProps<{
    v: Activity,
    meizi: MANY
}>()

const gallery = computed((): ActivityMedia[] => {
    return activity_tool.getindex_banner(prp.v)
})

const gallerylen = computed((): number => gallery.value.length)

const address = computed((): ActivityAddress => (prp.v.activity_address || { }))

const emt = defineEmits([ 'detail' ])
</script>