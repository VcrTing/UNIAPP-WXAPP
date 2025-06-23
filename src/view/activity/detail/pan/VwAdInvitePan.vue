<template>
    <OPan :idx="idx">
        <OPanInnerY :idx="idx" :orientation="'b'">
            A
        </OPanInnerY>
    </OPan>
</template>

<script setup lang="ts">
import OPan from '@/cake/pan/OPan.vue';
import OPanInnerY from '@/cake/pan/OPanInnerY.vue';
import { futuring } from '@/tool/util/future';
import { reactive } from 'vue';

const prp = defineProps<{
    idx: number
}>()

const aii = reactive({
    users: <User[]>[ ], ioading: false
})

const funn = {
    fetching: () => futuring(aii, async () => {

    }),
    init: () => {
        funn.fetching()
    }
}
</script>