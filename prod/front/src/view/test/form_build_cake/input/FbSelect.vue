<template>
    <view>
        <view v-if="!option.hideLabel" class="pb-t">{{ fb_get_name(one) }}</view>
        <picker class="" @change="change" :value="aii.index" :range="array">
            <view class="uni-input o-input o-input-def fx-i">{{array[aii.index]}}</view>
        </picker>
    </view>
</template>

<script setup lang="ts">
import { fb_get_name, fb_get_option, fb_get_options } from '@/test/form_build/form_build';
import { uni_get_select_v } from '@/tool/uni/uni';

const prp = defineProps<{ one: ONE, config: ONE }>()

const array = ref<SNNS>(fb_get_options(prp.one)) // computed((): SNNS => fb_get_options(prp.one))

const aii = reactive(<ONE>{
    index: 0,
})

const option = computed(() => fb_get_option(prp.one))
const change = (e: ONE) => {
    console.log("执行了 select = ", e)
    let v: number = uni_get_select_v(e)
    aii.index = v
}
</script>