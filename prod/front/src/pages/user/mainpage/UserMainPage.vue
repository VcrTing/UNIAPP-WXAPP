<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <UserDetailLayout :user="user" :info="info" :h="68" :clazz_con="'br-tr br-ti'">
            <template #top>
                <CoAppTopBackBar :mat="true" @back="uniRouter.back" :clazz_i="'c-fff'"></CoAppTopBackBar>
                <VwUserMainPageTop v-if="user" :user="user"/>
            </template>
            <template #con>
                <VwUmpNumberMsg class="br-it br-rt" :data="usermainpage"/>
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
import { appState, soDispatch, soState, uiState } from '@/memory/global';
import appRouter from '@/tool/uni/app-router';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import VwUmpNumberMsg from '@/view/user/mainpage/cont/VwUmpNumberMsg.vue';
import VwUserMainPageCon from '@/view/user/mainpage/VwUserMainPageCon.vue';
import VwUserMainPageTop from '@/view/user/mainpage/VwUserMainPageTop.vue';
import { computed, nextTick } from 'vue';

const user = computed((): User => {
    const ump: UserMainPage = usermainpage.value
    console.log('用于预览的 user main page =', ump)
    const user: User = ump.user
    if (user && user.id) { return user } 
    else { return <User>{ } }
})
const usermainpage = computed((): UserMainPage => { return must_one<UserMainPage>(soState.mainpage_of_view) }) 
const info = computed((): AppInfo => appState.info) 
const funn = {
    init: () => promise(() => {
        const u: User = user.value
        // console.log('获取到的主页 =', u)
        if (u && u.documentId) {

        }
        else {
            soDispatch('clean_someone_mainpag')
            appRouter.index()
        }
    })
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>

                <!--
                <CoBomCenterBtn @go="funn.love" :clazz="'mh-btn btn-wht-s'">
                    <view class="fx-c">
                        <UiI i="love"/>
                        <text>加入收藏夹</text>
                    </view>
                </CoBomCenterBtn>
                -->