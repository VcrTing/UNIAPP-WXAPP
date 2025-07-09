<template>
    <view>
        <view class="py">
            <view class="px-inp">
                <view class="br btn-pri px-row py">
                    <view class="fx-c">
                        <OButton @tap="func.add">
                            <view class="fx-c">
                                <OFI i="+" clazz="h4 br-cir"/>
                                <view class="ta-i pi-s">
                                    <view>新增内容</view>
                                    <view class="fs-t">
                                        付费内容，用户购买后才可见。
                                    </view>
                                </view>
                            </view>
                        </OButton>
                    </view>
                </view>
            </view>
            <view class="">
                <view v-for="(v ,i) in contents" class="pt">
                    <view v-if="content_tool.is_medias(v)">
                        <view>
                        </view>
                    </view>
                    <view v-else class="bg-con">
                        <view class="fx-s fx-t">
                            <view class="px-row sus py">#{{ i + 1 }}</view>
                            <view class="fs-n fx-1 py-n" @tap="func.edit_open(v)">
                                <view v-if="v.content">
                                    <view v-for="(m, n) in content_tool.split_end(v.content)" :key="n">
                                        <text>{{ m }}</text>
                                    </view>
                                </view>
                                <view v-else class="fx-i">
                                    没有内容。（点击进行修改）
                                </view>
                            </view>
                            <view class="px-row py-s">
                                <OButtonTag @tap="func.deleted_open(v)" color="err" clazz="w-2em h-2em fx-c br-cir">
                                    <OFI clazz="fs-s" i="trash" />
                                </OButtonTag>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <WvPubContentWord :idx="edt.idx" :edit="aii.edit" :ioading="aii.ioading" 
            @submit="func.edit"/>
        <CoCoConfirm :idx="cfm.idx" :ioading="aii.ioading"
            @submit="func.deleted" @cancle="pan_tooi.close_pan(cfm.idx)"/>
    </view>
</template>

<script setup lang="ts">
import OFI from '@/cake/button/i/OFI.vue';
import OButton from '@/cake/button/OButton.vue';
import OButtonTag from '@/cake/button/OButtonTag.vue';
import CoCoConfirm from '@/components/common/CoCoConfirm.vue';
import server_content from '@/server/product/server_content';
import pan_tooi from '@/tool/app/pan_tooi';
import content_tool from '@/tool/modules/common/content_tool';
import { futuring, promise } from '@/tool/util/future';
import { is_nice_arr } from '@/tool/util/valued';
import { computed, nextTick, reactive } from 'vue';
import WvPubContentWord from './word/WvPubContentWord.vue';

const prp = defineProps<{ v: Product, canedit: boolean }>()

const aii = reactive({
    ioading: false, edit: <ProductContent>{ },
    content: <ProductContent[]>[ ],
    form: <ProductContent[]>[ ]
})

const contents = computed((): ProductContent[] => {
    const src: ProductContent[] = [ ...aii.content, ...aii.form ]
    return src
})

const func = {
    add: () => futuring(aii, async () => {
        const src: ProductContent = content_tool.build_content_words()
        const res: ProductContent = await server_content.plus_or_edit(prp.v, src, src.content)
        console.log('新建了内容 =', res)
        if (res && res.documentId) {
            funn.__fetching()
        }
    }),
    deleted: () => futuring(aii, async () => {
        const v: ProductContent = aii.edit
        if (v && v.documentId) {
            const res: ProductContent = await server_content.deleted(v)
            if (res && res.documentId) {
                funn.__fetching()
                pan_tooi.close_pan(cfm.idx)
            }
        }
    }),
    deleted_open: (v: ProductContent) => {
        aii.edit = v
        pan_tooi.open_def_b(cfm.idx, cfm.hui)
    },
    edit_open: (v: ProductContent) => {
        aii.edit = v 
        pan_tooi.open_def_b(edt.idx, edt.hui)
    },
    edit: (v: ProductContent) => futuring(aii, async () => {
        console.log('修改内容 v =', v)
        if (v && v.documentId) {
            const res: ProductContent = await server_content.plus_or_edit(prp.v, v, v.content)
            if (res && res.documentId) {
                funn.__fetching()
                pan_tooi.close_pan(edt.idx)
            }
        }
    })
}

const funn = {
    __fetching: async () => {
        const src: ProductContent[] = await server_content.by_product(prp.v)
        if (is_nice_arr(src)) {
            aii.content = src;
        }
    },
    fetching: () => futuring(aii, async () => {
        await funn.__fetching()
    }),
    init: () => promise(() => {
        funn.fetching()
    })
}

nextTick(funn.init)

const edt = { idx: 7, hui: <ElePanHui>{ opacity: 0.4 } }
const cfm = { idx: 1, hui: <ElePanHui>{ opacity: 0.4 } }
</script>