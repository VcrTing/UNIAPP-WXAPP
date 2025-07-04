<template>
    <view>
        <view class="px">
            <!-- 文字 -->
            <view class="py pri-tih">
                <text class="h1 b">H1</text>
                <text class="h2 b">H2</text>
                <text class="h3 b">H3</text>
                <text class="h4 b">H4</text>
                <text class="h5 b">H5</text>
                <text class="h6 b">H6</text>
                <text class="h7 b">H7</text>
                <text class="h8 b">H8</text>
                <text class="h9 b">H9</text>
            </view>
            <!-- 按钮 -->
            <view class="py">
                <o-button @touch="func.touch('pri')">弹出一个 Mod</o-button>
                <o-button-out @touch="func.touch('pri out')">弹出一个 Pan</o-button-out>
                <o-button-iht @touch="func.touch('pri iht')">弹出一个 Err</o-button-iht>
                <view class="pt">
                    <o-div :clazz="'br'" :clazz_inner="''" @touch="func.eval5">
                        <view class="px py ta-c">
                            DIV
                        </view>
                    </o-div>
                    <view class=""></view>

                    <view class="fx-s">
                        <o-div :clazz="'br d-ib mw-6em'" :clazz_inner="''">
                            <view class="px py ta-c" @tap="func.clear">
                                清空 storage
                            </view>
                        </o-div>
                        <view>
                            废弃 iconnoir: <ui-i :i="'i'"/>
                            <!--
                            <view :style="{
                                'background': '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.52844 7.29357L11.7086 11.8381C11.8898 11.9388 12.1102 11.9388 12.2914 11.8381L20.5 7.27777" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 21L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
                            }"></view>
                            -->
                        </view>
                        <view>
                            bootstrap: <view class="bi bi-app-indicator"></view>
                        </view>
                    </view>
                </view>
                <view class="pb fx-i">
                    <o-div :clazz="'br d-ib mw-6em'" :clazz_inner="''">
                        <view class="px py ta-c" @tap="aiert_tooi.succ('操作成功。')">
                            弹出操作成功
                        </view>
                    </o-div>
                    <o-div :clazz="'br d-ib mw-6em'" :clazz_inner="''">
                        <view class="px py ta-c" @tap="aiert_tooi.err('操作失败。')">
                            弹出操作失败
                        </view>
                    </o-div>
                    <o-div :clazz="'br d-ib mw-6em w-50'" :clazz_inner="''">
                        <view class="px py ta-c" @tap="func.replaceAierts">
                            替换aierts为新数组，导致 watch(aierts.value) 失效，watch(aierts)却会触发
                        </view>
                    </o-div>
                </view>
                <view>
                    aierts.length: {{ eleState.aierts.length }}
                </view>
            </view>

        <view>
            <view class="py">
            <!-- TABLE -->
            <view class="py">
                <view class="b pri-tih h5">Table 要求功能</view>
                <view class="py-s sec-tit">1. 冻结列，2. 标题悬浮，3. 标题排序，4. 全选（搁置）</view>
            </view>
            <view class="py">
                <view class="fx-r">
                    <co-filter-button @touch="pan.view_filter"/>
                </view>
            </view>
            <view class="py">
                <view class="br o-h">
                    <!--
                    <test-o-table :class="'test-o-tbo'" :ioading="aii.ioading" @dbtouch="pan.view_detail"/>
                    -->
                </view>
                <view>
                    <o-button class="w-100" @touch="func.ioad">加载</o-button>
                    <view class="pt"></view>
                    <o-button-out class="w-100" @touch="func.logout">退出登录</o-button-out>
                </view>
            </view>
            </view>
                <!-- DIV -->
                <view class="py">
                    <o-div :clazz="'mb d-ib'" @touch="func.touch('t')">弹出顶部 Pan</o-div>
                    <o-div :clazz="'mb d-ib'" :clazz_inner="'px py'" @touch="func.touch('r')">弹出右边 Pan</o-div>
                    <o-div
                        :clazz_inner="'py-s px'" 
                        :clazz="'mb btn fx-aii-btn-pri-iht pri d-ib'" @touch="func.touch('pri')">Fx DIV Pri Iht</o-div>
                    <o-div
                        :clazz_inner="'py-s px'" 
                        :clazz="'mb btn fx-aii-btn-pri-out pri d-ib'" @touch="func.touch('pri')">Fx DIV Pri Out</o-div>
                </view>
                <!-- 输入框 -->
                <view class="py">
                    <view>
                        <o-input :label="''" :err="''"/>
                    </view>
                    <view class="pt">
                        <ui-dropdown>
                            <template #sign>
                                <o-input-s/>
                            </template>
                            <template #con>
                                <o-div><view class="px py">选择</view></o-div>
                            </template>
                        </ui-dropdown>
                    </view>
                    <view class="pt">
                        <o-select-s :items="[
                            { tit: '选择', value: 'a' }
                        ]" :pk_tit="'tit'" :pk_value="'value'"/>
                    </view>
                </view>
                <!-- 文字 -->
                <view class="py">
                    <view>
                        <text class="tih pr">TIH</text>
                        <text class="tit pr">TIT</text>
                        <text class="tid pr">TID</text>
                        <text class="tis pr">TIS</text>
                    </view>
                    <view>
                        <text class="pri pr">PRI</text>
                        <text class="pri-tih pr">PRI-TIH</text>
                    </view>
                    <view>
                        <text class="sec-tih pr">SEC-TIH</text>
                        <text class="sec-tit pr">SEC-TIT</text>
                        <text class="sec-tid pr">SEC-TID</text>
                        <text class="sec-tis pr">SEC-TIS</text>
                    </view>
                    <view>
                        <text class="cot pr">COT</text>
                        <text class="cot pr">COT</text>
                        <text class="cod pr">COD</text>
                        <text class="cos pr">COS</text>
                    </view>
                </view>
                <!-- 背景色 -->
                <view class="br o-h my">
                    <view class="fx-c">
                        <view class="view-ui-box bg-sec-n">
                            <text class="sec-tit">背景色-主1</text>
                        </view>
                        <view class="view-ui-box bg-sec">
                            <text class="sec-tit">背景色-主</text>
                        </view>
                    </view>
                    <view class="fx-c">
                        <view class="view-ui-box bg-sec-t">
                            <text class="sec-tit">背景色-小</text>
                        </view>
                        <view class="view-ui-box bg-sec-s">
                            <text class="sec-tit">背景色-次</text>
                        </view>
                    </view>
                </view>
                <!-- ICON -->
                <view class="py">
                    <view class="fx-i">
                        <text>图标：</text>
                        <o-f-i :i="'x'" :clazz="'sec-tit'" @touch="pan.close(0)"></o-f-i>
                        <o-f-i :i="'i'" :clazz="'sec-tit'" @touch="pan.close(0)"></o-f-i>
                        <o-f-i :i="'r'" :clazz="'sec-tit'" @touch="pan.close(0)"></o-f-i>
                        <o-f-i :i="'a-i'" :clazz="'sec-tit'" @touch="pan.close(0)"></o-f-i>
                        <o-f-i :i="'menu'" :clazz_ripie="'bg-pri-iht'" :clazz="'pri'" @touch="pan.close(0)"></o-f-i>
                        <o-f-i :i="'a-r'" :clazz="'fx-aii-btn-pri btn-pri-iht'" @touch="pan.close(0)"></o-f-i>
                    </view>
                    <view class="fx-i pt-s">
                        <o-button-i :i="'x'">关闭</o-button-i>
                        <o-button-i :clazz="'btn-pri'" :i="'a-i'">返回</o-button-i>
                    </view>
                </view>
                <!-- 状态 -->
                <view class="py">
                    <view>
                        <text class="war pr">WAR</text>
                        <text class="err pr">ERR</text>
                        <text class="tid pr">TID</text>
                        <text class="tis pr">TIS</text>
                    </view>
                    <view>
                        <text class="pri pr">PRI</text>
                        <text class="pri-tih pr">PRI-TIH</text>
                    </view>
                    <view class="py-s">
                        <view class="bg-war px py-s br fx-hv-bg-war fx-fcs-bg-war">
                            <view class="war">警告，您的网络连接错误，请重试。</view>
                        </view>
                    </view>
                    <view class="py-s">
                        <view class="bg-err px py-s br fx-hv-bg-err fx-fcs-bg-err">
                            <view class="err">警告，您的网络连接错误，请重试。</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="py-x2"></view>
            <o-pan :idx="0">
                <o-pan-inner :idx="0">
                    <!--
                    <ViewReportPanTableItemDetail/>
                    -->
                </o-pan-inner>
            </o-pan>
            <!--
            <o-pan :idx="1">
                <o-pan-inner :idx="1">
                    <ViewReportPanTableFilter/>
                </o-pan-inner>
            </o-pan>
            -->
        </view>
       
    </view>
</template>

<script setup lang="ts">
import pan_tooi from '@/tool/app/pan_tooi';
import { future } from '@/tool/util/future';

import { Interpreter } from 'eval5'
import { local } from '@/tool/web/storage';
import aiert_tooi from '@/tool/app/aiert_tooi';
import { authDispatch, eleDispatch, eleState } from '@/memory/global';
import { goLogin } from '@/tool/router/router';

const aii = reactive({
    ioading: false,
    err1: '', 
    err2: ''
})

const pan = {
    view_detail: (params: ANYS) => future(async () => {
        console.log("params =", params)
        await reportDBDispatch('change', [ 'index', params[0] ])
        await reportDBDispatch('change', [ 'item', params[1] ])
        pan_tooi.open_def_r(0, undefined)
    }),
    view_filter: () => future(async () => {
        pan_tooi.open_def_b(1, undefined)
    }),
    close: (idx: number) => pan_tooi.close_pan(idx)
}

const func = {
    logout: async () => {
        await authDispatch('logout')
        goLogin()
    },
    replaceAierts: async () => {
        await eleDispatch('change', [ 'aierts', [ ] ])  
    },
    touch: (s: string) => {
        console.log("按钮点击了 =", s)
    },
    ioad: () => {
        aii.ioading = true
        setTimeout(() => {
            aii.ioading = false
            console.log('加载完成')
        }, 3000)
    },
    eval5: () => {
        try {
            var interpreter = new Interpreter({});
            const a = interpreter.evaluate("[{label: '大货',value: '大货'},{ label: '样布',value: '样布'}]");
            console.log(a)
        } catch(err) {
            aii.err1 = err + ''
        }
        try {
            var interpreter = new Interpreter({});
            const b = interpreter.evaluate("{'codeParam':'Bdate','nameParam':''}");
            console.log(b)
        } catch(err) {
            aii.err2 = err + ''
        }
    },
    clear: () => {
        try {
            local.clean()
            uni.clearStorageSync()
            localStorage.clear()
            sessionStorage.clear()
        } catch(err) {
            aii.err1 = err + ''
        }
    }
}

function reportDBDispatch(arg0: string, arg1: any[]) {
    throw new Error('Function not implemented.');
}
</script>

<style lang="sass">
.view-ui-box
    width: 50%
    height: 12vw
    display: flex
    align-items: center
    justify-content: center
.test-o-tbo
    .tbo-wrapper
        max-height: 70vh
</style>