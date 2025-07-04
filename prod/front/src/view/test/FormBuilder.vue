<template>
	<view class="pb-x2 pt">
		<view>
			<button @tap="aii.tab = 0" :size="'mini'" class="mr">切换Form展示</button>
			<button @tap="aii.tab = 1" :size="'mini'">切换Table展示</button>
		</view>
		<view v-if="aii.tab == 0" class="px">
			<view class="pb-x2">下面是Form展示:</view>
			<o-fb-wrapper :list="aii.data_1.list" :config="aii.data_1.config"/>
		</view>
		<view v-if="aii.tab == 1" class="px">
			<view class="pb-x2">下面是Table展示:</view>
			<o-fb-wrapper :list="aii.data_2.list" :config="aii.data_2.config"/>
		</view>
	</view>
</template>

<script setup lang="ts">
import OFbWrapper from "./form_build/OFbWrapper.vue";
import formJson from "./warehouse/form_design_page_example.json"
import tableJson from "./warehouse/form_design_table_example.json"

console.log("FORM JSON = ", formJson)
console.log("TABLE JSON = ", tableJson)

const aii = reactive({
	data_1: formJson,
	data_2: tableJson,
	tab: 0,
})

const func = {

}
</script>
