<template>
	<div class="space-y-2">
		<div class="flex items-center gap-2">
			<span class="text-dracula-purple">🛍️</span>
			<span class="text-dracula-green animate-pulse"
				>Redirecting to store...</span
			>
		</div>

		<div class="ml-6 space-y-1">
			<div class="text-dracula-comment">
				└─ Opening new tab at store.jonesy.dev
			</div>
			<div class="text-dracula-cyan text-sm">
				Tip: Use command 'store' anytime to quickly access the shop
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
	window.open('https://store.jonesy.dev', '_blank');
});
</script>

<style scoped>
@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

.animate-pulse {
	animation: pulse 1s ease-in-out infinite;
}
</style>
