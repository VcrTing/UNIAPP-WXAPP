<template>
    <view class="o-h">
        <view class="px-row">
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
            <view class="bg-con br-bi br-br o-h" @tap="emt('view', v)">
                <view class="fx-s fx-aii-btn-def px-x1 pt pb-t">
                    <view class="row">
                        <view class="px-s d-ib" v-for="(m, n) in v.activity_tags" :key="n">
                            <view class="btn-def br-s">
                                <view class="fs-s px py-t tid">{{ m.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="fx-r fx-aii-btn-def px-x1 pb pt-t">
                    <view class="d-ib">
                        <view class="">
                            <view class="d-ib fx-r btn-err px-s br-t">
                                <text class="">{{ activity_tool.getstarttime_remaining(v) }}</text>
                                <text class="pi-s fs-w">后开始</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="py-s">
            <view class="fx-aii-btn-def px-row py-s">
                
                <view class="btn-wht pt-col br-rnd py-s d-ib ani-scaie-aii">
                    <view class="fx-i px-x1 tid fs-n">
                        <UiI i="addr" clazz="fs-w"/>
                        <text class="pi-s">{{ activity_tool.getfar(v) }}</text>
                        <text class="pi-s">{{ activity_tool.getaddress(v) }}</text>
                    </view>
                </view>
            </view>
            <view class="fx-aii-btn-def px-row py-s">

                <view class="btn-wht pt-col br-rnd py-s d-ib ani-scaie-aii">
                    <view class="fx-i px-x1 tid fs-n">
                        <UiI i="time" clazz="fs-w"/>
                        <text class="px-s">{{ activity_tool.gettime(v) }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import activity_tool from '@/tool/modules/activity_tool';
import times from '@/tool/web/times';
import UiI from '@/ui/element/i/UiI.vue';
const prp = defineProps<{
    v: Activity
}>()

const emt = defineEmits([ 'view' ])
</script>
                <!--
                <view class="ps-r zi-t">
                    <CoImg clazz="w-2em h-2em fs-s br-cir abs-c zi-s r-0" :src="mock_orders.mapimg"/>
                </view>
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