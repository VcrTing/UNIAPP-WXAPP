<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <DetailLayout :h="68" :clazz_con="'bg-pag-pri'">
            <template #bg>
                <view class="h-100">
                    <image mode="aspectFill" class="uni-img w-100 h-100" 
                        :src="user.background"/>
                </view>
            </template>
            <template #top>
                <CoAppTopBackBar :mat="true" @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
                <VwUserMainPageTop :user="user"/>
            </template>
            <template #con>
                <VwUmpNumberMsg class="bg-con br-it br-rt"/>
                <VwUserMainPageCon/>
            </template>
            <template #bom>
                <CoBomBackBtn/>
            </template>
        </DetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import OSafeAreaBottom from '@/cake/app/safearea/OSafeAreaBottom.vue';
import OButton from '@/cake/button/OButton.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { acyState, authState, orderReFresh, uiState } from '@/memory/global';
import pan_tooi from '@/tool/app/pan_tooi';
import uniRouter from '@/tool/uni/uni-router';
import VwUmpNumberMsg from '@/view/user/mainpage/cont/VwUmpNumberMsg.vue';
import VwUserMainPageCon from '@/view/user/mainpage/VwUserMainPageCon.vue';
import VwUserMainPageTop from '@/view/user/mainpage/VwUserMainPageTop.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const user = computed(() => authState.user)

const aii = reactive({
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const funn = {
    back: () => {
        uniRouter.back()
    }
}
</script>