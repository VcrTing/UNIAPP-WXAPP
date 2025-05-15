<template>
    <view>
        <view v-for="(v, i) in aii.items" :key="i"
            class="br pb-x1"
        >
            <view class="bg-con index-item-card br-x1 px-col py">
                <!-- TOP -->
                <view class="fx-s fx-t">
                    <view class="h8">
                        <CkAvatar :clazz="'w-4em h-4em'" :src="v.publisher.avatar"/>
                    </view>
                    <view class="fx-1 pi">
                        <view class="fx-s fx-t">
                            <view class="fx-i">
                                <view class="pt-s">
                                    <view class="pb-s">{{ v.publisher.name }}</view>
                                    <view class="fx-i fs-n">
                                        <view class="pr-s" v-for="(m, n) in v.publisher.usely" :k="n">
                                            {{ m.txt }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view >
                                <view v-if="is_publisher"></view>
                                <OButton v-else @tap="funn.detail(v)" :clazz="'fs-n br px-n py-t'" :weak="true">参加</OButton>
                            </view>
                        </view>

                        <!-- CON -->
                        <view class="pt-col pb-s">
                            <view>
                                {{ v.description }}
                            </view>
                            <view class="pt">
                                <view class="w-618 h-7em">
                                    <image mode="aspectFill" class="uni-img w-100 h-100 uni-img-br-n"
                                        :src="v.banner"/>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { acyReFresh, authGetters } from '@/memory/global';
import mock_orders from '@/server/mock/order/mock_orders';
import uniRouter from '@/tool/uni/uni-router';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()

const aii = reactive({
    items: mock_orders.items
})

const funn = {
    detail: (v: ONE) => {
        acyReFresh('view', v);
        uniRouter.gopg('activity_detail');
    }
}


const is_publisher = computed(() => authGetters.is_publisher)
</script>

<style lang="sass">
.index-item-card
    box-shadow: 0em 0.2em 1.4em 0em rgba(0, 0, 0, 0.06)
</style>