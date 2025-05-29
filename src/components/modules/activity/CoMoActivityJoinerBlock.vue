<template>
    
    <view class="w-100">
        <view class="fx-c w-100">
            <view class="br-cir ps-r">
                <view class="w-3em h-3em br-cir bd-x1 bc-sex-girl-deep">
                    <CkAvatar :src="v.avatar" clazz="w-100 h-100" :not_mainpage="true"/>
                </view>
                <view class="abs-r b-0">
                    <view class="fs-t w-1em h-1em bg-con fx-c">
                        <view class="fs-t">
                            <CkSex :sex="v.sex"/>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="ta-c pb-s pt-n eiies w-100">
            <view class="tis fs-s eiies w-100">
                {{ v.name }}
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

const prp = defineProps<{
    v: ONE
}>()
</script>