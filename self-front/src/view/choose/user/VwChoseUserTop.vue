<template>
    <view>
        <view class="py">
            <view>
                <CoSearchInput class="bg-con br-rnd" :i="'search'" :ir="'x'"
                    :def="form.search" 
                    @result="(v) => form.search = v"
                    @tapi="funn.submit" @tapr="funn.submit"
                    :pchd="'请输入妹子名称'"/>
            </view>
        </view>
        <view class="py-row">
            
        </view>
    </view>
</template>

<script setup lang="ts">
import CoSearchInput from '@/components/element/input/CoSearchInput.vue';
import { reactive } from 'vue';

// const prp = defineProps<{}>()
const form = reactive({ search: '' })

const funn = {
    submit: () => {
        console.log('')
    }
}
</script>