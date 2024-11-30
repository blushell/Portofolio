<template>
	<div class="space-y-4">
		<!-- Header -->
		<div
			class="text-dracula-purple font-bold border-b border-dracula-current pb-2"
		>
			Command Reference (Page {{ currentPage }}/{{ totalPages }})
		</div>

		<!-- Commands List -->
		<div class="space-y-3 min-h-fit">
			<div
				v-for="(cmd, index) in paginatedCommands"
				:key="cmd.name || `placeholder-${index}`"
				class="group h-[32px] flex items-start"
			>
				<template v-if="cmd.name">
					<div class="flex items-start space-x-2">
						<div class="text-dracula-pink">$</div>
						<div
							class="text-dracula-green group-hover:text-dracula-purple transition-colors"
						>
							{{ cmd.name }}
						</div>
						<div v-if="cmd.aliases.length" class="text-dracula-comment text-sm">
							({{ cmd.aliases.join(', ') }})
						</div>
						<div class="text-dracula-foreground text-sm">
							- {{ cmd.description }}
						</div>
					</div>
				</template>
				<template v-else>
					<div class="opacity-0">placeholder</div>
				</template>
			</div>
		</div>

		<!-- Terminal-style Pagination -->
		<div class="space-y-2 border-t border-dracula-current pt-2">
			<div class="text-dracula-comment">Navigation commands:</div>
			<div class="space-x-4">
				<button
					@click="prevPage"
					:disabled="currentPage === 1"
					class="text-dracula-green hover:text-dracula-purple disabled:text-dracula-comment transition-colors"
					:class="{ 'cursor-not-allowed': currentPage === 1 }"
				>
					[prev]
				</button>

				<button
					@click="nextPage"
					:disabled="currentPage === totalPages"
					class="text-dracula-green hover:text-dracula-purple disabled:text-dracula-comment transition-colors"
					:class="{ 'cursor-not-allowed': currentPage === totalPages }"
				>
					[next]
				</button>

				<span class="text-dracula-comment">or jump to page:</span>

				<span class="space-x-1">
					<template v-for="page in totalPages" :key="page">
						<button
							@click="goToPage(page)"
							class="transition-colors"
							:class="{
								'text-dracula-purple': currentPage === page,
								'text-dracula-green hover:text-dracula-purple':
									currentPage !== page,
							}"
						>
							[{{ page }}]
						</button>
					</template>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTerminalCommands } from '~/composables/useTerminalCommands';

const ITEMS_PER_PAGE = 8;

const currentPage = ref(1);

const { commandConfig } = useTerminalCommands();

// Get all commands including hidden ones
const allCommands = computed(() => {
	return Object.entries(commandConfig)
		.map(([name, config]) => ({
			name,
			aliases: config.aliases || [],
			description: config.description || 'No description available',
			hidden: config.hidden || false,
		}))
		.sort((a, b) => {
			const priority = ['help', 'clear'];
			const priorityA = priority.indexOf(a.name);
			const priorityB = priority.indexOf(b.name);

			if (priorityA !== -1 || priorityB !== -1) {
				return (
					(priorityA !== -1 ? priorityA : Infinity) -
					(priorityB !== -1 ? priorityB : Infinity)
				);
			}

			return a.name.localeCompare(b.name);
		});
});

const totalPages = computed(() =>
	Math.ceil(allCommands.value.length / ITEMS_PER_PAGE)
);

const paginatedCommands = computed(() => {
	const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	const pageCommands = allCommands.value.slice(start, end);

	// Pad with empty items if needed
	while (pageCommands.length < ITEMS_PER_PAGE) {
		pageCommands.push({ name: '', aliases: [], description: '' });
	}

	return pageCommands;
});

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const goToPage = (page) => {
	currentPage.value = page;
};
</script>
