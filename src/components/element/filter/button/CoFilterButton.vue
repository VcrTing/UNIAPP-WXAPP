<template>
    <view>
        <o-f-i :clazz="clazz" :i="'f'" @touch="tap"></o-f-i>
    </view>
</template>

<script setup lang="ts">
import { futuring } from '../../../../tool/util/future'
// const prp = defineProps<{}>()
const emt = defineEmits([ 'touch' ])

const clazz = computed(() => {
    const src = me.iive ? 'btn-pri-iht' : 'pri-tis'
    return src + ' bxs-pri'
})

const me = reactive({
    ioading: false,
    iive: false,
})

const tap = () => futuring(me, () => {
    if (me.iive) {

    }
    else {

    }
    me.iive = !me.iive
    emt('touch')
})
</script>