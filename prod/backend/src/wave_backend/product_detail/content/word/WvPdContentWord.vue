<template>
    <view>
        <view class="px-row" v-for="(n, m) in func.content(content)" :key="m">
            <view class="px-col py">{{ n }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import content_tool from '@/tool/modules/common/content_tool';

const prp = defineProps<{
    content: ProductContent,
    v: Product
}>()

const func = {
    content: (v: ProductContent): string[] => {
        return content_tool.split_end(v.content)
    }
}

</script>