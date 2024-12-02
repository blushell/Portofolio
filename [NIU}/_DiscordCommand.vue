<template>
	<div class="space-y-4">
		<!-- Type Selection -->
		<div v-if="step === 'type'" class="space-y-2">
			<div class="text-dracula-purple font-bold">
				How would you like to send your message?
			</div>
			<div class="space-y-1">
				<div class="text-dracula-green">[1] Send anonymously</div>
				<div class="text-dracula-green">[2] Set a name</div>
			</div>
			<div class="text-dracula-comment text-sm">
				Enter your choice (1 or 2):
			</div>
			<div class="flex items-center gap-2">
				<span class="text-dracula-pink">></span>
				<input
					v-model="userInput"
					type="text"
					class="bg-transparent border-none outline-none text-dracula-foreground w-full"
					autofocus
				/>
			</div>
		</div>

		<!-- Name Input -->
		<div v-if="step === 'name'" class="space-y-2">
			<div class="text-dracula-purple">Enter your name:</div>
			<div class="flex items-center gap-2">
				<span class="text-dracula-pink">></span>
				<input
					v-model="userInput"
					type="text"
					class="bg-transparent border-none outline-none text-dracula-foreground w-full"
					autofocus
				/>
			</div>
		</div>

		<!-- Message Input -->
		<div v-if="step === 'message'" class="space-y-2">
			<div class="text-dracula-purple">Enter your message:</div>
			<div v-if="!isAnonymous" class="text-dracula-comment">
				Sending as: {{ name }}
			</div>
			<div class="flex items-center gap-2">
				<span class="text-dracula-pink">></span>
				<input
					v-model="userInput"
					type="text"
					class="bg-transparent border-none outline-none text-dracula-foreground w-full"
					autofocus
				/>
			</div>
		</div>

		<!-- Status/Error Messages -->
		<div v-if="status" class="text-dracula-green animate-pulse">
			{{ status }}
		</div>
		<div v-if="error" class="text-dracula-red">Error: {{ error }}</div>

		<div class="text-dracula-comment text-sm">Press ESC to cancel</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTerminalInput } from '~/composables/useTerminalInput';

const { hideInput, showInput } = useTerminalInput();

const step = ref('type'); // type, name, message
const name = ref('');
const message = ref('');
const status = ref('');
const error = ref('');
const isAnonymous = ref(false);
const userInput = ref('');

const resetForm = () => {
	step.value = 'type';
	name.value = '';
	message.value = '';
	status.value = '';
	error.value = '';
	isAnonymous.value = false;
	userInput.value = '';
};

const handleTypeSelection = (anonymous) => {
	isAnonymous.value = anonymous;
	step.value = anonymous ? 'message' : 'name';
	userInput.value = '';
};

const handleNameSubmit = (input) => {
	if (!input.trim()) {
		error.value = 'Name cannot be empty';
		return;
	}
	name.value = input.trim();
	step.value = 'message';
	error.value = '';
	userInput.value = '';
};

const handleMessageSubmit = async (input) => {
	if (!input.trim()) {
		error.value = 'Message cannot be empty';
		return;
	}

	message.value = input.trim();
	error.value = '';
	status.value = 'Sending message...';

	try {
		const response = await fetch('/api/discord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: isAnonymous.value ? '' : name.value,
				message: message.value,
				ip: crypto.randomUUID(), // Simple unique identifier for cooldown
			}),
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to send message');
		}

		status.value = 'Message sent successfully!';
		setTimeout(() => {
			resetForm();
			showInput();
		}, 2000);
	} catch (e) {
		error.value = e.message;
		status.value = '';
	}
};

const handleKeydown = (e) => {
	if (e.key === 'Enter' && userInput.value) {
		if (step.value === 'type') {
			if (userInput.value === '1') handleTypeSelection(true);
			else if (userInput.value === '2') handleTypeSelection(false);
			else error.value = 'Please enter 1 or 2';
		} else if (step.value === 'name') {
			handleNameSubmit(userInput.value);
		} else if (step.value === 'message') {
			handleMessageSubmit(userInput.value);
		}
	} else if (e.key === 'Escape') {
		resetForm();
		showInput();
	}
};

onMounted(() => {
	hideInput();
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	showInput();
});
</script>
