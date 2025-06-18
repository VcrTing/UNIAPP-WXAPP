<template>
    <view>
        <view class="w-333 d-ib" v-for="(v, i) in gallery" :key="i">
            <view class="w-100 h-14vh" @tap="funn.view(v)">
                <CoImg clazz="h-100" :src="v.urlSmall"/>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoImg from '@/components/media/img/CoImg.vue';
import { must_arr } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    medias: ActivityMedia[]
}>()

const gallery = computed(() => {
    const src: ActivityMedia[] = must_arr(prp.medias)
    return src
})

const funn = {
    view: (v: ONE) => {
        const many = gallery.value
    }
}
</script>