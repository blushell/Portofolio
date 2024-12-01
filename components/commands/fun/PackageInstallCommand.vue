<template>
	<div class="space-y-2 min-h-[270px]">
		<template v-for="(line, index) in output" :key="index">
			<!-- <div class="text-dracula-foreground">{{ line }}</div> -->
			<div class="text-dracula-foreground" v-html="line"></div>
		</template>

		<div v-if="!isComplete" class="text-dracula-purple animate-pulse">
			Installing...
		</div>
		<div v-else class="text-dracula-green">✨ Installation complete!</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
	packageName: {
		type: String,
		required: true,
	},
});

const output = ref([]);
const isComplete = ref(false);

// Parse package name and version
const parsePackageString = (pkgString) => {
	const lastAtIndex = pkgString.lastIndexOf('@');

	// If no @ symbol or it's a scoped package with no version
	if (lastAtIndex === -1 || lastAtIndex === 0) {
		return {
			name: pkgString,
			version: 'latest',
		};
	}

	// Check if it's a scoped package
	if (pkgString.startsWith('@')) {
		// If there's only one @, it's a scoped package without version
		if (pkgString.indexOf('@', 1) === -1) {
			return {
				name: pkgString,
				version: 'latest',
			};
		}
		// It's a scoped package with version
		return {
			name: pkgString.substring(0, lastAtIndex),
			version: pkgString.substring(lastAtIndex + 1),
		};
	}

	// Regular package with version
	return {
		name: pkgString.substring(0, lastAtIndex),
		version: pkgString.substring(lastAtIndex + 1),
	};
};

const { name, version } = parsePackageString(props.packageName);

const plusLine = 40;
const plusText = '+'.repeat(plusLine);

const steps = [
	{ text: `Resolving ${name}@${version} from npm...`, delay: 300 },
	{ text: `Download ${name}@${version}...`, delay: 400 },
	{ text: 'Packages: <span class="text-dracula-green">+1</span>', delay: 200 },
	{
		text: `<span class="text-dracula-green">${plusText}</span>`,
		delay: 200,
	},

	{ text: '<span class="text-dracula-cyan">dependencies:</span>', delay: 200 },
	{
		text: `<span class="text-dracula-green">+</span> ${name} <span class="text-dracula-comment">${version}</span>`,
		delay: 200,
	},
	{ text: '✨ Done in 0.8s', delay: 200 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateInstallation = async () => {
	for (const step of steps) {
		await sleep(step.delay);
		output.value.push(step.text);
	}
	isComplete.value = true;
};

onMounted(() => {
	simulateInstallation();
});
</script>
