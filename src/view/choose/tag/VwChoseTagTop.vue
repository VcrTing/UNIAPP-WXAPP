<template>
    <view>
        <view class="py-row">
            <view class="ts">
                <view class="d-ib pr pb" v-for="(v, i) in aii.chose" :key="i">
                    <OButtonWht :clazz="'fx-c btn-rnd'" :weak="true">
                        <view class="pi-row">{{ v.tit }}</view>
                        <OFI @tap="funn.kiii(v, i)" clazz="fx-aii-btn-def w-2em h-2em" :i="'x'"/>
                    </OButtonWht>
                </view>
            </view>
        </view>
        <view class="pb-row">
            <view>
                <CoSearchInput class="bg-con br-rnd" :i="'search'" :ir="'x'"
                    :def="form.search" 
                    @result="(v) => form.search = v"
                    @tapi="funn.submit" @tapr="funn.submit"
                    :pchd="'请输入标签名称'"/>
            </view>
        </view>
        <view class="card pa-card">
            <OScrollY 
                :styie="{
                    'height': 'calc(80vh - 28em)'
                }"
            >
                <view class="card py-col">
                    <view v-for="(v, i) in tags" :key="i" class="">
                        <view :clazz="(funn.has(i) ? 'btn-def' : '') + ' px-x2 py-col br-rnd'"
                            @tap="funn.chose(v, i)">
                            <view>
                                {{ v.tit }}
                            </view>
                        </view>
                    </view>
                </view>
            </OScrollY>
            <view>

            </view>
        </view>
        <view>
            <view class="py-row"></view>
            <VwChoseTagHistory/>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OFI from '@/cake/button/i/OFI.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoSearchInput from '@/components/element/input/CoSearchInput.vue';
import mock_tags from '@/server/mock/publish/mock_tags';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';
import VwChoseTagHistory from './VwChoseTagHistory.vue';

// const prp = defineProps<{}>()
const form = reactive({ search: '' })

// const prp = defineProps<{}>()
const aii = reactive({
    chose: <MANY>[ ], i: <number[]>[ ]
})

const tags = computed(() => {
    return mock_tags.tags
})

const funn = {
    has: (i: number) => {
        return aii.i.indexOf(i) >= 0
    },
    chose: (v: ONE, i: number) => {
        if (funn.has(i)) {
            aii.i.length = 0; aii.chose.length = 0
        }
        else {
            aii.chose.push(v); aii.i.push(i);
        }
    },
    submit: () => {
        console.log('')
    },
    kiii: (v: ONE, i: number) => {
        
    }
}
</script>