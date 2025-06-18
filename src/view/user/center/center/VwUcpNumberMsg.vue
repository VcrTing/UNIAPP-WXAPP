<template>
    <view class="">
        <view class="fx-s bg-con-fer bf pr-row">
            <CoMoUcpNumbers />
            <OButtonDef @click="funn.edit" :weak="true" :clazz="'py px br-s'">
                <view>编辑个人资料</view>
            </OButtonDef>
        </view>
        <view class="pt">
            <view class="pt">
                <view class="pi-row py">
                    <OButtonDef :weak="true" clazz="br-t ani-scaie-aii">
                        <CkSex :sex="user.gender" />
                        <text class="fs-n pi-s">{{ user_tool.getgender(user) }}</text>
                    </OButtonDef>
                    <view class="d-ib px-n"></view>
                    <OButtonDef :weak="true" clazz="br-t ani-scaie-aii">
                        <text>{{ user.age }}</text>
                        <text class="fs-n pi-s">岁</text>
                    </OButtonDef>
                </view>
                <view class="tid fs-n fx-aii-btn-def px-row py">
                    <view class="d-ib">
                        <text>社交账号:&nbsp;&nbsp;</text>
                        <text v-if="user.socialAccount">{{ user.socialAccount }}</text>
                        <text v-else>这个用户还没有社交账号。</text>
                    </view>
                    <!--
                    <view class="d-ib">
                        <text v-if="user.introduction">{{ user.introduction }}</text>
                        <text v-else>这个用户还没有个人简介。</text>
                    </view>
                    -->
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
import CkSex from '@/cake/visual/ider/CkSex.vue';
import user_tool from '@/tool/modules/user_tool';

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