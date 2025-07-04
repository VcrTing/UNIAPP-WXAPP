<template>
    <view class="ui-dropdown" :class="_class">
        <view class="ui-dropdown-sign" @tap="funn.open">
            <slot name="sign"></slot>
        </view>
        <view class="ui-dropdown-con">
            <view class="ui-dropdown-con-inner">
                <slot name="con"></slot>
            </view>
        </view>
    </view>
</template>
    
<script lang="ts" setup>
const num = ref<number>(0)
const _class = ref<string>(' ')

const funn = {
    close: () => {
        console.log("外部调用的了关闭");
        num.value += 1
    },
    open: () => {
        console.log('调用了打开');
        _class.value = ' '
    }
}
defineExpose(funn)
watch(num, () => {
    console.log('准备隐藏 drop down');
    _class.value = 'ui-dropdown-die'
})
</script>