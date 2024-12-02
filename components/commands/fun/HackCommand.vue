<template>
	<div class="space-y-1 min-h-[460px]">
		<template v-for="(line, index) in lines" :key="index">
			<div
				:class="{
					'text-dracula-green': line.status === 'success',
					'text-dracula-orange': line.status === 'warning',
				}"
			>
				[{{ line.status === 'success' ? '✓' : '!' }}] {{ line.text }}
			</div>
		</template>

		<div
			v-if="isComplete"
			class="text-dracula-purple font-bold mt-4 animate-pulse"
		>
			You're in. Welcome to the mainframe.
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const lines = ref([]);
const isComplete = ref(false);
const interval = ref(null);

const hackingLines = [
	'Initializing hack sequence...',
	'Bypassing firewall...',
	'Cracking encryption...',
	'Accessing secure protocols...',
	'Injecting payload...',
	'Breaching security layers...',
	'Decrypting database...',
	'Extracting sensitive data...',
	'Covering tracks...',
	'Establishing secure connection...',
	'Deploying countermeasures...',
	'Routing through proxies...',
	'Scanning for vulnerabilities...',
	'Exploiting system weaknesses...',
	'Escalating privileges...',
];

const addLine = () => {
	if (lines.value.length >= hackingLines.length) {
		clearInterval(interval.value);
		setTimeout(() => {
			isComplete.value = true;
		}, 500);
		return;
	}

	lines.value.push({
		text: hackingLines[lines.value.length],
		status: Math.random() > 0.3 ? 'success' : 'warning',
	});
};

onMounted(() => {
	interval.value = setInterval(addLine, 200);
});
</script>
