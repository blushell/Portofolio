<template>
	<div
		class="bg-terminal-bg px-4 py-1 flex items-center select-none shadow-2xl"
	>
		<div class="flex space-x-2">
			<div
				class="winBtn rounded-full bg-terminal-close cursor-pointer hover:opacity-80 transition-opacity"
			></div>
			<div
				class="winBtn rounded-full bg-terminal-min cursor-pointer hover:opacity-80 transition-opacity"
			></div>
			<div
				class="winBtn rounded-full bg-terminal-max cursor-pointer hover:opacity-80 transition-opacity"
			></div>
		</div>
		<div class="flex-1 flex items-center justify-center">
			<i class="mr-2 mdi mdi-console text-terminal-icon text-xl"></i>
			<span class="text-sm"> {{ visitorIp }}@portfolio: ~ </span>
		</div>
	</div>
</template>
<script setup>
import { useVisitorIp } from '@/composables/useVisitorIp';

const { visitorIp } = useVisitorIp();
</script>
<style scoped>
.winBtn {
	width: 0.9rem;
	height: 0.9rem;
}
</style>
