<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-con pb-s'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">{{ tit }}</view></template>
        </CoAppTopBackBar>
        <view class="ps-r">
            <view v-if="code == 1">
                <VwChoseUser/>
            </view>
            <view v-if="code == 2">
                <VwChoseTag/>
            </view>
        </view>
        <CoBomBackBtn/>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { storage } from '@/tool/web/storage';
import VwChoseTag from '@/view/choose/VwChoseTag.vue';
import VwChoseUser from '@/view/choose/VwChoseUser.vue';
import { computed, ref } from 'vue';

const code = computed(() => {
    const src = storage.get('PAGE_CHOOSE_KEY') || 0
    return src
})

const tit = computed(() => {
    const v = code.value;
    if (v == 1) return '选择目标用户';
    else if (v == 2) return '选择活动主标签';
    return '选择用户';
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