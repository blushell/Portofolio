<template>
	<div class="space-y-6 w-max min-h-[500px]">
		<div class="relative">
			<h3 class="text-dracula-purple font-bold text-xl mb-2">
				Support My Work
				<span
					v-if="showingHeart"
					class="absolute -top-4 right-0 animate-float-up"
				>
					💝
				</span>
			</h3>
			<p class="text-dracula-comment">
				Your support helps me create more awesome stuff!
			</p>
		</div>

		<div class="space-y-4">
			<template v-for="(option, index) in donationOptions" :key="option.name">
				<div
					v-if="visibleOptions.includes(index)"
					class="transform transition-all duration-300"
					:class="[
						'animate-slide-in',
						{ 'delay-100': index === 1 },
						{ 'delay-200': index === 2 },
						{ 'delay-300': index === 3 },
					]"
				>
					<a
						:href="option.url"
						target="_blank"
						rel="noopener noreferrer"
						class="block p-4 rounded-lg bg-dracula-current hover:bg-opacity-70 transition-all duration-300 transform hover:scale-102 hover:-translate-y-1"
					>
						<div class="flex items-center gap-3">
							<span class="text-2xl">{{ option.icon }}</span>
							<div>
								<h4 class="font-bold" :class="option.color">
									{{ option.name }}
								</h4>
								<p class="text-sm text-dracula-comment">
									{{ option.description }}
								</p>
							</div>
						</div>
					</a>
				</div>
			</template>
		</div>

		<div class="text-dracula-comment text-sm italic">
			Thank you for considering supporting my work! 🙏
		</div>
	</div>
</template>
<script setup>
const donationOptions = [
	{
		name: 'Buy me a coffee',
		icon: '☕',
		url: 'https://buymeacoffee.com/yourusername',
		color: 'text-yellow-400',
		description: 'Keep me caffeinated and coding!',
	},
	{
		name: 'GitHub Sponsors',
		icon: '💖',
		url: 'https://github.com/sponsors/yourusername',
		color: 'text-pink-400',
		description: 'Support open source development',
	},
	{
		name: 'PayPal',
		icon: '💰',
		url: 'https://paypal.me/yourusername',
		color: 'text-blue-400',
		description: 'One-time or recurring donations',
	},
	{
		name: 'Ko-fi',
		icon: '🎨',
		url: 'https://ko-fi.com/yourusername',
		color: 'text-cyan-400',
		description: 'Support creative work',
	},
];

const visibleOptions = ref([]);
const showingHeart = ref(false);

onMounted(() => {
	// Animate options appearing one by one
	donationOptions.forEach((_, index) => {
		setTimeout(() => {
			visibleOptions.value.push(index);
		}, index * 200);
	});

	// Show floating heart animation periodically
	setInterval(() => {
		showingHeart.value = true;
		setTimeout(() => {
			showingHeart.value = false;
		}, 3000);
	}, 6000);
});
</script>
<style scoped>
@keyframes float-up {
	0% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
	100% {
		transform: translateY(-20px) scale(1.5);
		opacity: 0;
	}
}

@keyframes slide-in {
	0% {
		transform: translateX(-20px);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

.animate-float-up {
	animation: float-up 1s ease-out forwards;
}

.animate-slide-in {
	animation: slide-in 0.5s ease-out forwards;
}

.scale-102 {
	scale: 1.02;
}
</style>
