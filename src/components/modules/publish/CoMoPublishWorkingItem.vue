<template>
    <view class="o-h">
        <view class="br-ti br-tr o-h bg-con fx-aii-btn-def" @tap="emt('view')">
            <view class="px-x1 ls-x2 pt pb-s fx-s">
                <view class="h7">{{ v.title }}</view>
                <!--
                <view>
                    <CoSusAcyIndex :v="v" :joins="undefined"/>
                </view>
                -->
            </view>
        </view>
        <view class="py-t bg-con px-x1 fx-aii-btn-def" @tap="emt('view')">
            <view class="row">
                <view class="px-s d-ib" v-for="(m, n) in v.activity_tags" :key="n">
                    <view class="btn-def br-t">
                        <view class="fs-s px py-t tid">{{ m.name }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="bg-con pr-s"  @tap="emt('view')">
            <view class="pi-x1 d-ib ani-scaie-aii py-n fx-aii-btn-def br-1">
                <view class="fx-i tid pr-s">
                    <text class="fs-s">{{ activity_tool.gettime(v) }}</text>
                </view>
            </view>
            <view class="tiw px-t d-ib fs-s">|</view>
            <view class="d-ib ani-scaie-aii py-n fx-aii-btn-def br-1">
                <view class="fx-i px-s tid">
                    <text class="fs-s">{{ activity_tool.getfar(v) }}</text>
                    <text class="fs-s pi-s">{{ activity_tool.getaddress(v) }}</text>
                </view>
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
        <!---->
        <view class="bg-con br-bi br-br fx-s o-h">
            
            <!-- -->
            <view class="tid fx-aii-btn-def px-x1 py w-618">
                    <!--
                <view class="d-ib pr">
                    <CoSusAcyIndex :v="v" :joins="undefined"/>
                </view>
                    -->
                <view class="d-ib fs-s">
                    <UiI :i="'lock'" clazz="d-ib tiw"/>
                    <text class="pi-s">限</text>
                    <text class="px-s">{{ activity_tool.getjoin_limit(v) }}</text>
                    <text >人</text>
                </view>
                <view class="d-ib fs-s">
                    <text class="">，每人</text>
                    <text class="px-s">{{ v.fee || 0 }}</text>
                    <text class="">元</text>
                </view>
            </view>
            
            <view class="tis fx-aii-btn-def pi-x1 pr py w-382 ta-r">
                <view class="d-ib tis fs-s">
                    <UiI i='users' clazz="d-ib"/>
                    <text class="pi-s">{{ activity_tool.getjoiner_len(v) }}</text>
                    <text >人</text>
                </view>
                <view class="d-ib pi">
                    <CoSusAcyIndex :v="v" :joins="undefined"/>
                </view>
            </view>
        </view>
        <view class="fx-r">
            <view class="d-ib" v-if="!activity_tool.istyped_sm(v)">
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import CoSusAcyIndex from '@/components/status/activity/CoSusAcyIndex.vue';
import activity_tool from '@/tool/modules/activity_tool';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    v: Activity
}>()

const emt = defineEmits([ 'view' ])
</script>

            <!--
            <view class="fx-s">
                <view class="row">
                    <view class="px-s d-ib" v-for="(m, n) in v.activity_tags" :key="n">
                        <view class="btn-def br-s">
                            <view class="fs-s px py-t tid">{{ m.name }}</view>
                        </view>
                    </view>
                </view>
                <view class="" v-if="activity_tool.istyped_sm(v)">
                    <view class="fx-r tis fs-s">
                        <UiI :i="'lock'"/>
                        <text class="pi-s">{{ activity_tool.getjoin_limit(v) }}</text>
                        <text >人</text>
                    </view>
                </view>
            </view>
             -->
<!--

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