<template>
    <view>
        <view class="card pa-card">
            <view class="fx-s pi-col">
                <view class="header-s py-col">邀请内容</view>
            </view>
            <view class="pt-col">
                <CkInpItem :tit="'活动名'">
                    <OInput :def="form.minute" @result="(v: any) => form.minute = v" :pchd="'请输入活动名称'"/>
                </CkInpItem>
                <CkInpItem :tit="'人数'">
                    <OInput :def="form.timed" @result="(v: any) => form.timed = v" :pchd="'请输入参与者的人数'"/>
                </CkInpItem>
                <CkInpItem :tit="'主标签'">
                    <view class="inp px-inp mh-inp fx-i" @click="funn.addtag">
                        <OButtonDef :weak="true" clazz="br-s">
                            <UiI :i="'+'"/>
                        </OButtonDef>
                    </view>
                </CkInpItem>
                <!--
                <OButtonDef :weak="true" :clazz="'w-100 br ta-i'">
                    <view>
                        <view class="h7">私人拍照活动</view>
                    </view>
                </OButtonDef>-->
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const mezi = computed(() => {
    return [ mock_meizi.items[0], mock_meizi.items[1] ]
})

const form = reactive({
    minute: '', timed: '', address: ''
})

const funn = {
    addtag: () => {
        appRouter.chose_tags()
    }
}

defineExpose(funn)
</script>