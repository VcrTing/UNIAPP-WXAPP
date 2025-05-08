<template>
    <o-scroll-y class="h-100">
        <view :class="clazz" class="oh-x scroll-hide">
            <root>
                <slot></slot>
                <co-app-bottom-bar/>
            </root>
            <CoGlobal/>
            <CoIndexMenuBar/>
        </view>
    </o-scroll-y>
</template>

<script setup lang="ts">
// import CoIndexMenuBar from '@/components/menu/CoIndexMenuBar.vue';
defineProps<{ clazz?: string }>()

</script>