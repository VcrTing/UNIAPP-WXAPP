<template>
    <view class="py-row">
        <view class="fx-c">
            <CoMoUserNumberShow :num="must_int(data.numJoin)"  clazz="px-row py-row br px-x1">
                参与数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numPublish)"  clazz="px-row py-row br px-x1">
                发布数
            </CoMoUserNumberShow>
            <CoMoUserNumberShow :num="must_int(data.numMemberTotal)"  clazz="px-row py-row br px-x1">
                会员数
            </CoMoUserNumberShow>
        </view>
        <view class="pt-x2 px-row">
            <OScrollX>
                <view class="fx-c pt-col">
                    <view class="d-ib" v-for="(v, i) in tags" :key="i">
                        <OButton color="def" :weak="true" clazz="px-s br-t fs-n mr">{{ v.name }}</OButton>
                    </view>
                </view>
            </OScrollX>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoMoUserNumberShow from '@/components/modules/user/CoMoUserNumberShow.vue';
import { arrimit } from '@/tool/util/iodash';
import { must_arr, must_int } from '@/tool/util/valued';
import OButton from '@/cake/button/OButton.vue';
import { pageIndexState } from '@/memory/page';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';

const prp = defineProps<{
    data: UserMainPage
}>()

const tags = computed((): Tag[] => {
    let src: Tag[] = must_arr(prp.data.tags)
    src = src.length <= 0 ? pageIndexState.indextags : src
    return arrimit(src, 5)
})
// const is_publisher = computed(() => authGetters.is_publisher)

</script>