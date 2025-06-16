<template>
    <view class="">
        <view class="fx-s bg-con-fer bf pr-row">
            <CoMoUcpNumbers />
            <OButtonDef @click="funn.edit" :weak="true" :clazz="'py px br-s'">
                <view>编辑个人资料</view>
            </OButtonDef>
        </view>
        <view class="pt-x2 pi-row">
            <view class="">
                <OButtonDef :weak="true" clazz="br-t">
                    <CkAgeSex :age="user.age" :sex="user.gender" />
                </OButtonDef>
                <view class="pt tid fs-n">
                    <text v-if="user.introduction">{{ user.introduction }}</text>
                    <text v-else>还有个人简介。</text>
                </view>
            </view>
            <!--
            <view class="fx-i pt-col" @tap="funn.managerTags">
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">黑丝</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">JK</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">丝袜诱惑</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">Lolita</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">少萝</OButtonDef>
            </view>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import { authDispatch, authGetters, authState } from '@/memory/global';
import { computed, reactive } from 'vue';
import uniRouter from '@/tool/uni/uni-router';
import CoMoUcpNumbers from '../component/CoMoUcpNumbers.vue';
import { storage } from '@/tool/web/storage';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import appRouter from '@/tool/uni/app-router';
import { future, futuring, promise } from '@/tool/util/future';
import { open_of_net } from '@/server/__func/open_of_net';

const user = computed((): User => authState.user)

const aii = reactive({
    ioading: false
})

const funn = {
    managerTags: () => {
        appRouter.manager_tags()
    },
    edit: () => futuring(aii, async () => {
        await authDispatch('refresh_info')
        uniRouter.gopg('user_info')
    })
}
</script>