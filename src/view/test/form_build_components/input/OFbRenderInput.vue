<template>
    <view class="pb-s">
        <view v-if="type == 'input'">
            <fb-input :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'select'">
            <fb-select :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'number'">
            <fb-number :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'switch'">
            <fb-switch :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'checkbox'">
            <fb-checkbox :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'textarea'">
            <fb-textarea :one="one" :config="config"/>
        </view>

        <view v-else-if="type == 'date'">
            <fb-date :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'imgupload'">
            <fb-img-upload :one="one" :config="config"/>
        </view>
        <view v-else-if="type == 'fileupload'">
            <fb-file-upload :one="one" :config="config"/>
        </view>
        <view v-else>
            input NULL {{ type }}
        </view>
    </view>
</template>

<script setup lang="ts">
import FbInput from '@/test/form_build_cake/input/FbInput.vue';
import FbNumber from '@/test/form_build_cake/input/FbNumber.vue';
import FbSelect from '@/test/form_build_cake/input/FbSelect.vue';

import FbSwitch from '@/test/form_build_cake/input/choise/FbSwitch.vue';
import FbCheckbox from '@/test/form_build_cake/input/choise/FbCheckbox.vue';

import FbDate from '@/test/form_build_cake/input/date/FbDate.vue';
import FbTextarea from '@/test/form_build_cake/input/FbTextarea.vue';

import FbImgUpload from '@/test/form_build_cake/input/media/FbImgUpload.vue';
import FbFileUpload from '@/test/form_build_cake/input/media/FbFileUpload.vue';

import { FB_ITEM_TYPES, fb_get_item_type } from '@/test/form_build/form_build';

const prp = defineProps<{ one: ONE, config: ONE }>()

const type = computed(() => fb_get_item_type(prp.one))

const types: string[] = FB_ITEM_TYPES.input
</script>