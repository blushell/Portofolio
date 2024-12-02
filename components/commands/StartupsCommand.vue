<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="border-b border-dracula-current pb-4">
			<h2 class="text-dracula-purple font-bold text-xl mb-2">
				🚀 Current Ventures
			</h2>
			<p class="text-dracula-comment">
				Transforming ideas into impactful solutions
			</p>
		</div>

		<!-- Startups Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div
				v-for="startup in startups"
				:key="startup.name"
				class="bg-dracula-current rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-102"
			>
				<!-- Card Content -->
				<div class="p-6 space-y-4">
					<div class="space-y-2">
						<h3 class="text-dracula-text font-bold text-lg">
							{{ startup.name }}
						</h3>
						<p class="text-dracula-comment">
							{{ startup.description }}
						</p>
					</div>

					<div class="space-y-1">
						<div class="flex justify-between">
							<span class="text-dracula-comment">Stage:</span>
							<span :class="getStageColor(startup.stage)">
								{{ startup.stage }}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-dracula-comment">Raised:</span>
							<span class="text-dracula-green">{{ startup.raised }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-dracula-comment">Traction:</span>
							<span class="text-dracula-orange">{{ startup.traction }}</span>
						</div>
					</div>

					<div class="pt-4 space-y-2">
						<a
							:href="startup.website"
							target="_blank"
							class="block text-center py-2 px-4 bg-dracula-purple text-dracula-background rounded hover:bg-dracula-pink transition-colors"
						>
							Visit Website
						</a>

						<!-- Investment Button with Tooltip -->
						<div class="relative group">
							<button
								@click="copyInvestEmail(startup)"
								class="w-full py-2 px-4 border-2 border-dracula-purple text-dracula-purple rounded hover:bg-dracula-purple hover:text-dracula-background transition-colors flex items-center justify-center gap-2"
							>
								<span>🎯</span>
								<span>Invest in {{ startup.name }}</span>
							</button>

							<!-- Tooltip -->
							<div
								class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 py-2 px-4 bg-dracula-bg text-dracula-comment text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-dracula-purple"
							>
								Click to copy investment email
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Floating Notifications -->
		<div class="fixed bottom-4 right-4 space-y-2 pointer-events-none">
			<TransitionGroup
				enter-active-class="transition duration-300 ease-out"
				enter-from-class="transform translate-y-4 opacity-0"
				enter-to-class="transform translate-y-0 opacity-100"
				leave-active-class="transition duration-200 ease-in"
				leave-from-class="transform translate-y-0 opacity-100"
				leave-to-class="transform translate-y-4 opacity-0"
			>
				<div
					v-for="notification in notifications"
					:key="notification.id"
					class="bg-dracula-purple text-dracula-background px-4 py-2 rounded shadow-lg flex items-center gap-2"
				>
					<span>✓</span>
					<span>{{ notification.message }}</span>
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup>
const startups = [
	{
		name: 'TechVenture X',
		description: 'Revolutionizing AI-driven development workflows',
		stage: 'Seed',
		raised: '$2.5M',
		traction: '10k+ Monthly Active Users',
		website: 'https://techventurex.com',
		investEmail: 'invest@techventurex.com',
	},
	{
		name: 'CloudScale',
		description: 'Next-gen cloud infrastructure optimization platform',
		stage: 'Series A',
		raised: '$8M',
		traction: '200+ Enterprise Clients',
		website: 'https://cloudscale.ai',
		investEmail: 'investors@cloudscale.ai',
	},
	{
		name: 'DevFlow',
		description: 'Developer productivity suite with AI-powered insights',
		stage: 'Pre-seed',
		raised: '$500K',
		traction: '5k+ Beta Users',
		website: 'https://devflow.dev',
		investEmail: 'invest@devflow.dev',
	},
	{
		name: 'TailScale',
		description: 'Developer productivity suite with AI-powered insights',
		stage: 'Pre-seed',
		raised: '$500K',
		traction: '5k+ Beta Users',
		website: 'https://devflow.dev',
		investEmail: 'invest@devflow.dev',
	},
];

const notifications = ref([]);
const expandedCard = ref(null);

const addNotification = (message) => {
	const id = Date.now();
	notifications.value.push({ id, message });
	setTimeout(() => {
		notifications.value = notifications.value.filter((n) => n.id !== id);
	}, 2000);
};

const copyInvestEmail = async (startup) => {
	try {
		await navigator.clipboard.writeText(startup.investEmail);
		addNotification(`Email copied: ${startup.investEmail}`);
	} catch (err) {
		console.error('Failed to copy email:', err);
		addNotification('Failed to copy email');
	}
};

const getStageColor = (stage) => {
	switch (stage.toLowerCase()) {
		case 'pre-seed':
			return 'text-dracula-green';
		case 'seed':
			return 'text-dracula-cyan';
		case 'series a':
			return 'text-dracula-purple';
		default:
			return 'text-dracula-orange';
	}
};

/* const toggleCard = (startup) => {
	expandedCard.value = expandedCard.value === startup ? null : startup;
}; */
</script>

<style scoped>
.scale-102 {
	scale: 1.02;
}
</style>
