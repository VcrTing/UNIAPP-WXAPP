<template>
    <view>
        <OPan :idx="idx">
            <OPanInnerY :idx="idx" :orientation="'b'">
                <view>
                    <view class="h7 py px-inp"><text>内容</text></view>
                    <view class="py">
                        <textarea class="inp-app fx-aii-btn-def py-s" v-model="edit.content" placeholder="请输入内容，可以以句号隔开每个内容。"/>
                    </view>
                </view>
                <CkSpace :h="3" />
                <view class="py">
                    <view class="px-row">
                        <view><OButton @tap="emt('cancle')" color="def" clazz="btn-app">关闭</OButton> </view>
                        <view class="py-n"></view>
                        <view><OButton :ioading="ioading" @tap="emt('submit', edit)" color="pri" clazz="btn-app">
                            提交修改
                        </OButton> </view>
                    </view>
                </view>
            </OPanInnerY>
        </OPan>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkSpace from '@/cake/content/CkSpace.vue';
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';

const prp = defineProps<{
    edit: ProductContent, idx: number,
    ioading: boolean
}>()

const emt = defineEmits([ 'submit', 'cancle' ])

</script>