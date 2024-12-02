<template>
	<div class="space-y-1">
		<p class="text-dracula-purple">Available commands:</p>
		<div v-for="cmd in commands" :key="cmd.command" class="space-y-1">
			<div class="flex gap-2">
				<span class="text-dracula-green">{{ cmd.command }}</span>
				<span v-if="cmd.aliases.length" class="text-dracula-comment">
					(aliases: {{ cmd.aliases.join(', ') }})
				</span>
			</div>
			<div class="text-dracula-text pl-4 text-sm">
				{{ cmd.description }}
			</div>
		</div>
	</div>
	<div class="text-dracula-cyan mt-4">
		<div>Tip: Use Tab to autocomplete commands</div>
		<div>Tip: Use ↑↓ arrows to navigate command history</div>
	</div>
</template>

<script setup>
import { useTerminalCommands } from '~/composables/useTerminalCommands';

const { getAllCommands } = useTerminalCommands();
const commands = getAllCommands();
</script>
