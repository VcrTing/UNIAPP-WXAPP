<template>
    <view class="">
        <view class="">
            <view class="br-ti br-tr o-h bg-con fx-aii-btn-def" @tap="emt('view', v)">
                <view class="px-x1 ls-x2 py">
                    <text class="h7">{{ v.title }}</text>
                </view>
            </view>
            <view class="fx-aii-btn-def" @tap="emt('view', v)">
                <view class="fx-i br" v-if="activity_tool.getindex_banner(v).length >= 3">
                    <view class="w-333 h-12vh d-ib o-h" v-for="(m, n) in activity_tool.getindex_banner(v)" :key="n">
                        <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                    </view>
                </view>
                <view class="fx-i br" v-if="activity_tool.getindex_banner(v).length <= 2">
                    <view class="w-44 h-12vh d-ib o-h" v-for="(m, n) in activity_tool.getindex_banner(v)" :key="n">
                        <CoImg clazz="h-100 ani-scaie-aii ts" :src="m.url"/>
                    </view>
                </view>
                <view class="fx-i br" v-if="activity_tool.getindex_banner(v).length <= 0">
                    <view class="w-44 h-12vh d-ib o-h">
                        <view clazz="h-100 ani-scaie-aii ts"></view>
                    </view>
                </view>
            </view>
            <view class="bg-con br-bi br-br o-h">
                <view class="">
                    <view class="tid">
                        <view class="d-ib px pt pb-s fx-aii-btn-def">
                            <view class="d-ib py-t fs-s fx-i br-rnd pr-s btn-def">
                                <UiI i="addr" clazz="d-ib px-s"/>
                                <text class="">{{ activity_tool.getfar(v) }}</text>
                                <text class="px-s">{{ activity_tool.getaddress(v) }}</text>
                            </view>
                        </view>
                        <view class="d-ib px pt pb-s fx-aii-btn-def">
                            <view class="d-ib py-t fs-s fx-i br-rnd pr-s btn-def">
                                <UiI i="time" clazz="d-ib px-s"/>
                                <text class="">{{ activity_tool.gettime_short(v) }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="fx-s">
                    <view class="fx-i h-3em fx-aii-btn-def pi-x1 w-50">
                        <view class="">
                            <view class="br-t fs-n tis">
                                <text class="">{{ activity_tool.getjoin_remaining(v) }}</text>
                                <text class="pi-s fs-s">人参与</text>
                            </view>
                        </view>
                    </view>
                    <view class="fx-r h-3em fx-aii-btn-def px-x1 w-50">
                        <view class="" v-if="join_tool.judge_is_join(joins, v)">
                            <view class="btn-err fs-s px-s py-t br-t">已报名</view>
                        </view>
                        <view v-else>
                            <view v-if="activity_tool.isstarted(v)" class="btn-err fs-s px-s py-t br-t">已开始</view>
                            <view v-else class="btn-pri fs-s px-s py-t br-t">报名中</view>
                        </view>
                    </view>
                </view>
                <!--
                <view class="fx-s fx-aii-btn-def px-x1 pt pb-t">
                    <view class="row">
                        <view class="px-s d-ib" v-for="(m, n) in v.activity_tags" :key="n">
                            <view class="btn-def br-s">
                                <view class="fs-s px py-t tid">{{ m.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                -->
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import activity_tool from '@/tool/modules/activity_tool';
import join_tool from '@/tool/modules/join_tool';
import UiI from '@/ui/element/i/UiI.vue';
const prp = defineProps<{
    v: Activity,
    joins: ActivityJoin[ ]
}>()

const emt = defineEmits([ 'view' ])


</script>
