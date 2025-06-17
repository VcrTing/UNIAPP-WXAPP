<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'bg-pag-pri'" @back="uniRouter.back" :mat="true">
            返回
            <template #tit><view class="header ta-c">修改个人资料</view></template>
        </CoAppTopBackBar>
        <view>
            <UserBaseInfoForm :form="form"/>
            <view class="pt-row"></view>
            <UserUsllyForm :form="form"/>
        </view>
        <!--
        <CoAppBomCarBar>
            <view class="px-row pt-s">
                <CoBomBtnGroup @submit="funn.submit" @cancle="uniRouter.back"></CoBomBtnGroup>
            </view>
        </CoAppBomCarBar>-->
        <CoBomBackBtn :clazz="'btn-wht-s'" @tap="uniRouter.back"/>
    </PageLayout>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { authState, orderDispatch, orderState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { future, promise } from '@/tool/util/future';
import { formfii, formfiimit } from '@/tool/util/valued';
import UserBaseInfoForm from '@/view/user/info/UserBaseInfoForm.vue';
import UserUsllyForm from '@/view/user/info/UserUsllyForm.vue';
import { computed, nextTick, reactive, ref } from 'vue';

const top = ref()
const addr = ref()
const money = ref()

const form = reactive({
    nickName: '', introduction: '', socialAccount: '', age: 18,
    avatarUrl: '', __avatarUrl: { },
    background: '', __background: { },
})

const user = computed((): User => authState.user)

const funn = {
    submit: () => {
        
        // uniRouter.navigatorpg('publish')
    },
    init: () => promise(() => {
        formfii(form, user.value)
    })
}

nextTick(funn.init)
</script>

<style lang="sass">
@use '../../../ui/sass/theme/primary/__conf' as *
page, uni-page-body
	background: $pri-pag-bg
</style>