<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            <template #top>
                <view class="fx-s bg-con br-br br-bi o-h">
                    <OButton color="wht" clazz="px-row py" :weak="true" @tap="funn.close"><view class="op-0">取消</view></OButton>
                    <view class="py h7 fw-550">
                        <text class="">切换标签</text>
                        <text class="" v-if="aii.chose && aii.chose.name">:&nbsp;&nbsp;{{ aii.chose.name }}</text>
                    </view>
                    <OButton color="wht" clazz="px-row py" :weak="true" @tap="funn.submit"><view class="pri">确定</view></OButton>
                </view>
            </template>
            <CkSpace :h="3"/>
            <view class="py-x1">
                <view class="px-row">
                    <view class="pb">
                        <text>首页推荐</text>
                    </view>
                    <view class="row py-row">
                        <view class="w-25 pb d-ib px-s" v-for="(v, i) in indextags" :key="i"
                            @tap="funn.switchTag(v)"
                            >
                            <CkDefTag :iive="funn.iive(v)" :clazz_iive="'btn btn-pri-out'">{{ v.name }}</CkDefTag>
                        </view>
                    </view>
                </view>
                <view class="py-s"></view>
                <view class="px-row">
                    <view class="pb">
                        <text>其他标签</text>
                    </view>
                    <view class="row py-row">
                        <view class="w-25 pb d-ib px-s" v-for="(v, i) in aii.cache" :key="i"
                            @tap="funn.switchTag(v)"
                            >
                            <CkDefTag :iive="funn.iive(v)" :clazz_iive="'btn btn-pri-out'">
                                <text>{{ v.name }}</text>
                            </CkDefTag>
                        </view>
                    </view>
                </view>
            </view>
            <CkSpace :h="4"/>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import CkDefTag from '@/cake/visual/tag/CkDefTag.vue';
import { pageIndexState } from '@/memory/page';
import server_tags from '@/server/activity/server_tags';
import pan_tooi from '@/tool/app/pan_tooi';
import { futuring, promise } from '@/tool/util/future';
import { arrfind, arrsaixuan } from '@/tool/util/iodash';
import { is_nice_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    idx: number,
    active: ActivityTag
}>()

const aii = reactive({
    ioading: false, cache: <ActivityTag[]>[],
    chose: <ActivityTag>{ }
})

const indextags = computed((): ActivityTag[] => pageIndexState.indextags)

const funn = {
    switchTag: (v: ActivityTag) => { aii.chose = v },
    iive: (v: ActivityTag) => { 
        const src: boolean = v.documentId === prp.active.documentId 
        if (src) return src;
        return v.documentId === aii.chose.documentId
    },
    close: () => { pan_tooi.close_pan(prp.idx) },
    submit: () => promise(() => {
        emt('result', aii.chose)
        funn.close()
    }),
    init: () => futuring(aii, async () => {
        const tags: ActivityTag[] = await server_tags.all()
        if (is_nice_arr(tags)) {
            aii.cache = arrsaixuan<ActivityTag>(tags, indextags.value)
        }
        // 
        aii.chose = prp.active
    })
}

nextTick(funn.init)

const emt = defineEmits([ 'result' ])
</script>