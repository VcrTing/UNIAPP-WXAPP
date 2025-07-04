<template>
    <view>
        <CoMoActivityMoneyItem :item="assistant">
            <view @tap="funn.change">
                <OFI class="px-row py br-cir" :i="'b'"/>
            </view>
        </CoMoActivityMoneyItem>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import CoMoActivityMoneyItem from '@/components/modules/activity/CoMoActivityMoneyItem.vue';
import { must_one } from '@/tool/util/valued';
import { computed } from 'vue';

const prp = defineProps<{
    item: ONE
}>()

const one = computed(() => must_one<ONE>(prp.item).one || { })
const msg = computed(() => must_one<ONE>(prp.item).msg || { })
const assistant = computed(() => must_one<ONE>(prp.item).assistant || { })

const funn = {
    change: () => {

    }
}
</script>