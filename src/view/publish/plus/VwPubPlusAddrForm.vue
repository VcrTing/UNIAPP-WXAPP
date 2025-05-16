<template>
    <view class="">
        <view class="card pa-card">
            <CkInpItem class="pt" :tit="'人数'">
                <OInput :def="aii.form.minute" @result="(v) => aii.form.minute = v" :pchd="'请选择可参加人数'"/>
            </CkInpItem>
            <CkInpItem :tit="'时间'">
                <OInput :def="aii.form.timed" @result="(v) => aii.form.timed = v" :pchd="'开始时间'"/>
            </CkInpItem>
            <CkInpItem :tit="'地址'">
                <OInput :def="aii.form.address" @result="(v) => aii.form.address = v" :pchd="'活动碰面地点，可选择常用地址'"/>
            </CkInpItem>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import OTextarea from '@/cake/input/textarea/OTextarea.vue';
import { reactive } from 'vue';
import OFile from '@/cake/input/file/OFile.vue';
import UiI from '@/ui/element/i/UiI.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';

// const prp = defineProps<{}>()

const aii = reactive({
    form: {
        minute: '', timed: '', address: ''
    }
})

const funn = {

}

defineExpose(funn)
</script>