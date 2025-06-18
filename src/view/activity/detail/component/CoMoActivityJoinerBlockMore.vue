<template>
    <view @tap="gojoiner" :class="clazz">
        <view class="fx-c">
            <view class="br-cir ps-r">
                <view class="w-3em h-3em br-cir">
                    <CkAvatar :src="user.avatarUrl" clazz="w-100 h-100"/>
                </view>
                <view class="abs-r b-0 w-3em h-3em br-cir">
                    <view class="w-100 h-100 bg-028 br-cir fx-c">
                        <UiI clazz="c-fff" :i="'more'"/>
                    </view>
                </view>
            </view>
        </view>
        <view class="ta-c pb-s pt-n eiies w-100">
            <view class="tis fs-s eiies w-100">
                &nbsp;
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import UiI from '@/ui/element/i/UiI.vue';

const prp = defineProps<{
    user: User | ONE,
    clazz?: string
}>()

const gojoiner = () => {

}

</script>