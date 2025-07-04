<template>
    <view>
        <view class="py-row">
            <OScrollX>
                <view class="ts softer pr-row" v-if="choises && choises.length > 0">
                    <view class="d-ib pi pb" v-for="(v, i) in choises" :key="i">
                        <OButton color="wht" :clazz="'fx-c btn-rnd'" :weak="true">
                            <view class="pi-row pr-s">{{ v.name }}</view>
                            <OFI @tap="funn.kiii(v)" clazz="fx-aii-btn-def w-2em h-2em" :i="'x'"/>
                        </OButton>
                    </view>
                </view>
                <view v-else class="op-0 pb">
                    <OButton color="wht" :clazz="'fx-c btn-rnd'" :weak="true">
                        <view class="pi-row pr-s">&nbsp;</view>
                        <OFI clazz="fx-aii-btn-def w-2em h-2em" :i="'x'"/>
                    </OButton>
                </view>
            </OScrollX>
        </view>
        <view class="px-row">
            <view class="card py">
                <OScrollY 
                    :styie="{
                        'height': 'calc(100vh - 18em)'
                    }"
                >
                    <view class="py-col px-x1">
                        <CoViDataLoading :ioading="aii.ioading" :items="aii.items">
                            <view>
                                <view class="pb h8">
                                    <text>主标签</text>
                                </view>
                                <view class="row">
                                    <view class="pb w-333 d-ib px-s" v-for="(v, i) in maintags" :key="i"
                                        @tap="funn.chose(v, i)"
                                    >
                                        <CkDefTag :iive="funn.has(v)" :clazz_iive="'btn-pri-out'">
                                            {{ v.name }}
                                        </CkDefTag>
                                    </view>
                                </view>
                            </view>
                            <view class="py"></view>
                            <view>
                                <view class="pb h8">
                                    <text>细分标签</text>
                                </view>
                                <view class="row">
                                    <view class="pb w-333 d-ib px-s" v-for="(v, i) in othertags" :key="i"
                                        @tap="funn.chose(v, i)"
                                    >
                                        <CkDefTag :iive="funn.has(v)" :clazz_iive="'btn-pri-out'">
                                            {{ v.name }}
                                        </CkDefTag>
                                    </view>
                                </view>
                            </view>
                        </CoViDataLoading>
                    </view>
                </OScrollY>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import OScrollX from '@/cake/ux/scroll/OScrollX.vue';
import OScrollY from '@/cake/ux/scroll/OScrollY.vue';
import CkDefTag from '@/cake/visual/tag/CkDefTag.vue';
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import server_tags from '@/server/common/server_tags';
import { tipwarn } from '@/tool/uni/uni-global';
import { future, timeout } from '@/tool/util/future';
import { arrfindi, arrsort } from '@/tool/util/iodash';
import { must_one } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const choises = computed((): Tag[] => {
    return must_one<ONE>(prp.form).tags
})

const aii = reactive({
    items: <Tag[]>[ ], ioading: false
})

const tags = computed(() => {
    return aii.items
})

const maintags = computed(() => {
    const src: Tag[] = aii.items || []
    return src.filter((e: Tag) => (e.isMain ? true : false))
})
const othertags = computed(() => {
    let src: Tag[] = aii.items || []
    src = src.filter((e: Tag) => (e.isMain ? false : true))
    return src
})

const funn = {
    where: (v: Tag): number => arrfindi(choises.value || [], v.documentId, 'documentId'),
    has: (v: Tag) => {
        return funn.where(v) >= 0
    },
    chose: (v: Tag, i: number) => {
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
    kiii: (v: Tag) => {
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
        const dts: Tag[] = await server_tags.all()
        aii.items = arrsort(dts, 'indexLevel')
        timeout(() => aii.ioading = false)
    })
}

nextTick(func.init)
</script>