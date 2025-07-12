<template>
    <view class="pt-row">
        <view class="fx-c bf-s">
            
            <CoMoUserNumberShow :num="must_int(data.numPublish)"  clazz="px-row py-row br-br px-x1">
                发布数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numVisited)"  clazz="px-row py-row br-bi br-br px-x1">
                访问量
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numFansTotal)"  clazz="px-row py-row br-bi br-br px-x1">
                粉丝数
            </CoMoUserNumberShow>
        </view>
        <view class="py-s mh-3em px-row bf-s bf-wht-s">
            <OScrollX>
                <view class="fx-c pt-col">
                    <view class="d-ib">
                        <text>社交账号:&nbsp;&nbsp;</text>
                        <text v-if="u.socialAccount">{{ u.socialAccount }}</text>
                        <text v-else>这个用户还没有社交账号。</text>
                    </view>
                </view>
            </OScrollX>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';
import { must_arr, must_int, must_one } from '@/tool/util/valued';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';

const prp = defineProps<{
    data: UserMainPage
}>()

const u = computed((): User => must_one(prp.data.user))

// const is_publisher = computed(() => authGetters.is_publisher)

</script>

                    <!--
                    <view class="d-ib" v-for="(v, i) in tags" :key="i">
                        <OButton color="wht" :weak="true" clazz="px-s br-t fs-n mr">{{ v.name }}</OButton>
                    </view>
                    -->
<!--
            <CoMoUserNumberShow :num="must_int(data.numJoin)"  clazz="px-row py-row br px-x1">
                参与数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numPublish)"  clazz="px-row py-row br px-x1">
                发布数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numMemberTotal)"  clazz="px-row py-row br px-x1">
                会员数
            </CoMoUserNumberShow>
            -->