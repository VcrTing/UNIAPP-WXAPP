<template>
    <view>
        <view v-if="!option.hideLabel" class="pb-s">{{ fb_get_name(one) }}</view>
        <view>
			<switch :checked="aii.v" @change="change" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { fb_get_name, fb_get_option } from '@/test/form_build/form_build';
import { uni_get_switch_v } from '@/tool/uni/uni';

const prp = defineProps<{ one: ONE, config: ONE }>()

const aii = reactive({
    v: false
    // clear_icon: false
})

const option = computed(() => fb_get_option(prp.one))
const change = (e: ONE) => {
    let v: boolean = uni_get_switch_v(e)
    // 输入 123 隐藏输入框
    console.log("执行了 switch = ", v)
    aii.v = v
}
</script>