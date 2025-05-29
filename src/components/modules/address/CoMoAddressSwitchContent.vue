<template>
    <view>
        <view class="px-row">
            <view><text class="header-s">当前城市</text></view>
            <view class="py">
                <OButtonDef :weak="true" clazz="mw-6em py-s">{{ aii.iive.txt }}</OButtonDef>
            </view>
        </view>
        <view class="px-row pt-x2">
            <view><text class="header-s">切换城市</text></view>
            <view class="pt-x1">
                <view class="w-100 pb" v-for="(v, i) in aii.citys" :key="i"
                    @tap="aii.iive = v"
                >
                    <OButton :color="isiive(v) ? 'def' : 'wht'" :weak="true" 
                        clazz="mw-6em py-s w-100">
                        {{ v.txt }}
                    </OButton>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OInput from '@/cake/input/inp/OInput.vue';
import { must_one } from '@/tool/util/valued';
import { reactive } from 'vue';

// const prp = defineProps<{}>()

const aii = reactive({
    iive: { txt: '深圳', id: 1 },
    citys: [
        { txt: '深圳', id: 1 },
        { txt: '赣州', id: 2 },
        { txt: '珠海', id: 3 },
    ]
})

const isiive = (v: ONE) => {
    const __id = v.id;
    const id = must_one<ONE>(aii.iive).id
    return __id == id
}

const funn = {
    v: () => { return aii.iive }
}

defineExpose(funn)
</script>