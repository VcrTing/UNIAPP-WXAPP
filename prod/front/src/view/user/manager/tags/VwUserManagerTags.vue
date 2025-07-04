<template>
    <view>
        <view class="px-row">
            <view class="pt" v-for="(v, i) in aii.tags" :key="i">
                <ODiv clazz="bd bg-con w-100 fx-i br-s">
                    <view class="px-row">
                        {{ i + 1 }}.
                    </view>
                    <view class="pi-row fx-1">
                        {{ v.tit }}
                    </view>
                    <view class="px-row py tid"  @tap="funn.edit(v)">
                        <UiI :i="'edit'"/>
                    </view>
                </ODiv>
            </view>
            
            <view class="py-s"></view>
            <view class="py-row">
                <view class="bd-s-d btn-wht br ts bd-x2"
                    @tap="funn.add"
                >
                    <view class="px-row py-s fx-c">
                        <UiI :i="'+'"/>&nbsp;新增
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import mock_tags from '@/server/mock/publish/mock_tags';
import UiI from '@/ui/element/i/UiI.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()

const aii = reactive(<ONE>{
    tags: mock_tags.tags
})

const funn = {
    edit: (v: any) => {

    },
    add: () => {
        
    }
}
</script>