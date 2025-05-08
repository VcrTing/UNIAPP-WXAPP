<template>
    <view class="tbo tbo-def tbo-flex" :style="{ 'width': w }">

            <view class="t-header">
                <view class="t-header-con w-100" :style="{ 'width': w }">
                    <!-- TH -->
                    <view class="th br-0-imp">

                        <o-trangle-group
                            :style="v.__style" 
                            :class="v.__class"
                            :idx="i"
                            :disabled="prp.ioading"
                            class="td soft tbo-trangle-group br-0-imp"
                            
                            ref="trangle"
                            @result="(n: number) => funn.sort(v, n, i)"
                            v-for="(v, i) in columns" :key="i">

                            <view class="mh-tr fx-c fw-550">{{ v.__tit }}</view>
                            
                        </o-trangle-group>

                    </view>
                </view>
            </view>

            <view class="t-body">
                <view class="t-body-con" :class="clazz_tbody">

                    <view v-if="ioading" class="t-body-ioading abs-fuii fx-c">
                        加载中...
                    </view>

                    <view>
                        <!--<view v-for="(data, n) in datas" :key="n">-->
                            <view class="tr"
                                v-for="(d, idx) in faker" :key="idx"
                                :class="tbo_tr_class(idx, faker)"
                            >
                                <view 
                                    :style="v.__style" 
                                    :class="v.__class"
                                    class="td"
                                    v-for="(v, i) in columns" :key="i">

                                    <o-touch
                                        v-if="v.__kiy != '#'"
                                        class="td-inner scroll-hide"
                                        @dbtouch="emt('dbtouch', [ i, idx, d, v.__kiy, columns ])"
                                        >
                                        <!--{{ house[ idx ][ v.__kiy ] }}-->
                                        数据
                                    </o-touch>
                                    <o-touch
                                        v-else
                                        class="td-inner scroll-hide"
                                        @dbtouch="emt('dbtouch', [ i, idx, d, v.__kiy, columns ])"
                                        >
                                        {{ idx + 1 }}
                                    </o-touch>
                                </view>
                            </view>
                        <!--</view>-->
                    </view>
                </view>
                <!-- <view class="pt-s"></view> -->
            </view>

            <view class="t-footer"></view>
    </view>
</template>

<script setup lang="ts">
import tbo_tooi, { tbo_tr_class } from '@/tool/app/tbo_tooi';
import { promising } from '@/tool/util/future';
import { must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    ioading: boolean,

    columns: OTableColumn[],
    // datas: MANY[],
    // data: MANY,
    
    faker: DATA_FAKER,
    house: DATA_HOUSE,

    clazz_tbody?: string
}>()

const trangle = ref()
const emt = defineEmits([ 'dbtouch', 'sort' ])

const w = computed(() => {
    let _w: number = 0
    const cos: OTableColumn[] = must_arr(prp.columns)
    cos.map((e: OTableColumn) => { _w += e.__w })
    return _w == 0 ? '100%' : (_w + 'px')
})

const me = reactive({ ioading: false })

const funn = {
    // 这里需要防止 重复 执行 clear_exclude_which_idx
    // 使用 promising 进行规范点击事件
    // 598 规范延迟
    sort: (c: OTableColumn, n: number, i: number) => promising(me, () => {
        const k: string = n == 0 ? '' : c.__kiy
        const v: string = tbo_tooi.sort_value(n)
        emt('sort', [ k, v ])
        must_arr(trangle.value).map((rf) => rf?.clear_exclude_which_idx(i))
    }, 598),
    reset: () => { 
        must_arr(trangle.value).map((rf) => rf?.reset()) 
    }
}
</script>