<template>
    <view>
        <view class="zi-t ps-r zi-t user-info-backimg">
            <image class="w-100 h-100 ani-scaie-aii" mode="aspectFill" :src="form.background || info.userDefBackground"/>
            <view class="abs-r t-0 zi-s">
                <view class="pt"></view>
                <view class="mh-app-top-bar"></view>
                <view class="">
                    <OButton @tap="funn.change_background" color="bck" clazz="px-row py br-1" :weak="true">
                        <UiI i="edit"/>
                        <text class="pi-t">修改背景</text>
                    </OButton>
                </view>
            </view>
        </view>
        <view class="px-row user-info-form ps-r zi-t">
            <view class="py-row user-info-avatar">
                <view class="fx-c">
                    <view class="w-8em h-8em ps-r zi-t" @tap="funn.change_avatar">
                        <CoImg clazz="w-100 h-100 bg-con bd-x2 br-cir ani-scaie-aii" :src="form.avatarUrl || info.userDefAvatarUrl" />
                        <!--
                        <view class="abs-b r-0 zi-s">
                            <OButtonWht>
                                <UiI i="edit" clazz="h7 tiw"/>
                            </OButtonWht>
                        </view>
                        -->
                    </view>
                </view>
            </view>
            <view class="user-info-card pt-x2 pb-x1 br">
                <view class="pt-x2">
                    <CkInpItem clazz="pt pb-s c-uic-item" :tit="'个人昵称'">
                        <input class="inp-app h7" v-model="form.nickName" @blur="emt('submit')" placeholder="请输入昵称" />
                    </CkInpItem>
                    <view class="pt fx-s fx-t  c-uic-item">
                        <view class="pi-inp mw-6em py-s tiw">
                            <text class="">个人简介</text>
                        </view>
                        <textarea auto-height maxlength="200" @blur="emt('submit')" class="inp-app py-s mxh-5em pr-s" v-model="form.introduction"
                            placeholder="请输入个人简介"></textarea>
                    </view>
                    <CkInpItem :tit="'真实年龄'" clazz=" c-uic-item">
                        <input class="inp-app" type="number" v-model="form.age" @blur="emt('submit')"
                            placeholder="请输入年龄" />
                    </CkInpItem>
                    <CkInpItem :tit="'社交账号'" clazz=" c-uic-item">
                        <input class="inp-app" v-model="form.socialAccount" @blur="emt('submit')"
                            placeholder="请输入微信号、QQ号" />
                    </CkInpItem>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OSafeArea from '@/cake/app/safearea/OSafeArea.vue';
import OSafeAreaTop from '@/cake/app/safearea/OSafeAreaTop.vue';
import OButton from '@/cake/button/OButton.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { appState, authDispatch } from '@/memory/global';
import server_upload_media from '@/server/media/server_upload_media';
import server_me from '@/server/user/server_me';
import auth_tool from '@/tool/modules/common/auth_tool';
import { open_choise_img_async } from '@/tool/uni/uni-app';
import { tiperr, tipsucc } from '@/tool/uni/uni-global';
import { future, futuring } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const info = computed((): AppInfo => appState.info) 

const aii = reactive({
    ioading: false
})
const me = reactive({
    ioading: false
})
const emt = defineEmits([ 'submit' ])

const funn = {
    change: () => futuring(me, async () => {

        emt('submit')
    }),

    __change: (
        succFunc: Function
    ) => open_choise_img_async(1, async (src: UniChoseImg) => futuring(aii, async () => {
        const fp: string = src.tempFilePaths[0]
        const fs: File = src.tempFiles[0]
        if (fp) {
            prp.form.__avatarUrl = src.tempFiles[0];
            const res: UserMedia = await server_upload_media.user(fp)
            //
            succFunc ? succFunc( res ) : undefined
        }
        else {
            tiperr('未找到文件。')
        }
    })),
    change_avatar: () => auth_tool.doac(async () => {
        funn.__change(async (src: UserMedia) => {
            const ns: User = await authDispatch('change_info', { avatarUrl: src.url, reviewAvatarUrl: src.url })
            if (ns && ns.id) {
                prp.form.avatarUrl = ns.avatarUrl;
                tipsucc('头像更改成功。')
            }
        })
    }),
    change_background: () => auth_tool.doac(async () => {
        funn.__change(async (src: UserMedia) => {
            const ns: User = await authDispatch('change_info', { background: src.url, reviewBackground: src.url })
            if (ns && ns.id) {
                prp.form.background = src.url;
                tipsucc('背景更改成功。')
            }
        })
    })
}
</script>

<style lang="sass">
.user-info-backimg
    height: 100vh
.user-info-form
    margin-top: -82vh
.user-info-card
    margin-top: -3em
    background: rgba(255, 255, 255, 0.4)
.c-uic-item
    background: rgba(255, 255, 255, 0.6)
    backdrop-filter: blur(2px)
</style>