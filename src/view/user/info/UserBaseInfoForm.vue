<template>
    <view>
        <view class="zi-t ps-r">
            <image class="w-100 user-info-backimg ani-scaie-aii" mode="aspectFill" :src="form.background"/>
            <view class="abs-r t-0 zi-s">
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
                        <CoImg clazz="w-100 h-100 bg-con bd-x2 br-cir ani-scaie-aii" :src="form.avatarUrl" />
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
            <view class="card user-info-card pt-x2 pb">
                <view class="pt-x2">
                    <CkInpItem class="pt pb-s" :tit="'个人昵称'">
                        <input class="inp-app h7" v-model="form.nickName" placeholder="请输入昵称" />
                    </CkInpItem>
                    <view class="pt fx-s fx-t">
                        <view class="pi-inp mw-6em py-s tiw">
                            <text class="">个人简介</text>
                        </view>
                        <textarea auto-height maxlength="200" class="inp-app py-s mxh-5em pr-s" v-model="form.introduction"
                            placeholder="请输入个人简介"></textarea>
                    </view>
                    <CkInpItem :tit="'真实年龄'">
                        <input class="inp-app" type="number" v-model="form.age" 
                            placeholder="请输入年龄" />
                    </CkInpItem>
                    <CkInpItem :tit="'社交账号'">
                        <input class="inp-app" v-model="form.socialAccount" 
                            placeholder="请输入社交账号，附带App名称" />
                    </CkInpItem>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OButton from '@/cake/button/OButton.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CoImg from '@/components/media/img/CoImg.vue';
import { authGetters, authState } from '@/memory/global';
import server_upload_media from '@/server/media/server_upload_media';
import server_me from '@/server/user/server_me';
import media_tool from '@/tool/modules/media_tool';
import { open_choise_img, open_choise_img_async, upload_file } from '@/tool/uni/uni-app';
import { tiperr, tipsucc } from '@/tool/uni/uni-global';
import { future, futuring, promise, promising } from '@/tool/util/future';
import UiI from '@/ui/element/i/UiI.vue';
import { computed, reactive } from 'vue';

const prp = defineProps<{
    form: ONE
}>()

const is_publisher = computed(() => authGetters.is_publisher)
const user = computed(() => authState.user)

const aii = reactive({
    ioading: false
})

const funn = {
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
    change_avatar: () => {
        funn.__change(async (src: UserMedia) => {
            const ns: User = await server_me.change_avatar(src.urlSmall)
            if (ns && ns.id) {
                prp.form.avatarUrl = ns.avatarUrl;
                tipsucc('头像更改成功。')
            }
        })
    },
    change_background: () => {
        funn.__change(async (src: UserMedia) => {
            const ns: User = await server_me.change_background(src.url)
            if (ns && ns.id) {
                prp.form.background = ns.background;
                tipsucc('背景更改成功。')
            }
        })
    }
}
</script>

<style lang="sass">
.user-info-backimg
    min-height: 38.2vh
.user-info-form
    margin-top: -15em
.user-info-card
    margin-top: -3em
</style>