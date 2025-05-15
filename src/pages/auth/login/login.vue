<template>
	<view>
		<VwLoginTop/>
		<view class="py-x1"></view>
		<view class="py-x1"></view>
		<view class="fx-c">
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