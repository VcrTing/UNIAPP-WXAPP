<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'bg-pag-pri pb'" :mat="true">
			<view class="pi-row pt">
                <view class="h4 bb">活动</view>
			</view>
		</CoAppTopBar>

        <view class="pt-row">
            <VwPublishPlusBtn class="px-row"/>
            <view class="py-row"></view>
            <VwPublishTabPag class="pt"/>
        </view>
        <CoAppBottomBar/>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppBottomBar from '@/components/app/bar/CoAppBottomBar.vue';
import CoAppTopBar from '@/components/app/bar/CoAppTopBar.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { uiState } from '@/memory/global';
import VwPublishPlusBtn from '@/view/publish/publish/VwPublishPlusBtn.vue';
import VwPublishTabPag from '@/view/publish/publish/VwPublishTabPag.vue';
import { reactive } from 'vue';
// const prp = defineProps<{}>()

const aii = reactive({
    
})
</script>

<style lang="sass" scoped>
@use '../../ui/sass/theme/primary' as *
page, uni-page-body
	background: $pri-pag-bg
</style>