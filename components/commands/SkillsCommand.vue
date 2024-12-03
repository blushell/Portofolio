<template>
	<div class="space-y-4">
		<div
			v-for="category in skillCategories"
			:key="category.name"
			class="space-y-2"
		>
			<h3 class="text-dracula-purple font-bold">{{ category.name }}</h3>

			<div class="space-y-1">
				<div
					v-for="skill in category.skills"
					:key="skill.name"
					class="flex items-center gap-2"
				>
					<span :class="`text-dracula-${skill.color} w-24`">{{
						skill.name
					}}</span>
					<span :class="`text-dracula-${skill.color}`">{{
						getProgressBar(skill.level)
					}}</span>
					<span class="text-dracula-comment text-sm">{{ skill.level }}%</span>
				</div>
			</div>
		</div>

		<div
			class="text-dracula-comment text-sm italic border-t border-dracula-current pt-2"
		>
			* Skills are self-assessed and continuously improving
		</div>
	</div>
</template>

<script setup>
const skillCategories = [
	{
		name: 'Frontend',
		skills: [
			{ name: 'Vue.js', level: 85, color: 'cyan' },
			{ name: 'Nuxt.js', level: 75, color: 'green' },
			{ name: 'TypeScript', level: 40, color: 'pink' },
			{ name: 'JavaScript', level: 95, color: 'yellow' },
			{ name: 'HTML/CSS', level: 90, color: 'orange' },
		],
	},
	{
		name: 'Backend',
		skills: [
			{ name: 'Node.js', level: 85, color: 'cyan' },
			{ name: 'Python', level: 60, color: 'green' },
			{ name: 'PostgreSQL', level: 80, color: 'pink' },
			{ name: 'MongoDB', level: 70, color: 'yellow' },
		],
	},
	{
		name: 'DevOps',
		skills: [
			{ name: 'Docker', level: 75, color: 'cyan' },
			{ name: 'AWS', level: 45, color: 'green' },
			{ name: 'CI/CD', level: 80, color: 'pink' },
			{ name: 'Git', level: 90, color: 'yellow' },
		],
	},
];

const PROGRESS_WIDTH = 20; // Total width of progress bar in characters

const getProgressBar = (level) => {
	const filled = Math.floor((level / 100) * PROGRESS_WIDTH);
	const empty = PROGRESS_WIDTH - filled;
	return `[${'█'.repeat(filled)}${'-'.repeat(empty)}]`;
};
</script>
