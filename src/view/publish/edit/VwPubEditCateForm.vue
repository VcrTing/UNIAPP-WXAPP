<template>
    <view>
        <view class="bg-con pi-inp">
            <CkInpItem :tit="'开始时间'" :clazz_tit="'tid'">
                <OInput :clazz_input="'ta-r'" :def="form.timed" @result="(v) => form.timed = v" :pchd="'活动开始时间'"/>
            </CkInpItem>
            <CkInpItem :tit="'碰面地点'" :clazz_tit="'tid'">
                <OInput :clazz_input="'ta-r'" :def="form.address" @result="(v) => form.address = v" :pchd="'活动碰面地点，可选择常用地址'"/>
            </CkInpItem>
            <CkInpItem :tit="'报名费用'" :clazz_tit="'tid'">
                <OInput :clazz_input="'ta-r'" :def="form.price" @result="(v) => form.price = v" :pchd="'每位参与者支付的报名费用'"/>
            </CkInpItem>
            <CkInpItem :tit="'活动类型'">
                <view class="fx-r mh-inp pr-inp">
                    <OButton :color="form.typed == 0 ? 'def' : 'wht'" 
                        clazz="fs-s py-t br-rnd px" :weak="true">大众活动</OButton>
                    <view class="px-s"></view>
                    <OButton :color="form.typed == 1 ? 'def' : 'wht'" 
                        clazz="fs-s py-t br-rnd px" :weak="true">非公开活动</OButton>
                </view>
            </CkInpItem>
            <!--
            <CkInpItem :tit="'私密活动'" :clazz_tit="'tid'">
                <view class="fx-r py pr-inp">
				    <switch class="o-switch" checked @change="funn.switchSelf" />
                </view>
            </CkInpItem>
            -->
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const form = reactive({
    address: '', timed: '', price: '', typed: 0,
})
const funn = {
    switchSelf: () => {

    }
}
</script>