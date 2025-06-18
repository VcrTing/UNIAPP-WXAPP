<template>
    <view>
        <view class="fx-c">
            <view class="ta-c">
                <CkAvatar :not_mainpage="true"
                    :src="user.avatarUrl" clazz="w-6em h-6em"
                    />
                <view class="pt">
                    <view class="h5 c-fff fw-800 ls">
                        <text class="pr-s">&nbsp;</text>
                        <text>{{ user.nickName }}</text>
                        <view class="d-ib pi-s">
                            <CkSex :sex="user.gender" :bg="true"/>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import CkSex from '@/cake/visual/ider/CkSex.vue';

const prp = defineProps<{
    user: User
}>()

</script>