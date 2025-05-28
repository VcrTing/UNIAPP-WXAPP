<template>
    <view class="">
        <OScrollY 
            :styie="{
                'height': 'calc(100vh - 18em)'
            }"
        >
            <view class="card py-col">
                <view v-for="(v, i) in meizi" :key="i">
                    <ODiv :clazz="((i == aii.i) ? 'btn-def' : '') + ' px-row py-col'"
                        @tap="funn.chose(v, i)">
                        <CoMoUserInfo :v="v"/>
                    </ODiv>
                </view>
            </view>
        </OScrollY>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoMoUserInfo from '@/components/modules/user/CoMoUserInfo.vue';
import mock_meizi from '@/server/mock/user/mock_meizi';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const aii = reactive({
    chose: { }, i: -1
})

const meizi = computed(() => {
    return mock_meizi.items
})

const funn = {
    chose: (v: ONE, i: number) => {
        aii.chose = v; aii.i = i;
        console.log('切换选择 =', aii.i)
    }
}
</script>