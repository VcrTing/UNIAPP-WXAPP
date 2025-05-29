<template>
    <view class="pt-s">
        
        <view class="fx-s pt pb">
            <view class="sus">
                <text>16</text>
                <text>人一起</text>
            </view>
            <view>
                <view class="pri fs-n">
                    <text>仅剩</text>
                    <text>6</text>
                    <text>个名额</text>
                    <UiI clazz="d-ib" :i="'r'"/>
                </view>
            </view>
        </view>
        <view class="pb-col pt">
            <view class="fx-i pt-s">
                <view class="w-20" v-for="(v, i) in members" :key="i">
                    <CoMoActivityJoinerBlock :v="v"/>
                </view>
                <view class="w-20" v-if="last">
                    <view class="fx-c">
                        <view class="br-cir ps-r">
                            <view class="w-3em h-3em br-cir">
                                <CkAvatar :src="last.avatar" clazz="w-100 h-100"/>
                            </view>
                            <view class="abs-r b-0 w-3em h-3em br-cir">
                                <view class="w-100 h-100 bg-028 br-cir fx-c">
                                    <UiI clazz="c-fff" :i="'more'"/>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="ta-c pb-s pt-n eiies w-100">
                        <view class="tis fs-s eiies w-100">
                            &nbsp;
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import CoMoActivityJoinerBlock from '@/components/modules/activity/CoMoActivityJoinerBlock.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    one: ONE
}>()

const members = computed((): MANY => {
    const src = mock_meizi.items
    if (src && src.length >= 5) {
        return must_arr([
            src[0], src[1], src[2], src[3]
        ])
    }
    return src
})

const last = computed((): ONE | null => {
    const src = mock_meizi.items
    if (src && src.length >= 5) {
        // const res = src.splice(4, 5)
        return src[4]
    }
    return null
})
</script>