<template>
    <view>
        <view class="py" v-if="ioading">
            加载中...
        </view>

        <view v-for="(v, i) in menus" :key="i">
            <CoIndexMenuItemHeader :v="v"/>

            <view v-if="v.children && v.children.length > 0">
                <view v-for="(j, k) in v.children" :key="k">
                    <CoIndexMenuItem :v="j" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ulDispatch, ulState } from '@/memory/global';

const menus = computed((): LayoutMenuItem[] => ulState.menus)
const ioading = computed(() => ulState.ioading)
</script>