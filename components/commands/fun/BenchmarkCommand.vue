<template>
	<div class="min-h-[800px]">
		<template v-for="(result, index) in results" :key="index">
			<!-- Header -->
			<div
				v-if="result.type === 'header'"
				class="text-dracula-purple font-bold mt-2"
			>
				{{ result.text }}
			</div>

			<!-- Progress -->
			<div v-else-if="result.type === 'progress'" class="text-dracula-text">
				{{ result.text }}
				<span class="animate-pulse">⚡</span>
			</div>

			<!-- Test Result -->
			<div v-else-if="result.type === 'result'" class="ml-4">
				<span class="text-dracula-comment">{{ result.test }}:</span>
				<span :class="result.color" class="ml-2">
					{{ result.score.toLocaleString() }} points
				</span>
			</div>

			<!-- Spacer -->
			<div v-else-if="result.type === 'spacer'" class="h-2"></div>

			<!-- Summary -->
			<div
				v-else-if="result.type === 'summary'"
				class="text-dracula-green font-bold mt-4 text-lg"
			>
				{{ result.text }}
			</div>
		</template>

		<!-- Loading State -->
		<div v-if="!isComplete" class="text-dracula-purple animate-pulse mt-2">
			Running benchmarks...
		</div>
	</div>
</template>

<script setup>
const results = ref([]);
const isComplete = ref(false);
const totalScore = ref(0);

const benchmarks = [
	{
		name: 'CPU Performance',
		tests: ['Single-core', 'Multi-core', 'Cache speed'],
		baseScore: 2500,
	},
	{
		name: 'Memory Access',
		tests: ['Read speed', 'Write speed', 'Latency'],
		baseScore: 1800,
	},
	{
		name: 'Disk I/O',
		tests: ['Sequential read', 'Random read', 'Write speed'],
		baseScore: 1200,
	},
	{
		name: 'Network',
		tests: ['Latency', 'Download', 'Upload'],
		baseScore: 950,
	},
];

const getRandomScore = (base) => {
	const variance = base * 0.2; // 20% variance
	return Math.floor(base + (Math.random() - 0.5) * variance);
};

const getScoreColor = (score, baseScore) => {
	const ratio = score / baseScore;
	if (ratio >= 1.1) return 'text-dracula-green';
	if (ratio >= 0.9) return 'text-dracula-yellow';
	return 'text-dracula-red';
};

const runBenchmark = async () => {
	for (const benchmark of benchmarks) {
		// Add benchmark header
		results.value.push({
			type: 'header',
			text: `Running ${benchmark.name} benchmark...`,
		});

		await new Promise((resolve) => setTimeout(resolve, 500));

		// Run individual tests
		for (const test of benchmark.tests) {
			results.value.push({
				type: 'progress',
				text: `  ${test}: `,
			});

			// Simulate progress
			await new Promise((resolve) => setTimeout(resolve, 300));

			const score = getRandomScore(benchmark.baseScore);
			totalScore.value += score;

			results.value.push({
				type: 'result',
				test,
				score,
				baseScore: benchmark.baseScore,
				color: getScoreColor(score, benchmark.baseScore),
			});
		}

		results.value.push({ type: 'spacer' });
	}

	results.value.push({
		type: 'summary',
		text: `Total Score: ${totalScore.value.toLocaleString()} points`,
	});

	isComplete.value = true;
};

onMounted(runBenchmark);
</script>
