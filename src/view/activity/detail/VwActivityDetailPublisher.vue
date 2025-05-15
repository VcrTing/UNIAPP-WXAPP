<template>
    <view>
        <view>
            <view class="fx-i pt-col fx-t">
                <view>
                    <CkAvatar :clazz="'w-3em h-3em'" :src="publisher.avatar"/>
                </view>
                <view class="fx-1 pi-row">
                    <view class="pt-s h7">
                        {{ publisher.name }}
                        <view class="d-ib">♀</view>
                    </view>
                    <view class="fx-s">
                        <view class="pt-t">
                            {{ publisher.age || 18 }} 岁
                        </view>
                    </view>
                    <view class="pt-col">
                        <view>
                            <view class="d-ib pr pb" v-for="(v, i) in tags" :key="i">
                                <view class="btn bg-hui-x1 br-s px-s tit">{{ v.txt }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    one?: ONE
}>()

const tags = computed((): MANY => {
    return must_one<ONE>(prp.one).tags || [ ]
})
const publisher = computed((): ONE => {
    return must_one<ONE>(prp.one).publisher || { }
})
</script>