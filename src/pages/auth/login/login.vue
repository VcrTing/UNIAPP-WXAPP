<template>
	<view>
		<VwLoginTop/>
		<view class="py"></view>
		<view class="py"></view>
		<view class="fx-c pt-t">
			<view class="w-80">
				<VwLoginForm/>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import VwLoginForm from '@/view/auth/login/VwLoginForm.vue';
import VwLoginTop from '@/view/auth/login/VwLoginTop.vue';


</script>

<style lang="sass" scoped>
@use '../../../ui/sass/app/view/__conf' as *
page, uni-page-body
	background: $bg-pag
</style>