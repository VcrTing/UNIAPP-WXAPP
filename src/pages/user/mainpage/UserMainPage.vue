<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <UserDetailLayout :h="68" :clazz_con="'bg-pag-pri br-tr br-ti'">
            <template #bg>
                <view class="h-100" v-if="user">
                    <CoImg :src="user.background" clazz="h-100"/>
                </view>
            </template>
            <template #top>
                <CoAppTopBackBar :mat="true" @back="funn.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
                <VwUserMainPageTop v-if="user" :user="user"/>
            </template>
            <template #con>
                <VwUmpNumberMsg class="bg-con br-it br-rt" :data="usermainpage"/>
                <VwUserMainPageCon v-if="user" :user="user" :data="usermainpage"/>
            </template>
            <template #bom>
                <CoBomBackBtn :clazz="'btn-wht-s'" @tap="uniRouter.back"/>
                <!--
                <CoBomCenterBtn @go="funn.love" :clazz="'mh-btn btn-wht-s'">
                    <view class="fx-c">
                        <UiI i="love"/>
                        <text>加入收藏夹</text>
                    </view>
                </CoBomCenterBtn>
                -->
            </template>
        </UserDetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import CoBomCenterBtn from '@/components/element/button/CoBomCenterBtn.vue';
import DetailLayout from '@/components/layout/detail/DetailLayout.vue';
import UserCenterLayout from '@/components/layout/detail/UserCenterLayout.vue';
import UserDetailLayout from '@/components/layout/detail/UserDetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { acyState, authGetters, authState, orderReFresh, uiState } from '@/memory/global';
import mock_user from '@/server/mock/user/mock_user';
import uniRouter from '@/tool/uni/uni-router';
import { must_arr, must_one } from '@/tool/util/valued';
import UiI from '@/ui/element/i/UiI.vue';
import VwUmpNumberMsg from '@/view/user/mainpage/cont/VwUmpNumberMsg.vue';
import VwUserMainPageCon from '@/view/user/mainpage/VwUserMainPageCon.vue';
import VwUserMainPageTop from '@/view/user/mainpage/VwUserMainPageTop.vue';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const user = computed((): User | undefined => {
    const ump: UserMainPage = usermainpage.value
    const user: User = ump.user
    if (user && user.id) { return user } 
    else { uniRouter.back() }
})

const usermainpage = computed((): UserMainPage => {
    const srcs: UserMainPage = must_one<UserMainPage>(authState.mainpage_of_view)
    return srcs
}) 

const aii = reactive({
    price_pan_idx: 11, hui: <ElePanHui>{ opacity: 0.4 }
})

const funn = {
    init: () => {

    },
    love: () => {

    },
    back: () => {
        uniRouter.back()
    }
}
</script>