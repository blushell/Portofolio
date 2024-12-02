<template>
	<div v-if="isHacking" class="space-y-1 min-h-[250px]">
		<div
			v-for="(line, index) in hackingLines"
			:key="index"
			:class="{
				'text-dracula-purple animate-pulse': line.status === 'progress',
				'text-dracula-green font-bold': line.status === 'success',
			}"
		>
			<template v-if="line.status === 'progress'"> > {{ line.text }} </template>
			<template v-else> ✓ {{ line.text }} </template>
		</div>

		<div v-if="hackingComplete" class="mt-4 text-dracula-comment">
			Type 'help' for available commands
		</div>
	</div>

	<div v-else-if="!showEditor" class="space-y-2">
		<div v-if="error" class="text-dracula-red">{{ error }}</div>
		<template v-else>
			<div class="text-dracula-red">Permission denied (publickey).</div>
			<div class="text-dracula-comment">
				Also, my public key is in
				<button
					@click="openEditor"
					class="text-dracula-cyan hover:text-dracula-purple transition-colors underline"
				>
					id_rsa.pub
				</button>
			</div>
		</template>
	</div>

	<div v-else class="space-y-2">
		<div class="bg-dracula-current p-4 rounded text-sm">
			<div class="flex justify-between text-dracula-comment mb-2">
				<div>GNU nano 7.2</div>
				<div>id_rsa.pub</div>
			</div>
			<div class="text-dracula-text whitespace-pre-wrap break-all">
				{{ publicKey }}
			</div>
			<div
				class="mt-4 text-dracula-comment text-sm border-t border-dracula-comment pt-2"
			>
				^G Help ^O Write ^W Where ^K Cut ^J Justify ^C Cancel ^Y Page Up ^X Exit
				^R Read ^\ Replace ^U Paste ^T To Spell ^_ Go To ^V Page Down
			</div>
		</div>
		<div class="text-dracula-comment text-sm">
			Press <kbd class="text-dracula-purple">Ctrl+X</kbd> or click
			<button
				@click="
					showEditor = false;
					showInput();
				"
				class="text-dracula-purple hover:text-dracula-pink transition-colors"
			>
				here
			</button>
			to exit
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTerminalInput } from '~/composables/useTerminalInput';

const props = defineProps({
	command: {
		type: String,
		required: false,
		default: 'ssh',
	},
});

const { hideInput, showInput } = useTerminalInput();
const showEditor = ref(false);
const publicKey = ref('');
const error = ref('');
const isHacking = ref(false);
const hackingLines = ref([]);
const hackingComplete = ref(false);

const validateSshCommand = (cmd) => {
	const regex = /^ssh\s+\w+@portfolio$/;
	return regex.test(cmd);
};

const handleKeydown = (e) => {
	if (showEditor.value && e.key === 'x' && e.ctrlKey) {
		e.preventDefault();
		showEditor.value = false;
		showInput();
	}
};

const generateSSHKey = () => {
	const keyParts = [];
	const keyLength = 372;
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	for (let i = 0; i < 3; i++) {
		keyParts.push(
			Array.from(
				{ length: keyLength },
				() => chars[Math.floor(Math.random() * chars.length)]
			).join('')
		);
	}

	return `ssh-rsa ${keyParts.join('\n')} me@portfolio`;
};

const openEditor = () => {
	showEditor.value = true;
	hideInput();
	publicKey.value = generateSSHKey();
};

const simulateHacking = async () => {
	isHacking.value = true;
	hideInput();

	const steps = [
		{ text: 'Initiating SSH exploit...', delay: 500 },
		{ text: 'Bypassing RSA authentication...', delay: 600 },
		{ text: 'Cracking password hash...', delay: 800 },
		{ text: 'Accessing secure shell...', delay: 400 },
		{ text: 'Establishing encrypted tunnel...', delay: 500 },
		{ text: 'Escalating privileges...', delay: 700 },
		{ text: 'Access granted! Welcome, hacker.', delay: 300, success: true },
	];

	for (const step of steps) {
		hackingLines.value.push({
			text: step.text,
			status: step.success ? 'success' : 'progress',
		});
		await new Promise((resolve) => setTimeout(resolve, step.delay));
	}

	hackingComplete.value = true;
	setTimeout(showInput, 1000);
};

onMounted(() => {
	if (!validateSshCommand(props.command)) {
		error.value = 'Invalid SSH command. Use format: ssh user@portfolio';
	} else if (props.command === 'ssh hacker@portfolio') {
		simulateHacking();
	}
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	showInput();
});
</script>
