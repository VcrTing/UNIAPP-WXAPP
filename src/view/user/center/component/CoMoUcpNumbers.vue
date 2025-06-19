<template>
    <view>
        <view class="fx-i">
            <CoMoUserNumberShow :num="must_int(mainpage.numJoin)" @tap="uniRouter.gopg('ui')"  clazz="px-row py-row br-br" :class="clazz">
                参与数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(mainpage.numPublish)"  clazz="px-row py-row br-bi br-br" :class="clazz">
                发布数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(mainpage.numMemberTotal)"  clazz="px-row py-row br-bi br-br" :class="clazz">
                会员数
            </CoMoUserNumberShow>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';
import { authState } from '@/memory/global';
import uniRouter from '@/tool/uni/uni-router';
import { must_int } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    clazz?: string
}>()

const mainpage = computed(() => {
    return authState.mainpage || { }
})
</script>