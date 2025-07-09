<template>
    <page-meta :root-font-size="uiState.root_font_size_coefficient + 'px'" style="display: block;"/>
    <PageLayout>
        <CoAppTopBackBar :clazz="'btn-wht-s'" @back="uniRouter.back" :mat="false">
            返回
            <template #tit><view class="header ta-c">修改个人资料</view></template>
        </CoAppTopBackBar>
        <view>
            <UserBaseInfoForm :form="form" @submit="funn.submit"/>
            <view class="pt-row"></view>
            <!--
            <UserUsllyForm :form="form"/>-->
            <view class="py px-row">
                <OButton clazz="btn-app" color="wht">提交</OButton>
            </view>
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
import OButton from '@/cake/button/OButton.vue';
import CoAppTopBackBar from '@/components/app/bar/top/CoAppTopBackBar.vue';
import CoBomBackBtn from '@/components/element/button/CoBomBackBtn.vue';
import PageLayout from '@/components/layout/page/PageLayout.vue';
import { authDispatch, authState, uiState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { future, futuring, promise } from '@/tool/util/future';
import { formfii, formfiimit } from '@/tool/util/valued';
import UserBaseInfoForm from '@/view/user/info/UserBaseInfoForm.vue';
import { computed, nextTick, reactive, ref } from 'vue';

const form = reactive({
    nickName: '', introduction: '', socialAccount: '', age: 18,
    avatarUrl: '', __avatarUrl: { },
    background: '', __background: { },
})
const aii = reactive({ iaoding: false })
const user = computed((): User => authState.user)

const funn = {
    buildform: () => {
        return {
            nickName: form.nickName, introduction: form.introduction,
            socialAccount: form.socialAccount, age: form.age
        }
    },
    submit: () => futuring(aii, async () => {
        const f = funn.buildform()
        if (f) {
            await authDispatch('change_info', f)
        }
    }),
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