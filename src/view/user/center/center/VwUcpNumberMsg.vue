<template>
    <view class="px-row">
        <view class="fx-s">
            <view v-if="is_publisher" class="fx-i">
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    成单数
                </CoVwUcpNumberItem>
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    粉丝数
                </CoVwUcpNumberItem>
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    账户金额
                </CoVwUcpNumberItem>
            </view>
            <view v-else class="fx-i">
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    订单数
                </CoVwUcpNumberItem>
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    妹子数
                </CoVwUcpNumberItem>
                <CoVwUcpNumberItem :num="0" class="pr-x2">
                    付出金额
                </CoVwUcpNumberItem>
            </view>
            <OButtonDef @click="funn.edit" :weak="true" :clazz="'py px-row br-s'"><view>编辑个人资料</view></OButtonDef>
        </view>
        <view class="pt-x2">
            <view class="fx-i pt-col" @tap="funn.managerTags">
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">黑丝</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">JK</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">丝袜诱惑</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">Lolita</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">内射</OButtonDef>
                <OButtonDef :weak="true" clazz="px-s br-t fs-n mr">爬山运动</OButtonDef>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import { authGetters, authState } from '@/memory/global';
import { computed } from 'vue';
import CoVwUcpNumberItem from '../component/CoVwUcpNumberItem.vue';
import uniRouter from '@/tool/uni/uni-router';

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