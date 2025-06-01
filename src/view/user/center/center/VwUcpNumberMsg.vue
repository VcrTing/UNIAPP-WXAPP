<template>
    <view class="">
        <view class="fx-s bg-con-fer bf pr-row">
            <CoMoUcpNumbers />
            <OButtonDef @click="funn.edit" :weak="true" :clazz="'py px br-s'"><view>编辑个人资料</view></OButtonDef>
        </view>
        <view class="pt-x2 pi-row">
            <view class="fx-i">
                <OButtonDef :weak="true" clazz="br-t">
                    <CkAgeSex :age="18" :sex="0" />
                </OButtonDef>
                <view class="pi-x2 tid fs-n">
                    还有个人简介。
                </view>
            </view>
            <view class="fx-i pt-col" @tap="funn.managerTags">
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">黑丝</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">JK</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">丝袜诱惑</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">Lolita</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">少萝</OButtonDef>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import { authGetters, authState } from '@/memory/global';
import { computed } from 'vue';
import uniRouter from '@/tool/uni/uni-router';
import CoMoUcpNumbers from '../component/CoMoUcpNumbers.vue';
import { storage } from '@/tool/web/storage';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import appRouter from '@/tool/uni/app-router';

const funn = {
    managerTags: () => {
        appRouter.manager_tags()
    },
    edit: () => {
        uniRouter.gopg('user_info')
    }
}
</script>