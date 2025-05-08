<template>
    <view>
        <o-scroll-x>
            <!-- TABS -->
            <view class="">
                <view v-for="(v, i) in schemas" :key="i">
                    <view class="d-ib" @tap="tab(i)">
                        <o-div :clazz="_clazz(v)">
                            <view class="px-x1 py">
                                {{ v.tableName }}
                            </view>
                        </o-div>
                    </view>
                </view>
            </view>
        </o-scroll-x>
    </view>
</template>

<script setup lang="ts">
import { must_arr } from '@/tool/util/valued';

const prp = defineProps<{
    schemas: ReportSchema[]
}>()

const len = computed(() => must_arr(prp.schemas).length)

const _clazz = (v: ReportSchema): string => {
    let sf: string = ' '
    if (len.value == 1) {
        sf += ' br-tr '
    } 
    else {

    }
    return (v.__tab_iive ? 'btn-pri-iht btn ' : 'btn') + sf
}

const tab = (i: number) => {
    must_arr(prp.schemas).map((e: ReportSchema, _i: number) => {
        if (i == _i) {
            e.__tab_iive = true 
        } 
        else {
            e.__tab_iive = false
        }
    })

}
</script>