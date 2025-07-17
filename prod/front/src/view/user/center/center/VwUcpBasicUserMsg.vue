<template>
    <view class=" bf-s">
        <view class="">
            <view class="fx-s mxw-pc">
                <CoMoUcpNumbers />
                <OButton color="wht-t" @click="funn.edit" :weak="true" :clazz="'py px br-s'">
                    <view class="tid">编辑个人资料</view>
                </OButton>
            </view>
        </view>
        <view class="pt">
            <view class="pt mxw-pc">
                <view class="pi-row py fx-i">
                    <view v-if="user.city" class="d-ib">
                        <OButton color="wht" :weak="true" clazz="br-t ani-scaie-aii tid">
                            <UiI clazz="fs-s" i="addr"/>
                            <text>&nbsp;</text>
                            <text class="fs-s pr-t">{{ user.city || '未知城市' }}</text>
                        </OButton>
                    </view>
                    <view v-if="user.city" class="d-ib px-n"></view>
                    <OButton color="wht-s" :weak="true" clazz="br-t ani-scaie-aii tid px-t">
                        <CkSex :sex="user.gender" />
                        <text>&nbsp;</text>
                        <text class="fs-n">{{ user_tool.getgender(user) }}</text>
                    </OButton>
                    <view class="d-ib px-n"></view>
                    <OButton color="wht-s" :weak="true" clazz="br-t ani-scaie-aii tid px-t">
                        <text>{{ user.age || 18 }}</text>
                        <text>&nbsp;</text>
                        <text class="fs-n">岁</text>
                    </OButton>
                    <view class="d-ib px-n"></view>
                </view>
            </view>
            <view class="pt">
                <view class="tid fs-n px-row py-row mxw-pc"
                    :class="isphone ? 'bf-wht-t bf' : ''"
                >
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
import { authState, uiGetters } from '@/memory/global';
import { computed, reactive } from 'vue';
import uniRouter from '@/tool/uni/uni-router';
import CoMoUcpNumbers from '../component/CoMoUcpNumbers.vue';
import appRouter from '@/tool/uni/app-router';
import { future, futuring, promise } from '@/tool/util/future';
import CkSex from '@/cake/visual/ider/CkSex.vue';
import user_tool from '@/tool/modules/user_tool';
import OButton from '@/cake/button/OButton.vue';
import UiI from '@/ui/element/i/UiI.vue';
import auth_tool from '@/tool/modules/common/auth_tool';

const user = computed((): User => authState.user)

const isphone = computed((): boolean => uiGetters.isphone)

const aii = reactive({
    ioading: false
})

const funn = {
    managerTags: () => {
        appRouter.manager_tags()
    },
    edit: () => auth_tool.doacing(aii, async () => {
        // await authDispatch('refresh_info')
        uniRouter.gopg('user_info')
    })
}
</script>