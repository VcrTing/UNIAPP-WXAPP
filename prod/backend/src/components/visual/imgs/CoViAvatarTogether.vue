<template>
    <view class="fx-i">
        <view class="co-vi-avatar" :class="'co-vi-avatar-' + i" v-for="(v, i) in data" :key="i"
            :style="funn.generate_style(i)"
        >
            <image class="mxw-12em uni-img br-cir" 
                :style="style_avatar"
                mode="aspectFill"
                :src="v.avatarUrl"/>
        </view>
    </view>
</template>

<style lang="sass">

</style>

<script setup lang="ts">
import { arrimit } from '@/tool/util/iodash';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    items: User[],
    limit?: number,
    w?: number,
    clazz_avatar?: string
}>()

const w = computed(() => (prp.w || 1))

const style_avatar = computed(() => {
    const __w = w.value
    return {
        'width': __w + 'em',
        'height': __w + 'em'
    }
})

const data = computed((): User[] => {
    return arrimit(prp.items, prp.limit || 3)
})

const aii = reactive({
    num: 0
})

const funn = {
    generate_style: (i: number) => {
        if (i == 0) return { }
        let v = w.value / 1.6
        // v = v * i
        return {
            'margin-left': '-' + v + 'em'
        }
    }
}

</script>