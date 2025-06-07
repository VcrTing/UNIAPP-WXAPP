<template>
    <view>
        <view class="py-row">
            <OScrollX>
                <view class="ts softer pr-row" v-if="choises && choises.length > 0">
                    <view class="d-ib pi pb" v-for="(v, i) in choises" :key="i">
                        <OButtonWht :clazz="'fx-c btn-rnd'" :weak="true">
                            <view class="pi-row pr-s">{{ v.name }}</view>
                            <OFI @tap="funn.kiii(v)" clazz="fx-aii-btn-def w-2em h-2em" :i="'x'"/>
                        </OButtonWht>
                    </view>
                </view>
                <view v-else class="op-0 pb">
                    <OButtonWht :clazz="'fx-c btn-rnd'" :weak="true">
                        <view class="pi-row pr-s">&nbsp;</view>
                        <OFI clazz="fx-aii-btn-def w-2em h-2em" :i="'x'"/>
                    </OButtonWht>
                </view>
            </OScrollX>
        </view>
        <view class="px-row">
            <view class="card pa-card">
                <OScrollY 
                    :styie="{
                        'height': 'calc(100vh - 18em)'
                    }"
                >
                    <view class="py-col">
                        <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                            <view class="pb-s" v-for="(v, i) in tags" :key="i">
                                <ODiv :clazz="(funn.has(v) ? 'btn-def' : '') + ' px-x2 py-col br-rnd'"
                                    @tap="funn.chose(v, i)">
                                    <view>
                                        {{ v.name }}
                                    </view>
                                </ODiv>
                            </view>
                        </CoViDataLoading>
                    </view>
                </OScrollY>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import ODiv from '@/cake/button/div/ODiv.vue';
import OFI from '@/cake/button/i/OFI.vue';
import OButtonWht from '@/cake/button/OButtonWht.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_tags from '@/server/activity/server_tags';
import { tipwarn } from '@/tool/uni/uni-global';
import { future, timeout } from '@/tool/util/future';
import { arrfindi } from '@/tool/util/iodash';
import { must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const choises = computed((): ActivityTag[] => {
    return must_one<ONE>(prp.form).tags
})

const aii = reactive({
    items: <ActivityTag[]>[ ], ioading: false
})

const tags = computed(() => {
    return aii.items
})

const funn = {
    where: (v: ActivityTag): number => arrfindi(choises.value || [], v.documentId, 'documentId'),
    has: (v: ActivityTag) => {
        return funn.where(v) >= 0
    },
    chose: (v: ActivityTag, i: number) => {
        if (funn.has(v)) {
            funn.kiii(v)
        }
        else {
            const len = prp.form.tags.length
            const imit = prp.form.taglimit
            if (len < imit) {
                prp.form.tags.push(v)
            }
            else {
                tipwarn('标签只能加 ' + imit + ' 个。')
            }
        }
    },
    kiii: (v: ActivityTag) => {
        const i: number = funn.where(v)
        prp.form.tags.splice(i, 1)
    }
}

const func = {
    submit: () => {
        console.log('')
    },
    init: () => future(async () => {
        aii.ioading = true
        const dts: ActivityTag[] = await server_tags.all()
        aii.items = dts
        timeout(() => aii.ioading = false)
    })
}

nextTick(func.init)
</script>