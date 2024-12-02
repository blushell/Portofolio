<script setup>
const toolCategories = [
	{
		name: 'Editors & IDEs',
		icon: '⌨️',
		tools: [
			{
				name: 'VS Code',
				description:
					'Primary code editor with custom keybindings and extensions',
				link: 'https://code.visualstudio.com',
			},
			{
				name: 'Neovim',
				description: 'Terminal-based editor for quick edits',
				link: 'https://neovim.io',
			},
			{
				name: 'JetBrains Suite',
				description: 'IDE for specialized development',
				link: 'https://www.jetbrains.com',
			},
		],
	},
	{
		name: 'Terminal & Shell',
		icon: '🖥️',
		tools: [
			{
				name: 'Windows Terminal',
				description: 'Modern terminal emulator with split panes',
				link: 'https://github.com/microsoft/terminal',
			},
			{
				name: 'Git Bash',
				description: 'Unix-style terminal for Windows',
				link: 'https://gitforwindows.org',
			},
			{
				name: 'Oh My Posh',
				description: 'Custom shell prompt with git integration',
				link: 'https://ohmyposh.dev',
			},
			{
				name: 'Starship',
				description: 'Cross-shell prompt with minimal latency',
				link: 'https://starship.rs',
			},
		],
	},
	{
		name: 'Productivity',
		icon: '⚡',
		tools: [
			{
				name: 'PowerToys',
				description: 'Windows system utilities and productivity tools',
				link: 'https://github.com/microsoft/PowerToys',
			},
			{
				name: 'AutoHotkey',
				description: 'Custom keyboard shortcuts and automation',
				link: 'https://www.autohotkey.com',
			},
			{
				name: 'Notion',
				description: 'Documentation and knowledge base',
				link: 'https://notion.so',
			},
			{
				name: 'Obsidian',
				description: 'Personal knowledge management',
				link: 'https://obsidian.md',
			},
		],
	},
	{
		name: 'Development',
		icon: '🛠️',
		tools: [
			{
				name: 'Docker Desktop',
				description: 'Container management and development',
				link: 'https://www.docker.com/products/docker-desktop',
			},
			{
				name: 'Postman',
				description: 'API development and testing',
				link: 'https://www.postman.com',
			},
			{
				name: 'DBeaver',
				description: 'Universal database tool',
				link: 'https://dbeaver.io',
			},
			{
				name: 'Git Kraken',
				description: 'Git GUI and visualization',
				link: 'https://www.gitkraken.com',
			},
		],
	},
	{
		name: 'Design',
		icon: '🎨',
		tools: [
			{
				name: 'Figma',
				description: 'UI/UX design and prototyping',
				link: 'https://www.figma.com',
			},
			{
				name: 'Excalidraw',
				description: 'Virtual whiteboard for sketching',
				link: 'https://excalidraw.com',
			},
			{
				name: 'ColorSlurp',
				description: 'Color picker and palette manager',
				link: 'https://colorslurp.com',
			},
		],
	},
];
</script>

<template>
	<div class="space-y-6">
		<!-- Header -->
		<div class="border-b border-dracula-current pb-2">
			<div class="text-dracula-purple font-bold">~/tools $ ls --tree</div>
			<div class="text-dracula-comment text-sm mt-1">
				Displaying
				{{ toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0) }}
				tools in {{ toolCategories.length }} categories
			</div>
		</div>

		<!-- Categories -->
		<div class="space-y-6">
			<div
				v-for="(category, catIndex) in toolCategories"
				:key="category.name"
				class="space-y-2"
				:style="{ animationDelay: `${catIndex * 100}ms` }"
			>
				<!-- Category Header -->
				<div class="flex items-center gap-2 text-dracula-purple font-bold">
					<span>{{ category.icon }}</span>
					<span>{{ category.name }}</span>
				</div>

				<!-- Tools List -->
				<div class="space-y-2 ml-6">
					<div
						v-for="(tool, toolIndex) in category.tools"
						:key="tool.name"
						class="group"
						:style="{ animationDelay: `${catIndex * 100 + toolIndex * 50}ms` }"
					>
						<div class="flex items-start">
							<span class="text-dracula-comment mr-2">└─</span>
							<div class="space-y-1">
								<div class="flex items-center gap-2">
									<a
										:href="tool.link"
										target="_blank"
										class="text-dracula-green hover:text-dracula-purple transition-colors"
									>
										{{ tool.name }}
									</a>
									<span
										class="text-dracula-comment text-xs opacity-0 group-hover:opacity-100 transition-opacity"
									>
										↗
									</span>
								</div>
								<div class="text-dracula-comment text-sm">
									{{ tool.description }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div
			class="text-dracula-comment text-sm italic border-t border-dracula-current pt-2"
		>
			Tip: Click on tool names to visit their websites
		</div>
	</div>
</template>

<style scoped>
@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(-10px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}

[class*='space-y-'] > * {
	animation: slideIn 0.3s ease-out forwards;
}
</style>
