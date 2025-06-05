<template>
	<page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
		<CoAppTopBar :clazz="'bg-con pb'" :mat="true">
			<view class="pi-row py-s">
                <view class="h4 bb">活动</view>
			</view>
		</CoAppTopBar>

        <view class="">
            <VwPublishTabPag :route="route" ref="page"/>

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
import { DATA_ACTIVITY_TYPED_GK } from '@/conf/conf-datas';
import { uiState } from '@/memory/global';
import { pagePublishState } from '@/memory/page';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { must_arr, must_int } from '@/tool/util/valued';
import { storage } from '@/tool/web/storage';
import VwPublishTabPag from '@/view/publish/publish/VwPublishTabPag.vue';
import VwPublishTop from '@/view/publish/publish/VwPublishTop.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
// const prp = defineProps<{}>()

const route = reactive(<PUBLISH_PAGE_ROUTE>{
    pag: 0, tab: DATA_ACTIVITY_TYPED_GK.v
})

const page = ref()

const refresh = computed(() => pagePublishState.num)
watch(() => refresh.value, () => { funn.initTab() })

const funn = {
    initTab: () => promise(() => {
        const cd: string = storage.get('PAGE_PUBLISH_TAB_CODE') || '0_0'
        console.log('主动切换 页面 =', cd)
        // if (cd != '0_0') {
            const cs: string[] = cd.split('_')
            route.pag = must_int(cs[0])
            route.tab = must_int(cs[1])
            page.value.swicthTab(route.pag);
            storage.remove('PAGE_PUBLISH_TAB_CODE')
        // }
    }),
    plus: () => {
        uniRouter.gopg('publish_plus')
    }
}

onMounted(funn.initTab)
/*
const def_tab_code = computed((): number => {
    return storage.get('PAGE_PUBLISH_TAB_CODE') || 0
})

watch(() => def_tab_code.value, (n) => {
    console.log('code 变了 =', n)
    if (pag.value) {
        pag.value.swicthTab(n)
    }
})
*/
</script>

<style lang="sass">
@use '../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

            <!--
            <view class="bg-con">
                <VwPublishTop class="px-row"/>
            </view>
            -->
