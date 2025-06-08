<template>
    <view class="card fx-s o-h">
        <view class="w-5em h-5em">
            <CoImg clazz="h-100" :src="funn.get_banner_src(v)"/>
        </view>
        <view class="fx-1 px">
            <view class="h9">{{ v.title }}</view>
            <view class="fx-s pt">
                <view class="fx-1">
                    <view class="fx-i">
                        <UiI class="fs-s" :i="'time'"/>
                        <view class="fs-n pi-s tis">{{ activity_tool.gettime(v) }}&nbsp;开始</view>
                    </view>
                </view>
            </view>
        </view>
        <view>
            <!--
            <OButtonDef :weak="true" clazz="fs-s px-s br-s">已完成</OButtonDef>
            -->
            <slot>
                <!--
                <view class="pr pi-s">
                    <view class="pb">&nbsp;</view>
                    <view v-if="v.status == 2" class="money fx-r">
                        <UiI class="fs-s" :i="'+'"/>
                        <view class="pi-t fw-550">{{ v.money.price }}</view>
                    </view>
                    <view v-if="v.status == -1" class="fx-r">
                        <OButtonDef :weak="true" clazz="fs-s px-s br-s">已取消</OButtonDef>
                    </view>
                </view>
                -->
            </slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import activity_tool from '@/tool/modules/activity_tool';
import UiI from '@/ui/element/i/UiI.vue';
import { computed } from 'vue';

const prp = defineProps<{
    v: Activity
}>()

const funn = {
    get_banner_src: (v: Activity): string => {
        const one: ActivityMedia = activity_tool.getbanner(v)[0];
        console.log('one =', one)
        return one.url
    }
}

</script>