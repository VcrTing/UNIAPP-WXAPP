<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <UserDetailLayout :h="68" :clazz_con="'bg-pag-pri br-tr br-ti'">
            <template #bg>
                <view class="h-100" v-if="user">
                    <CoImg :src="user.background || info.userDefBackground" clazz="h-100"/>
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
            </template>
        </UserDetailLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import UserDetailLayout from '@/components/layout/detail/UserDetailLayout.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { appState, authDispatch, authState, uiState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import VwUmpNumberMsg from '@/view/user/mainpage/cont/VwUmpNumberMsg.vue';
import VwUserMainPageCon from '@/view/user/mainpage/VwUserMainPageCon.vue';
import VwUserMainPageTop from '@/view/user/mainpage/VwUserMainPageTop.vue';
import { computed, nextTick, reactive } from 'vue';

// const prp = defineProps<{}>()
const user = computed((): User | undefined => {
    const ump: UserMainPage = usermainpage.value
    const user: User = ump.user
    if (user && user.id) { return user } 
    else { return undefined }
})

const usermainpage = computed((): UserMainPage => {
    const srcs: UserMainPage = must_one<UserMainPage>(authState.mainpage_of_view)
    return srcs
}) 

const info = computed((): AppInfo => appState.info) 

const funn = {
    init: () => promise(() => {
        const u: User | undefined = user.value
        console.log('获取到的主页 =', u)
        if (u && u.documentId) {

        }
        else {
            authDispatch('clean_someone_mainpag')
            appRouter.index()
        }
    }),
    love: () => {

    },
    back: () => {
        uniRouter.back()
    }
}

nextTick(funn.init)
</script>

                <!--
                <CoBomCenterBtn @go="funn.love" :clazz="'mh-btn btn-wht-s'">
                    <view class="fx-c">
                        <UiI i="love"/>
                        <text>加入收藏夹</text>
                    </view>
                </CoBomCenterBtn>
                -->