<template>
    <view class="py">
        <view class="w-100">

            <view class="o-slide-bar rnd bg-con">
                <view class="fx-s o-slide-bar-inner">
                    <view 
                        v-for="(v, i) in me.items" :key="i"
                        @tap="v.func()"
                        class="o-slide-item">
                        <o-div>
                            <view class="mw-5em mh-3em fx-c ani-scaie-aii">
                                <ui-i class="h5" :i="v.icon"/>
                            </view>
                        </o-div>
                    </view>
                </view>
                
                <view class="o-slide-hui">
                    
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';

const emt = defineEmits([ 'search' ])

const prp = defineProps<{
    schema: ReportSchema
}>()

const me = reactive({
    items: [
        {
            tit: '页面操作',
            icon: 'f-i',
            func: () => {
                
            }
        },
        {
            tit: '过滤器',
            icon: 'filter',
            func: () => {
                console.log('打开过滤器')
                pan_tooi.open_def_b(10, {
                    opacity: 0.35
                })
            }
        },
        {
            tit: '查询',
            icon: 'search',
            func: () => {
                emt('search')
            }
        },
        {
            tit: '滑行',
            icon: 'slide',
            func: () => {
                
            }
        }
    ]
})
</script>