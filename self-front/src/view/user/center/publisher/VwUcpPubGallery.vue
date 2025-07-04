<template>
    <view>
        <view class="w-333 h-14vh d-ib" v-for="(v, i) in gallery" :key="i">
            <view class="w-100 h-100" @tap="funn.view(v)">
                <image class="w-100 h-100" mode="aspectFill" :src="v.small.src"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import mock_user from '@/server/mock/user/mock_user';
import { computed } from 'vue';

// const prp = defineProps<{}>()
const gallery = computed(() => {
    return mock_user.gallery
})

const funn = {
    view: (v: ONE) => {
        const many = gallery.value
        
    }
}
</script>