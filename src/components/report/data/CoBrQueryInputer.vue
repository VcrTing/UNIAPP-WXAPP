<template>
    <view v-if="src" class="soft">
        <view v-if="src.__type == 'search'">
            <o-input-s 
                :def="src.__value_def"
                @result="(n: SN) => src.__value = n"
                :clazz="'fx-aii-sdo-sec-inp'"
            />
        </view>

        <view v-else-if="src.__type == 'date'">
            <o-date-input-s
                :def="src.__value_def"
                :form="src" :pk="'__value'"
                @result="(n: SN) => src.__value = n"
                :clazz="'fx-aii-sdo-sec-inp'"
            />
        </view>

        <view v-else-if="src.__type == 'select'">
            <o-select-s 
                :def="src.__value_def"
                :def_choise="false"
                :items="src.options"
                :pk_tit="'label'" :pk_value="'value'"
                @result="(n: SN) => src.__value = n"
                :clazz="'fx-aii-sdo-sec-inp'"
            />
        </view>

        <view v-else>{{ src.__type }}</view>
    </view>
</template>

<script setup lang="ts">
import ODateInputS from '@/cake/input/date/ODateInputS.vue';
defineProps<{ src: RSchemaQuery }>()
</script>