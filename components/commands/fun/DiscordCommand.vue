<template>
	<div class="space-y-4">
		<!-- Name Input -->
		<div class="space-y-2">
			<div class="text-dracula-purple">Enter your name (optional):</div>
			<div class="flex items-center gap-2">
				<span class="text-dracula-pink">></span>
				<input
					v-model="name"
					type="text"
					class="bg-transparent border-none outline-none text-dracula-foreground w-full"
					placeholder="Leave blank to send anonymously"
					autofocus
				/>
			</div>
		</div>

		<!-- Message Input -->
		<div class="space-y-2">
			<div class="text-dracula-purple">Enter your message:</div>
			<div class="flex items-center gap-2">
				<span class="text-dracula-pink">></span>
				<input
					v-model="message"
					type="text"
					class="bg-transparent border-none outline-none text-dracula-foreground w-full"
				/>
			</div>
		</div>

		<!-- Status/Error Messages -->
		<div v-if="status" class="text-dracula-green animate-pulse">
			{{ status }}
		</div>
		<div v-if="error" class="text-dracula-red">Error: {{ error }}</div>

		<div class="text-dracula-comment text-sm">
			Press ESC to cancel or ENTER to send
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTerminalInput } from '~/composables/useTerminalInput';

const { hideInput, showInput } = useTerminalInput();

const name = ref('');
const message = ref('');
const status = ref('');
const error = ref('');
const sessionId = ref(crypto.randomUUID());

const resetForm = () => {
	name.value = '';
	message.value = '';
	status.value = '';
	error.value = '';
};

const handleSubmit = async () => {
	if (!message.value.trim()) {
		error.value = 'Message cannot be empty';
		return;
	}

	error.value = '';
	status.value = 'Sending message...';

	try {
		const response = await fetch('/api/discord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value.trim(),
				message: message.value.trim(),
				ip: sessionId.value,
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
	if (e.key === 'Enter' && message.value) {
		handleSubmit();
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
