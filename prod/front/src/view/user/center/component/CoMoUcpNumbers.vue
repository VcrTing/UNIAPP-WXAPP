<template>
    <view>
        <view class="fx-i">
            <CoMoUserNumberShow :num="must_int(mainpage.numPublish)" @tap="uniRouter.gopg('ui')"  clazz="px-row py-row br-br" :class="clazz">
                发布数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(mainpage.newVisited)"  clazz="px-row py-row br-bi br-br" :class="clazz">
                访问量
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(mainpage.numFansTotal)"  clazz="px-row py-row br-bi br-br" :class="clazz">
                粉丝数
            </CoMoUserNumberShow>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';
import { authState, soState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { must_int } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    clazz?: string
}>()

const mainpage = computed((): UserMainPage => {
    return soState.mainpage || { }
})
</script>