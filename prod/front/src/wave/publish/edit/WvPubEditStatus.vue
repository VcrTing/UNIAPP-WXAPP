<template>
    <view class="bg-con" :class="ispc ? 'br' : ''">
        <view class="pi-inp">
            <view class="fx-s">
                <view class="fx-i">
                    <view><text>操作</text></view>
                    <view class="fx-r py px-inp">
                        <!--
                        <switch class="o-switch" checked @change="funn.switchSelf" />
                        -->
                    </view>
                </view>
                <view class="fx-r pr-inp py-col">
                    <OButton v-if="!me.ioading" @tap="funn.openTrash" color="err" clazz="px mh-btn fx-c br-rnd" :weak="true">
                        <UiI i="trash"/>
                        <text>删除商品</text>
                    </OButton>
                    <view v-else class="mh-btn fx-r">
                        <CkIoading :color="'err'"/>
                    </view>
                </view>
            </view>
            <CoAppConfirm @confirm="funn.trash"/>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkIoading from '@/cake/content/ioading/CkIoading.vue';
import CoAppConfirm from '@/components/app/confirm/CoAppConfirm.vue';
import { app_confirm } from '@/conf/conf-app';
import { uiGetters } from '@/memory/global';
import server_pubplus from '@/server/publish/server_pubplus';
import appRouter from '@/tool/uni/app-router';
import { futuring, promise } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    aii: ONE, canedit: boolean, documentId: string
}>()

const me = reactive({ ioading: false })

const funn = {
    openTrash: () => {
        app_confirm()
    },
    trash: () => futuring(me, async () => {
        const src: Product = await server_pubplus.deleted(prp.documentId)
        if (src && src.documentId) {
            appRouter.publish_waiting()
        }
    })
}

const ispc = computed((): boolean => uiGetters.ispc)
</script>

        <!--
        <view class="pt-x2 px-inp pb">
            <view class="fx-r">
                <OButton color="err" clazz="px mh-btn fx-c br-rnd" :weak="true">
                    <UiI i="trash"/>
                    <text>删除活动</text>
                </OButton>
            </view>
        </view>
        -->