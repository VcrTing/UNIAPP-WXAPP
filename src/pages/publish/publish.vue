<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'bg-con pb'" :mat="true">
			<view class="pi-row pt">
                <view class="h4 bb">活动</view>
			</view>
		</CoAppTopBar>

        <view class="">
            <view class="bg-con">
                <VwPublishTop class="px-row"/>
            </view>
            <VwPublishTabPag/>

            <CoBomPlusBtn :bombar="true" @do="funn.plus"/>
        </view>
        <CoAppBottomBar/>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import CoBomPlusBtn from '@/components/element/button/CoBomPlusBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import VwPublishTabPag from '@/view/publish/publish/VwPublishTabPag.vue';
import VwPublishTop from '@/view/publish/publish/VwPublishTop.vue';
import { reactive } from 'vue';
// const prp = defineProps<{}>()

const aii = reactive({
    
})

const funn = {
    plus: () => {
        uniRouter.gopg('publish_plus')
    }
}
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>