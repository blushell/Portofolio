<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="border-b border-dracula-current pb-2">
			<div class="text-dracula-purple font-bold">~/projects $ ls -la</div>
			<div class="text-dracula-comment text-sm mt-1">
				total {{ projects.length }} (filtered by significance)
			</div>
		</div>

		<!-- Projects List -->
		<div class="space-y-4 w-max">
			<div
				v-for="(project, index) in projects"
				:key="project.name"
				class="bg-dracula-current rounded-lg p-4 transform transition-all duration-300 hover:scale-101 hover:bg-opacity-70"
				:style="{ animationDelay: `${index * 100}ms` }"
			>
				<!-- Project Header -->
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center gap-2">
						<span
							:class="`text-dracula-${getStatusColor(project.status)}`"
							class="animate-pulse"
						>
							{{ getStatusIcon(project.status) }}
						</span>
						<span class="text-dracula-purple font-bold">
							{{ project.name }}
						</span>
					</div>
					<div class="text-dracula-comment text-sm">
						{{ project.status }}
					</div>
				</div>

				<!-- Project Description -->
				<div class="text-dracula-foreground mb-3">
					> {{ project.description }}
				</div>

				<!-- Features -->
				<div class="space-y-1 mb-3">
					<div
						v-for="feature in project.features"
						:key="feature"
						class="text-dracula-comment text-sm ml-4"
					>
						└─ {{ feature }}
					</div>
				</div>

				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-3">
					<span
						v-for="tag in project.tags"
						:key="tag"
						class="px-2 py-1 bg-dracula-background rounded text-xs"
						:class="`text-dracula-${
							['cyan', 'green', 'pink', 'yellow'][project.tags.indexOf(tag) % 4]
						}`"
					>
						{{ tag }}
					</span>
				</div>

				<!-- Links -->
				<div class="flex gap-4 text-sm">
					<a
						v-if="project.github"
						:href="project.github"
						target="_blank"
						class="text-dracula-green hover:text-dracula-purple transition-colors flex items-center gap-1"
					>
						<span>~/github</span>
						<span class="text-dracula-comment">↗</span>
					</a>
					<a
						v-if="project.demo"
						:href="project.demo"
						target="_blank"
						class="text-dracula-cyan hover:text-dracula-purple transition-colors flex items-center gap-1"
					>
						<span>~/demo</span>
						<span class="text-dracula-comment">↗</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Legend -->
		<div class="text-sm border-t border-dracula-current pt-2 space-y-1">
			<div class="text-dracula-comment">Status Legend:</div>
			<div class="flex gap-4">
				<span class="flex items-center gap-1">
					<span class="text-dracula-green">●</span>
					<span class="text-dracula-comment">active</span>
				</span>
				<span class="flex items-center gap-1">
					<span class="text-dracula-cyan">◆</span>
					<span class="text-dracula-comment">stable</span>
				</span>
				<span class="flex items-center gap-1">
					<span class="text-dracula-orange">○</span>
					<span class="text-dracula-comment">development</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
const projects = [
	{
		name: 'Terminal Portfolio',
		description:
			'Interactive terminal-themed developer portfolio with real command processing and dynamic UI components.',
		tags: ['Vue.js', 'Nuxt', 'TailwindCSS', 'TypeScript'],
		features: [
			'Real command processing',
			'Custom terminal emulation',
			'Interactive UI components',
			'Dracula theme integration',
		],
		github: 'https://github.com/jonesydev/terminal-portfolio',
		demo: 'https://jonesy.dev',
		status: 'active',
	},
	{
		name: 'Task Manager API',
		description:
			'Full-featured RESTful API for task and project management with real-time updates.',
		tags: ['Node.js', 'Express', 'MongoDB', 'WebSocket'],
		features: [
			'Real-time updates',
			'JWT authentication',
			'File uploads',
			'Rate limiting',
		],
		github: 'https://github.com/jonesydev/task-manager',
		status: 'stable',
	},
	{
		name: 'DevFlow',
		description:
			'Developer productivity suite with AI-powered insights and workflow automation.',
		tags: ['React', 'Python', 'TensorFlow', 'Docker'],
		features: [
			'AI code suggestions',
			'Workflow automation',
			'Team collaboration',
			'Performance metrics',
		],
		github: 'https://github.com/jonesydev/devflow',
		status: 'development',
	},
];

const getStatusColor = (status) => {
	switch (status) {
		case 'active':
			return 'green';
		case 'stable':
			return 'cyan';
		case 'development':
			return 'orange';
		default:
			return 'comment';
	}
};

const getStatusIcon = (status) => {
	switch (status) {
		case 'active':
			return '●';
		case 'stable':
			return '◆';
		case 'development':
			return '○';
		default:
			return '■';
	}
};
</script>

<style scoped>
@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.scale-101 {
	scale: 1.01;
}

[class*='hover:scale-'] {
	transform-origin: center;
}

.bg-dracula-current {
	animation: slideIn 0.3s ease-out forwards;
}
</style>
