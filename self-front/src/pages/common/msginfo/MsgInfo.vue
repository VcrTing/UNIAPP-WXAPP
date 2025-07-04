<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :mat="true" @back="uniRouter.back">
            <template #tit><view class="header ta-c">{{ tit }}</view></template>
        </CoAppTopBackBar>
        <view class="py-row">
            <VwMsgInfoActivity v-if="code == 1"/>
            <VwMsgInfoYaoQing v-else-if="code == 2"/>
            <VwMsgInfoAnnouncement v-else-if="code == 3"/>
            <VwMsgInfoNotify v-else/>
        </view>
    </PageLayout>
</template>

<script setup lang="ts">
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import VwMsgInfoActivity from '@/view/msg/msginfo/VwMsgInfoActivity.vue';
import VwMsgInfoAnnouncement from '@/view/msg/msginfo/VwMsgInfoAnnouncement.vue';
import VwMsgInfoNotify from '@/view/msg/msginfo/VwMsgInfoNotify.vue';
import VwMsgInfoYaoQing from '@/view/msg/msginfo/VwMsgInfoYaoQing.vue';
import { computed } from 'vue';

// const prp = defineProps<{}>()

const code = computed(() => {
    const k = storage.get('PAGE_MSGINFO_KEY') || 0
    return k
})

const tit = computed(() => {
    const src = code.value
    if (src === 1) return '活动消息';
    if (src === 2) return '邀请我的';
    if (src === 3) return '系统公告';
    return '系统消息';
})
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, pages, uni-page-body
	background: $pri-pag-bg
</style>