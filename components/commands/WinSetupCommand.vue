<template>
	<div class="space-y-4">
		<!-- Header -->
		<div class="text-dracula-purple font-bold text-xl">
			🪟 Windows Setup Utility
		</div>

		<!-- Description -->
		<div class="space-y-2">
			<p class="text-dracula-text">
				A powerful utility to automate Windows development environment setup:
			</p>
			<ul class="list-disc list-inside text-dracula-comment space-y-1 ml-4">
				<li>Essential development tools</li>
				<li>Popular IDEs and editors</li>
				<li>Common programming languages</li>
				<li>WSL2 configuration</li>
				<li>PowerShell customization</li>
			</ul>
		</div>

		<!-- Installation -->
		<div class="space-y-2">
			<div class="text-dracula-cyan font-bold">Installation:</div>
			<div
				class="bg-dracula-current p-4 rounded-lg flex items-center justify-between"
			>
				<code class="text-dracula-green">{{ installCommand }}</code>
				<button
					@click="copyCommand"
					class="px-3 py-1 bg-dracula-purple text-dracula-background rounded hover:bg-dracula-pink transition-colors text-sm"
				>
					Copy
				</button>
			</div>

			<!-- Copy Notification -->
			<div v-if="message" class="text-dracula-green text-sm animate-fade-out">
				{{ message }}
			</div>
		</div>

		<!-- Notes -->
		<div class="text-dracula-comment text-sm space-y-1">
			<p>💡 Run in PowerShell as administrator</p>
			<p>⚡ Installs and configures everything automatically</p>
			<p>🛠️ Fully customizable through interactive prompts</p>
		</div>
	</div>
</template>

<script setup>
const installCommand = 'irm "https://jonesy.gg/win" | iex';
const message = ref('');

const copyCommand = async () => {
	try {
		await navigator.clipboard.writeText(installCommand);
		message.value = 'Command copied to clipboard!';
		setTimeout(() => {
			message.value = '';
		}, 2000);
	} catch (err) {
		console.error('Failed to copy command:', err);
		message.value = 'Failed to copy command';
	}
};
</script>

<style scoped>
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.animate-fade-out {
	animation: fadeOut 2s forwards;
}
</style>
