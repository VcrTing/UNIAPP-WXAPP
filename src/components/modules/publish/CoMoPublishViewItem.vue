<template>
    <view class="card fx-s o-h">
        <view class="w-5em h-5em">
            <CoImg clazz="h-100" :src="funn.get_banner_src(v)"/>
        </view>
        <view class="fx-1 px">
            <view class="pt-s">
                <text class="h9 ls">{{ v.title }}</text>
            </view>
            <view class="fx-s pt">
                <view class="fx-1 fx-i">
                    <view class="fx-i">
                        <UiI class="fs-n" i='time'/>
                        <view class="fs-n pi-s tis">{{ times.fmt(v.createdAt) }}</view>
                    </view>
                    <view class="px-s"></view>
                    <view class="fx-r tis fs-s">
                        <!--<UiI i='lock'/>-->
                        <text class="pi-s">
                            {{  }}
                        </text>
                    </view>
                </view>
                <view>
                    <slot></slot>
                </view>
            </view>
        </view>
        <view>
            <!--
            <OButtonDef :weak="true" clazz="fs-s px-s br-s">已完成</OButtonDef>
            -->
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
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { DATA_ACTIVITY_BANNER_DEF } from '@/conf/conf-datas';
import activity_tool from '@/tool/modules/activity_tool';
import { must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: Activity
}>()

const funn = {
    get_banner_src: (v: Activity): string => {
        const one: ActivityMedia = must_one(activity_tool.getbanner(v)[0]);
        return one.url || DATA_ACTIVITY_BANNER_DEF.url
    }
}

</script>