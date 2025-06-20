<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con pb-s'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">{{ tit }}</view></template>
        </CoAppTopBackBar>
        <view v-if="code == 1">
            <VwUserManagerTags/>
            <view class="mh-8em"></view>
        </view>
        <view v-if="code == 2">
            <VwUserManagerAddr/>
            <view class="mh-8em"></view>
        </view>
        <view v-if="code == 3">
            <VwUserManagerLove />
            <view class="mh-8em"></view>
        </view>
        <view v-if="code == 4">
            <VwUserManagerPays />
            <view class="mh-8em"></view>
        </view>
        <CoBomBackBtn/>
    </PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import VwUserManagerAddr from '@/view/user/manager/addr/VwUserManagerAddr.vue';
import VwUserManagerLove from '@/view/user/manager/love/VwUserManagerLove.vue';
import VwUserManagerPays from '@/view/user/manager/pays/VwUserManagerPays.vue';
import VwUserManagerTags from '@/view/user/manager/tags/VwUserManagerTags.vue';
import { computed, ref } from 'vue';

const code = computed(() => {
    const src = storage.get('PAGE_MANAGER_KEY') || 0
    return src
})

const tit = computed(() => {
    const v = code.value;
    if (v == 1) { return '标签管理'; }
    else if (v == 2) { return '地址管理'; }
    else if (v == 3) { return '我的关注'; }
    else if (v == 4) { return '金额记录'; }
    return '标签管理';
})

const funn = {
    submit: () => {
        
        // uniRouter.navigatorpg('publish')
    }
}
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>