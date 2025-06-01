<template>
    <OScrollX>
        <view class="pi-row ">
            <view class="d-ib pr" v-for="(v, i) in menus" :key="i"
                @click="funn.chose(v)"
                >
                <view class="ts py-s h6 fx-c fw-500"
                    :class="funn.checkIive(v) ? v.clazz_iive : v.clazz_die">
                    <view>
                        {{ v.name }}
                    </view>
                </view>
            </view>
        </view>
    </OScrollX>
</template>

<script setup lang="ts">
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import { acyState } from '@/memory/global';
import { must_arr } from '@/tool/util/valued';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()

const def = { name: '推荐', id: 0 }

const aii = reactive({
    active: 0
})

const funn = {
    chose: (one: ONE) => {
        aii.active = one.id
    },
    checkIive: (one: ONE) => {
        const v = one.id
        return aii.active === v
    },
}

const tags = computed(() => acyState.indextags)

const menus = computed(() => {
    const ms = [ def, ...must_arr(tags.value) ]
    return ms.map(e => {
        e['clazz_die'] = 'px-n tid'
        e['clazz_iive'] = 'px-x1 btn-pri-iht br-x3'
        return e
    })
})
</script>