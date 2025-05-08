<template>
    <view class="py">
        <view>
            <!--
            <view>
                <text class="header">我的常用</text>
            </view>
            -->
        </view>
        <view>
            <view class="row">

                <view
                    class="d-ib ta-c px-s py-s"
                    v-for="(v, i) in me.items" :key="i"
                >
                    <view class="fx-c">
                        <o-div :clazz="'br-cir d-ib o-h ani-scaie-aii-x2'">
                            <view class="mw-4em mh-4em bg-pri fx-c wht-tit">
                                {{ funn.tit(v.tit) }} 
                            </view>
                        </o-div>
                    </view>
                    <view class="w-5em o-h o-x-s scroll-hide pt-s ws-n">
                        {{ v.tit }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
// const prp = defineProps<{}>()
const me = reactive({
    items: [
        {
            tit: '库存量查询',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        },
        {
            tit: '零库存查询',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        }, 

        {
            tit: '销售订单',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        },
        {
            tit: '交货通知单',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        },
        {
            tit: '销售退货申请',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        },
        {
            tit: '备货单',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        },
        {
            tit: '采购订单',
            img: '',
            icon: '',
            reponsed_page_code: 'form',
            router_data: { }
        }
    ]
})
const funn = {
    tit: (tit: string) => {
        return ( tit + '' ).substring(0, 2)
    }
}
</script>