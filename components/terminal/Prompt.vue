<template>
	<div class="space-y-2">
		<div v-for="(entry, index) in displayHistory" :key="index">
			<div class="flex items-center">
				<TerminalCommandPrompt />
				<span class="ml-2">{{ entry.command }}</span>
			</div>
			<TerminalCommandOutput :output="entry.output" />
		</div>
		<div v-if="isVisible" class="flex items-center">
			<TerminalCommandPrompt />
			<input
				ref="commandInput"
				v-model="currentCommand"
				@keydown.enter="executeCommand"
				@keydown.tab.prevent="handleTabCompletion"
				@keydown.up="navigateHistoryUp"
				@keydown.down="navigateHistoryDown"
				class="ml-2 w-full bg-transparent border-none outline-none text-dracula-text"
				type="text"
				spellcheck="false"
				autofocus
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTerminalCommands } from '~/composables/useTerminalCommands';
import { useCommandHistory } from '~/composables/useCommandHistory';
import { useAutoComplete } from '~/composables/useAutoComplete';
import { useTypewriter } from '~/composables/useTypewriter';
import { useTerminalInput } from '~/composables/useTerminalInput';

const commandInput = ref(null);
const currentCommand = ref('');
const { isVisible } = useTerminalInput();

const { executeCommand: runCommand, commands } = useTerminalCommands();
const { displayHistory, addToHistory, clearHistory, navigateHistory } =
	useCommandHistory();
const { handleTabComplete } = useAutoComplete(commands);
const { typeText } = useTypewriter();

const executeCommand = async () => {
	if (!currentCommand.value.trim()) return;

	const output = await runCommand(currentCommand.value);
	if (output !== 'CLEAR') {
		addToHistory(currentCommand.value, output);
	} else {
		clearHistory();
	}

	currentCommand.value = '';

	setTimeout(() => {
		commandInput.value?.scrollIntoView({ behavior: 'smooth' });
	}, 0);
};

const simulateHelpCommand = async () => {
	await typeText(
		'help',
		(text) => {
			currentCommand.value = text;
		},
		150
	);
	await executeCommand();
};

onMounted(() => {
	commandInput.value?.focus();
	simulateHelpCommand();
});

const handleTabCompletion = () => {
	currentCommand.value = handleTabComplete(currentCommand.value);
};

const navigateHistoryUp = () => {
	currentCommand.value = navigateHistory('up', currentCommand.value);
};

const navigateHistoryDown = () => {
	currentCommand.value = navigateHistory('down', currentCommand.value);
};
</script>
