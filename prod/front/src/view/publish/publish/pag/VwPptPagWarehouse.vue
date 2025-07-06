<template>
    <view>
        <view class="">
            <view class="fx-i softer">
                <view class="btn-def py px-row ts c-p" v-for="(v, i) in tabs" :key="i"
                    @tap="aii.i = v.v"
                ><text :class="(aii.i == v.v) ? '' : 'sus'">{{ v.name }}</text></view>
            </view>
        </view>
        <view class="px-row py-s">
            <!-- 待完善 -->
            <view v-if="aii.i == DATA_PRODUCT_REVIEW_DEF.v">
                <CoViDataLoading :ioading="ioading" :items="data">
                    <view class="pb-row softer" v-for="(v, i) in data" :key="i">
                        <CoMoPublishItem :v="v" @tap="funn.edit(v)">
                            <view class="fx-r tis fs-s btn-err px-t" v-if="product_tool.is_review_no(v)">
                                <text class="pi-s">
                                    审核不通过
                                </text>
                            </view>
                            <view class="fx-r tis fs-s btn-err px-t" v-else>
                                <text class="pi-s">
                                    待完善
                                </text>
                            </view>
                        </CoMoPublishItem>
                    </view>
                </CoViDataLoading>
            </view>
            <view v-else-if="aii.i == DATA_PRODUCT_REVIEW_CHECKING.v">
                <CoViDataLoading :ioading="ioading" :items="data">
                    <view class="pb-row softer" v-for="(v, i) in data" :key="i">
                        <CoMoPublishItem :v="v" @tap="funn.edit(v)">
                            <view class="fx-r tis fs-s btn-err px-t">
                                <text class="pi-s">
                                    审核中，预计30分钟
                                </text>
                            </view>
                        </CoMoPublishItem>
                    </view>
                </CoViDataLoading>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoViDataLoading from '@/components/visual/ioading/CoViDataLoading.vue';
import { DATA_PRODUCT_REVIEW, DATA_PRODUCT_REVIEW_CHECKING, DATA_PRODUCT_REVIEW_DEF } from '@/conf/conf-datas';
import { pagePublishDispatch } from '@/memory/page';
import product_tool from '@/tool/modules/product_tool';
import uniRouter from '@/tool/uni/uni-router';
import { promise } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';
import CoMoPublishItem from '@/wave/publish/component/CoMoPublishItem.vue';
import { computed, reactive } from 'vue';
//
const prp = defineProps<{ items: Product[], ioading: boolean }>()
//
const aii = reactive({ i: DATA_PRODUCT_REVIEW_DEF.v })
// 待完善
const data = computed((): Product[] => func.filter(aii.i))
//
const func = {
    filter: (v: number) => {
        let src = must_arr(prp.items)
        /*
        console.log('src =', src, ' v =', v, STS_PRODUCT.REVIEW.NO)
        if (v === STS_PRODUCT.REVIEW.NO) {
            return src.filter(e => {
                const cd: number = e[ STS_PRODUCT.REVIEW.K ]
                return cd === STS_PRODUCT.REVIEW.NO
            })
        }
        else {
            src = src.filter(e => {
                const cd: number = e[ STS_PRODUCT.REVIEW.K ]
                return cd !== STS_PRODUCT.REVIEW.NO
            })
        }
        */

        return src.filter(e => {
            const cd: number = e['dataStatus'];
            if (cd == v) { return true }
            return false
        })
    }
}
//
const funn = {
    edit: async (v: ONE) => {
        await pagePublishDispatch('change', [ 'edit', v ])
        uniRouter.gopg('publish_edit')
    },
    init: () => promise(() => {
        aii.i = DATA_PRODUCT_REVIEW_DEF.v
    })
}
//
const tabs = DATA_PRODUCT_REVIEW
</script>