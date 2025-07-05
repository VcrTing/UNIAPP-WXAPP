<template>
    <view class="o-h">
        <view class="br-ti br-tr o-h bg-con">
            <view class="px-x1 ls-x2 py">
                <text class="h7">{{ v.title }}</text>
            </view>
        </view>
        <view class="">
            <view class="row fx-i br" v-if="activity_tool.getindex_banner(v).length >= 3">
                <view class="w-333 h-12vh d-ib o-h" v-for="(m, n) in activity_tool.getindex_banner(v)" :key="n">
                    <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                </view>
            </view>
            <view class="row fx-i br" v-if="activity_tool.getindex_banner(v).length <= 2">
                <view class="w-44 h-12vh d-ib o-h" v-for="(m, n) in activity_tool.getindex_banner(v)" :key="n">
                    <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                </view>
            </view>
        </view>
        <view class="bg-con py br-bi br-br px-x1" @tap="">
            <view class="fx-s">
                <view class="row">
                    <view class="px-s d-ib" v-for="(m, n) in v.activity_tags" :key="n">
                        <view class="btn-def br-s">
                            <view class="fs-s px py-t tid">{{ m.name }}</view>
                        </view>
                    </view>
                </view>
                <view class="">
                    <view class="fx-r tis fs-s">
                        <UiI :i="'users'"/>
                        <text class="pi-s">{{ activity_tool.getjoiner_len(v) }}&nbsp;/&nbsp;{{ activity_tool.getjoin_limit(v) }}</text>
                    </view>
                </view>
            </view>
            <!--
            <view class="fx-r">
                <view class="d-ib" v-if="!activity_tool.istyped_sm(v)">
                    <view class="">
                        <view class="d-ib">
                            <text class="fs-n">限制</text>
                            <text class="px-s">{{ activity_tool.getjoin_limit(v) }}</text>
                            <text class="fs-n">人</text>
                        </view>
                        <view class="d-ib">
                            <text class="fs-n">，每人</text>
                            <text class="px-s">{{ v.fee }}</text>
                            <text class="fs-n">元</text>
                        </view>
                    </view>
                </view>
            </view>
            -->
        </view>
        <view class="py-col">
            <view class="btn-wht pt-col br-rnd mb-s py-s d-ib ani-scaie-aii">
                <view class="fx-i px-x1 tid">
                    <UiI i="addr" clazz="fs-w"/>
                    <text class="fs-s pi-s">{{ activity_tool.getfar(v) }}</text>
                    <text class="fs-s pi-s">{{ activity_tool.getaddress(v) }}</text>
                </view>
            </view>
            <view class="btn-wht pt-col br-rnd py-s d-ib ani-scaie-aii">
                <view class="fx-i px-x1 tid">
                    <UiI i="time" clazz="fs-w"/>
                    <text class="fs-s px-s">{{ activity_tool.gettime(v) }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import activity_tool from '@/tool/modules/activity_tool';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: Activity
}>()

</script>

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