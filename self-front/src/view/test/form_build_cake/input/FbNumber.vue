<template>
    <view>
        <view v-if="!option.hideLabel" class="pb-t">{{ fb_get_name(one) }}</view>
        <input 
            class="uni-input o-input o-input-def" 
            type="number" 
            maxLength="249"
            @input="input"
            placeholder="请输入"/>
    </view>
</template>

<script setup lang="ts">
import { fb_get_name, fb_get_option } from '@/test/form_build/form_build';
import { uni_get_input_v } from '@/tool/uni/uni';

const prp = defineProps<{ one: ONE, config: ONE }>()

const aii = reactive({
    // clear_icon: false
})

const option = computed(() => fb_get_option(prp.one))

const input = (e: ONE) => {
    let v: SN = uni_get_input_v(e)
    // 输入 123 隐藏输入框
    if (v === '123') {
        uni.hideKeyboard();
    }
}
</script>