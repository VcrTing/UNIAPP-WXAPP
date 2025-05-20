<template>
    <view>
        <view class="fx-c">
            <view class="ta-c">
                <CkAvatar :not_mainpage="true"
                    :src="user.avatar" clazz="w-6em h-6em"
                    />
                <view class="pt">
                    <view class="h5 c-fff fw-800 ls">
                        <text class="pr-s">&nbsp;</text>
                        <text>{{ user.username }}</text>
                        <text class="pi-s">♀</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';

const prp = defineProps<{
    user: ONE
}>()

</script>