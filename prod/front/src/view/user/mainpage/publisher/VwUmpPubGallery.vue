<template>
    <view class="">
        <CoViDataLoading :ioading="aii.ioading" :items="aii.medias" @refresh="funn.freshWorking">
            <view v-if="img_first && aii.init">
                <view class="d-ib o-h softer" v-for="(v, i) in img_first" :key="i"
                    :class="w_clazz + ' ' + h_clazz"
                >
                    <CoImg :clazz="'h-100'" :src="v.urlSmall || v.url"/>
                </view>
            </view>
            <view v-if="img_last && aii.init_last">
                <view class="d-ib o-h softer" v-for="(v, i) in img_last" :key="i"
                    :class="w_clazz + ' ' + h_clazz"
                >
                    <CoImg :clazz="'h-100'" :src="v.urlSmall || v.url"/>
                </view>
            </view>
        </CoViDataLoading> 
        <view v-if="aii.ioading"><CkSpace :h="12"/> </view>
    </view>
</template>
 
<script setup lang="ts">
import CkSpace from '@/cake/content/CkSpace.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { uiGetters } from '@/memory/global';
import server_medias from '@/server/media/server_medias';
import net_tool from '@/tool/http/net_tool';
import media_tool from '@/tool/modules/common/media_tool';
import { future, futuring, timeout } from '@/tool/util/future';
import { must_arr, must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';
//
const prp = defineProps<{
    data: UserMainPage
}>()
const user = computed((): User => must_one(prp.data.user))
const __IMIT = 12
//
const img_first = computed((): Media[] => {
    const src: Media[] = must_arr(aii.medias)
    return media_tool.view_imit(src, 0, __IMIT)
})
const img_last = computed((): Media[] => {
    const src: Media[] = must_arr(aii.medias)
    return media_tool.view_imit(src, __IMIT, src.length)
})
const aii = reactive({ ioading: false, init: false, init_last: false, medias: <Media[]>[ ], pager: net_tool.__pager(24) })
//
const funn = {
    freshWorking: () => futuring(aii, async () => {
        const dts: Media[] = await server_medias.mainpage(user.value.id, aii.pager)
        console.log('搜索个人相册 =', dts)
        aii.medias = dts
    }),
    init: () => {
        funn.freshWorking()
        timeout(() => { aii.init = true }, 200)
        timeout(() => { aii.init_last = true }, 800)
    }
}
//
const isphone = computed((): boolean => uiGetters.isphone)
const ispc = computed((): boolean => uiGetters.ispc)
const w_clazz = computed((): string => {
    if (isphone.value) return 'w-333 '
    if (ispc.value) return 'w-20 d-ib '
    return 'w-25 d-ib '
})
const h_clazz = computed((): string => {
    if (isphone.value) return 'h-14vh '
    if (ispc.value) return 'h-30vh '
    return 'h-17vh '
})
//
nextTick(funn.init)
</script>