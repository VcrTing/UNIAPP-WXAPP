<template>
    <view>
        <view>
            <view class="pb-col pt-x2">
                <text class="sus">发布者</text>
            </view>
            <view class="fx-i pt-col fx-t">
                <view>
                    <CkAvatar :clazz="'w-3em h-3em'" :src="publisher.avatar"/>
                </view>
                <view class="fx-1 pi-x1">
                    <view class="pt-s h7">
                        {{ publisher.name }}&nbsp;
                    </view>
                    <view class="fx-s pt-s">
                        <OButtonDef :weak="true" clazz="px-t br-s fs-n">
                            <CkAgeSex :sex="publisher.sex" :age="publisher.age"/>
                        </OButtonDef>
                    </view>
                    <view class="pt-col">
                        <OButtonDef :weak="true" clazz="px-s br-s mr">平台认证</OButtonDef>
                        <OButtonDef :weak="true" clazz="px-s br-s mr">优秀发布者</OButtonDef>
                        <OButtonDef :weak="true" clazz="px-s br-s">10单10成</OButtonDef>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButtonDef from '@/cake/button/OButtonDef.vue';
import OButtonIht from '@/cake/button/OButtonIht.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkAgeSex from '@/cake/visual/ider/CkAgeSex.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';
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