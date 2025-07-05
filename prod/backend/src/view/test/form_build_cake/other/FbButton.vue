<template>
    <view>
		<button 
            :disabled="option.disabled"
            :type="option.buttonType" 
            :size="func.size()"
            :loading="aii.ioading"
            @tap="tap"
            >
            {{ fb_get_name(one) }}
        </button>
    </view>
</template>

<script setup lang="ts">
import { fb_get_name, fb_get_option } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

const option = computed((): ONE => fb_get_option(prp.one))

const aii = reactive({ ioading: false })

const tap = () => {

}

const func = {
    size: (): string => (option.value.buttonSize == 'small' ? 'mini' : 'default')
}
</script>