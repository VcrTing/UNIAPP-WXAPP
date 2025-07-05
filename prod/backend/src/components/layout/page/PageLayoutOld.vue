<template>
        <Root>
            <slot></slot>
        </Root>
        <CoGlobal/>
</template>

<script lang="ts">
import CoGlobal from '@/components/global/CoGlobal.vue';
import Root from '../_root/Root.vue';
</script>