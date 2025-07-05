<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            <view class="py-x2">
                <view class="fx-c"><text class="header-s ls">排序方式</text></view>
            </view>
            <view class="px-row">
                <view>
                    <view class="py-s softer" v-for="(v, i) in aii.tabs" :key="i"
                        @tap="emt('result', v)"
                    >
                        <view class="py px ta-c fx-aii-btn-def br-1"
                            :class="v.v == active.v ? 'bg-def' : ''"
                        >{{ v.name }}</view>
                    </view>
                </view>
            </view>
            <CkSpace :h="2"/>
            <view class="mh-app-bottom-bar"></view>
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    idx: number,
    active: ONE
}>()

const aii = reactive({
    ioading: false, 
    tabs: [
        { name: '全部', v: 0 },
        { name: '热门排行', v: 1 }
    ]
})

const funn = {
    
}

const emt = defineEmits([ 'result' ])

</script>