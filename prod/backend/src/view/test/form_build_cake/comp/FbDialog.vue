<template>
    <view>
        <view class="o-mod"
                :class="{ 'o-mod-hide': aii.hui_hide, 'o-mod-show': !aii.hui_hide }">

            <view class="o-mod-con"
                :class="{ 'o-mod-con-hide': aii.con_hide, 'o-mod-con-show': !aii.con_hide }"
            >
                <view class="o-mod-con-inner">
                    <view class="o-mod-pan">
                        <view class="fs-2em pb-x2 px-x">
                            {{ option.title }}
                        </view>
                        <slot></slot>
                        <view class="pt-s">
                            <button @tap="func.close" type="primary">确认</button>
                        </view>
                    </view>
                    <view class="fx-c py">
                        <button @tap="func.close" type="default">关闭</button>
                    </view>
                </view>
            </view>
            
            <view class="o-mod-hui"
                :class="{ 'o-mod-hui-hide': aii.hui_hide, 'o-mod-hui-show': !aii.hui_hide }"
            ></view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { fb_get_option } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()
// console.log("DIALOG =", prp.one)

const aii = reactive({
    con_hide: false,
    hui_hide: false
})

const option = computed((): ONE => fb_get_option(prp.one))

const func = {
    open: () => {
        aii.hui_hide = false
        aii.con_hide = false
    },
    close: () => {
        aii.con_hide = true 
        aii.hui_hide = true
    }
}

</script>