<template>
	<div class="font-mono space-y-2 min-h-[240px]">
		<!-- Decrypt Mode: Password Cracking -->
		<template v-if="mode === 'decrypt' && !showPassword">
			<div class="text-dracula-red animate-pulse">
				{{ status }}
			</div>
		</template>

		<!-- Decrypt Mode: Password Found -->
		<template v-else-if="mode === 'decrypt' && showPassword && !isComplete">
			<div class="text-dracula-green">
				Password found: {{ generatePassword() }}
			</div>
			<div class="text-dracula-purple">
				{{ status }}
			</div>
			<div class="flex items-center gap-2">
				<span>Progress:</span>
				<span class="text-dracula-green">{{ progressBar }}</span>
				<span>{{ Math.round(progress) }}%</span>
			</div>
		</template>

		<!-- Progress Display -->
		<template v-else>
			<div
				:class="
					isComplete ? 'text-dracula-green font-bold' : 'text-dracula-purple'
				"
			>
				{{ status }}
			</div>
			<div class="flex items-center gap-2">
				<span>Progress:</span>
				<span class="text-dracula-green">{{ progressBar }}</span>
				<span>{{ Math.round(progress) }}%</span>
			</div>
		</template>

		<!-- Technical Details -->
		<div v-if="isComplete" class="text-dracula-comment w-fit">
			<div class="border-double border-4 border-dracula-comment p-2 my-6">
				<div
					class="border-b-4 border-double border-dracula-comment text-center font-bold mb-4"
				>
					{{ props.mode === 'encrypt' ? 'Encryption' : 'Decryption' }} Details
				</div>
				<div>
					<template v-if="props.mode === 'encrypt'">
						<div class="tracking-wide">Method: AES-256-GCM</div>
						<div class="tracking-wide">Exchange: ECDH P-384</div>
						<div class="tracking-wide">Signature: Ed25519</div>
					</template>
					<template v-else>
						<div class="tracking-wide">
							Status: <span class="text-dracula-green">Unlocked</span>
						</div>
						<div class="tracking-wide">Method: Brute Force</div>
						<div class="tracking-wide">Time: 2.3 seconds</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
	mode: {
		type: String,
		required: true,
		validator: (value) => ['encrypt', 'decrypt'].includes(value),
	},
});

const progress = ref(0);
const status = ref('initializing');
const isComplete = ref(false);
const showPassword = ref(false);
const passwordAttempts = ref(0);

const PROGRESS_WIDTH = 20;
const progressBar = computed(() => {
	const filled = Math.floor((progress.value / 100) * PROGRESS_WIDTH);
	const empty = PROGRESS_WIDTH - filled;
	return `[${'█'.repeat(filled)}${' '.repeat(empty)}]`;
});

const steps = {
	encrypt: [
		{ text: 'Generating encryption keys...', duration: 500 },
		{ text: 'Analyzing portfolio data...', duration: 400 },
		{ text: 'Applying AES-256 encryption...', duration: 800 },
		{ text: 'Securing access points...', duration: 300 },
		{ text: 'Verifying integrity...', duration: 400 },
	],
	decrypt: [
		{ text: 'Analyzing encryption signature...', duration: 400 },
		{ text: 'Retrieving decryption keys...', duration: 500 },
		{ text: 'Decrypting portfolio data...', duration: 800 },
		{ text: 'Verifying data integrity...', duration: 300 },
		{ text: 'Restoring access points...', duration: 400 },
	],
};

const generatePassword = () => {
	const chars = '0123456789ABCDEF';
	return Array.from(
		{ length: 16 },
		() => chars[Math.floor(Math.random() * chars.length)]
	).join('');
};

const runProcess = async () => {
	if (props.mode === 'decrypt') {
		// Password cracking simulation for decrypt mode
		while (passwordAttempts.value < 3) {
			status.value = `Password attempt ${
				passwordAttempts.value + 1
			}/3: ${generatePassword()}`;
			await new Promise((resolve) => setTimeout(resolve, 400));
			passwordAttempts.value++;
		}
		showPassword.value = true;
		await new Promise((resolve) => setTimeout(resolve, 800));
	}

	const currentSteps = steps[props.mode];

	for (const step of currentSteps) {
		status.value = step.text;
		const stepProgress = 100 / currentSteps.length;
		const incrementInterval = step.duration / 10;

		for (let i = 0; i < 10; i++) {
			await new Promise((resolve) => setTimeout(resolve, incrementInterval));
			progress.value += stepProgress / 10;
		}
	}

	progress.value = 100;
	status.value =
		props.mode === 'encrypt'
			? '🔐 Portfolio encryption complete!'
			: '🔓 Portfolio decryption complete!';
	isComplete.value = true;
};

onMounted(runProcess);
</script>
