<template>
    <view class="pr-row">
        <view class="fx-s">
            <CoVwUcpNumbers :is_publisher="is_publisher"/>
            <OButtonDef @click="funn.edit" :weak="true" :clazz="'py px-row br-s'"><view>编辑个人资料</view></OButtonDef>
        </view>
        <view class="pt-x2 pi-row">
            <view class="fx-i pt-col" @tap="funn.managerTags">
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">黑丝</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">JK</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">丝袜诱惑</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">Lolita</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">内射</OButtonDef>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import { authGetters, authState } from '@/memory/global';
import { computed } from 'vue';
import uniRouter from '@/tool/uni/uni-router';
import CoVwUcpNumbers from '../component/CoVwUcpNumbers.vue';

// const prp = defineProps<{}>()
const is_publisher = computed(() => authGetters.is_publisher)

const funn = {
    managerTags: () => {
        uniRouter.gopg('manager_tags')
    },
    edit: () => {
        uniRouter.gopg('user_info')
    }
}
</script>