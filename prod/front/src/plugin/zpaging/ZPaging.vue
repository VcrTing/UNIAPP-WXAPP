<template>
    <z-pagin ref="paging" v-model="aii.data" @query="queryList">

        <template v-slot:empty>
            <view class="py px fx-s">
                空数据
            </view>
        </template>

        <view>
            <slot>
                这里是数据
            </slot>
        </view>
    </z-pagin>
</template>

<script setup lang="ts">
const prp = defineProps<{
    aii: MANY
}>()

const paging = ref()
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
const queryList = (pageNo, pageSize) => {
    console.log('下拉刷新')
    /*
    // 此处请求仅为演示，请替换为自己项目中的请求
    request.queryList({ pageNo,pageSize }).then(res => {
        // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
        paging.value.complete(res.data.list);
    }).catch(res => {
        // 如果请求失败写paging.value.complete(false);
        // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
        // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
        paging.value.complete(false);
    })
    */
}
</script>