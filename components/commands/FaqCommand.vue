<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="border-b border-dracula-current pb-2">
			<div class="text-dracula-purple font-bold">
				Frequently Asked Questions
			</div>
			<div class="text-dracula-comment text-sm mt-1">
				Click to expand a question
			</div>
		</div>

		<!-- FAQ List -->
		<div class="space-y-4 w-max">
			<details v-for="(faq, index) in faqs" :key="index" class="group">
				<summary class="cursor-pointer list-none">
					<div
						class="flex gap-2 items-start group-hover:bg-dracula-current p-2 rounded transition-colors"
					>
						<span class="text-dracula-pink font-bold">[{{ index + 1 }}]</span>
						<span
							class="text-dracula-green group-hover:text-dracula-purple transition-colors"
						>
							{{ faq.question }}
						</span>
					</div>
				</summary>
				<div class="mt-2 ml-8 space-y-2">
					<template v-for="(part, pIndex) in faq.answer" :key="pIndex">
						<div v-if="typeof part === 'string'" class="text-dracula-text">
							{{ part }}
						</div>
						<div
							v-else-if="part.type === 'code'"
							class="bg-dracula-current p-2 rounded text-sm text-dracula-green"
						>
							{{ part.content }}
						</div>
						<div v-else-if="part.type === 'list'" class="space-y-1">
							<div
								v-for="(item, iIndex) in part.items"
								:key="iIndex"
								class="flex gap-2"
							>
								<span class="text-dracula-comment">•</span>
								<span class="text-dracula-text">{{ item }}</span>
							</div>
						</div>
					</template>
				</div>
			</details>
		</div>
	</div>
</template>

<script setup>
const faqs = [
	{
		question: 'How do I navigate this terminal portfolio?',
		answer: [
			'The terminal accepts various commands to explore different sections. Here are the basics:',
			{
				type: 'list',
				items: [
					"Type 'help' to see all available commands",
					'Use Tab for command autocompletion',
					'Press ↑/↓ to navigate command history',
					"Type 'clear' to clear the terminal",
				],
			},
		],
	},
	{
		question: 'Can I use this terminal portfolio template for my own website?',
		answer: [
			'Yes! This portfolio is open-source and available on GitHub. To get started:',
			{
				type: 'code',
				content: 'git clone https://github.com/yourusername/terminal-portfolio',
			},
			'Make sure to:',
			{
				type: 'list',
				items: [
					'Update personal information and projects',
					'Customize the theme and commands',
					'Credit the original project in your README',
					'Share your modifications with the community',
				],
			},
		],
	},
	{
		question: 'What technologies are used in this project?',
		answer: [
			'This terminal portfolio is built with modern web technologies:',
			{
				type: 'list',
				items: [
					'Vue.js 3 with Composition API',
					'Nuxt 3 for SSR and routing',
					'TailwindCSS with Dracula theme',
					'TypeScript for type safety',
					'Supabase for backend services',
				],
			},
		],
	},
	{
		question: 'How can I contact you for work opportunities?',
		answer: [
			'There are several ways to get in touch:',
			{
				type: 'list',
				items: [
					"Use the 'contact' command to see all contact methods",
					'Email directly at your@email.com',
					'Connect on LinkedIn (link in contact)',
					'Schedule a meeting through Calendly',
				],
			},
			"I'm currently open to freelance projects and full-time opportunities.",
		],
	},
	{
		question: 'Are there any Easter eggs in this terminal?',
		answer: [
			'Yes! There are several hidden features to discover:',
			{
				type: 'list',
				items: [
					'Try the Konami Code (↑↑↓↓←→←→BA)',
					"Type 'matrix' for a surprise",
					'SSH into different endpoints',
					'Look for hidden commands not listed in help',
				],
			},
			'Keep exploring to find more secrets!',
		],
	},
	{
		question: 'How do I enable/disable terminal sounds?',
		answer: [
			'Terminal sounds can be toggled in several ways:',
			{ type: 'code', content: 'settings sound --enable' },
			'Or use the settings command and navigate to Sound preferences. Default keyboard shortcuts:',
			{
				type: 'list',
				items: [
					'Alt + M: Toggle all sounds',
					'Alt + V: Adjust volume',
					'Alt + T: Toggle specific sounds',
				],
			},
		],
	},
	{
		question: 'Can I contribute to this project?',
		answer: [
			"Absolutely! Contributions are welcome. Here's how to get started:",
			{
				type: 'list',
				items: [
					'Fork the repository on GitHub',
					'Create a feature branch',
					'Submit a pull request',
					'Follow the contribution guidelines',
				],
			},
			'Check the GitHub repository for open issues and project roadmap.',
		],
	},
];
</script>

<style scoped>
details > summary {
	position: relative;
	outline: none;
}

details > summary::-webkit-details-marker {
	display: none;
}

details[open] summary ~ * {
	animation: slideDown 0.2s ease-in-out;
}

@keyframes slideDown {
	0% {
		opacity: 0;
		transform: translateY(-10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
