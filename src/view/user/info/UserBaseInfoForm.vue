<template>
    <view>
        <view class="zi-t ps-r">
            <image class="w-100 user-info-backimg" mode="aspectFill" :src="user.background"/>
        </view>
        <view class="px-row user-info-form ps-r zi-s">
            <view class="py-row user-info-avatar">
                <view class="fx-c ps-r zi-s">
                    <CkAvatar clazz="w-8em h-8em bg-con bd-x2 br-cir" :src="user.avatar"/>
                </view>
            </view>
            <view class="card user-info-card pt-x2 pb">
                <CkInpItem class="pt pb-s" :tit="''">
                    <OInput :def="form.name" @result="(v) => form.name = v" 
                        class="h7" :pchd="'请输入名字'"/>
                </CkInpItem>
                <view>
                    <view class="pt fx-s fx-t">
                        <view class="pi-inp mw-6em py-s">
                            <text class="">个人简介</text>
                        </view>
                        <OTextarea :def="form.description" @result="(v) => form.name = v" 
                            :pchd="'请输入个人简介'"/>
                    </view>
                    <CkInpItem :clazz_tit="'pi-inp'" :tit="'社交账号'">
                        <OInput :def="form.contact" @result="(v) => form.contact = v" 
                            class="" :pchd="'请输入社交账号，附带App名称'"/>
                    </CkInpItem>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import OInput from '@/cake/input/inp/OInput.vue';
import OTextarea from '@/cake/input/textarea/OTextarea.vue';
import CkInpItem from '@/cake/input/wrapper/CkInpItem.vue';
import CkAvatar from '@/cake/visual/avatar/CkAvatar.vue';
import { authGetters, authState } from '@/memory/global';
import { computed, reactive } from 'vue';

// const prp = defineProps<{}>()
const form = reactive({
    name: '', description: '', contact: ''
})

const is_publisher = computed(() => authGetters.is_publisher)
const user = computed(() => authState.user)
</script>

<style lang="sass">
.user-info-backimg
    min-height: 38.2vh
.user-info-form
    margin-top: -15em
.user-info-card
    margin-top: -3em
</style>