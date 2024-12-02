<template>
	<div class="min-h-[600px]">
		<div class="space-y-1">
			<div
				v-for="(line, index) in lines"
				:key="index"
				:class="{
					'text-dracula-orange font-bold': line.type === 'warning',
					'text-dracula-green': line.type === 'loop' && isRunning,
					'text-dracula-purple font-bold': line.type === 'break',
					'animate-pulse': line.type === 'loop' && isRunning,
				}"
			>
				<template v-if="line.type === 'loop'"
					><span class="text-dracula-green"> > {{ line.text }} </span></template
				>
				<template v-else>
					{{ line.text }}
				</template>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTerminalInput } from '~/composables/useTerminalInput';

const { hideInput, showInput } = useTerminalInput();
const lines = ref([]);
const isRunning = ref(true);
const interval = ref(null);

const funPhrases = [
	'All work and no play makes Jack a dull boy',
	'Does this loop make me look infinite?',
	"Help! I'm stuck in a loop factory!",
	'Loading... Loading... Still loading...',
	'To infinity and beyond! (literally)',
	'This is the loop that never ends...',
	"Are we there yet? No, we're looping!",
	'Insert coin to break loop',
	'Loop-de-loop!',
	'Warning: Loop side effects may include dizziness',
];

const getRandomPhrase = () => {
	return funPhrases[Math.floor(Math.random() * funPhrases.length)];
};

const handleKeydown = (e) => {
	if (e.ctrlKey && e.key === 'c') {
		clearInterval(interval.value);
		isRunning.value = false;
		showInput();
		// Add break message
		lines.value.push({
			text: "Loop broken! You've escaped!",
			type: 'break',
		});
	}
};

onMounted(() => {
	hideInput();
	window.addEventListener('keydown', handleKeydown);

	// Initial message
	lines.value.push({
		text: "You've triggered an infinite loop! Press Ctrl+C to escape.",
		type: 'warning',
	});

	// Start the infinite loop
	interval.value = setInterval(() => {
		if (isRunning.value) {
			lines.value.push({
				text: getRandomPhrase(),
				type: 'loop',
			});

			// Keep only the last 20 lines to prevent memory issues
			if (lines.value.length > 20) {
				lines.value.shift();
			}
		}
	}, 300);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	clearInterval(interval.value);
	showInput();
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
