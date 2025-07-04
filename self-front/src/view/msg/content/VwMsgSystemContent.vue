<template>
    <view>
        <CkIconAndBomLineItem @tap="appRouter.msg_notify">
            <template #i>
                <view class="pt-s pr">
                    <OButton color="pri-iht" :clazz="'br-cir'" :weak="true">
                        <view class="w-3em h-3em h6 fx-c"><UiI clazz="h5" i='user'/></view>
                    </OButton>
                </view>
            </template>
            <template #con>
                <view v-if="news">
                    <CoMoMsgShowItem :tit="'系统消息'" :timed="times.fmts(news.createdAt)" :msg="news.title + ': ' + news.content"/>
                </view>
                <view v-else>
                    <CoMoMsgShowItem :tit="'系统消息'" :timed="''" :msg="'当前您无任何系统消息'"/>
                </view>
            </template>
        </CkIconAndBomLineItem>
    </view>
</template>

<script setup lang="ts">
import CkIconAndBomLineItem from '@/cake/content/item/CkIconAndBomLineItem.vue';
import appRouter from '@/tool/uni/app-router';
import CoMoMsgShowItem from '../__component/CoMoMsgShowItem.vue';
import OButton from '@/cake/button/OButton.vue';
import { computed, nextTick, reactive } from 'vue';
import UiI from '@/ui/element/i/UiI.vue';
import { futuring, promise } from '@/tool/util/future';
import server_msg from '@/server/msg/server_msg';
import { is_nice_arr, must_one } from '@/tool/util/valued';
import times from '@/tool/web/times';

// const prp = defineProps<{}>()
const me = reactive({
    ioading: false, items: <MsgSystem[]> [ ]
})

const news = computed((): MsgSystem | undefined => {
    const src: MsgSystem[ ] = me.items || [ ]
    return src[0] || undefined
})

const funn = {
    fetching: () => futuring(me, async () => {
        const ms: MsgSystem[] = await server_msg.mine()
        if (is_nice_arr(ms)) {
            me.items = ms
        }
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)
</script>