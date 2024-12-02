<template>
	<div class="space-y-4 w-max">
		<!-- Settings List -->
		<div v-if="!showEditor" class="space-y-2">
			<div class="text-dracula-purple font-bold mb-4">
				Available Configuration Files:
			</div>
			<div class="space-y-2">
				<button
					v-for="setting in settings"
					:key="setting.filename"
					@click="selectSetting(setting)"
					class="block w-full text-left px-4 py-2 rounded transition-colors hover:bg-dracula-current group"
				>
					<div class="flex items-center justify-between gap-6">
						<span class="text-dracula-green group-hover:text-dracula-purple">
							{{ setting.filename }}
						</span>
						<span class="text-dracula-comment">
							{{ setting.name }}
						</span>
					</div>
				</button>
			</div>
		</div>

		<!-- Nano-like Editor -->
		<div v-else class="space-y-2">
			<div class="bg-dracula-current p-4 rounded text-sm">
				<!-- Editor Header -->
				<div class="flex justify-between text-dracula-comment mb-2">
					<div>GNU nano {{ selectedSetting.filename }}</div>
					<div class="space-x-2">
						<button
							@click="copyToClipboard"
							class="px-2 py-1 bg-dracula-purple text-dracula-background rounded text-xs hover:bg-dracula-pink transition-colors"
						>
							Copy
						</button>
						<button
							@click="downloadFile(setting)"
							class="px-2 py-1 bg-dracula-green text-dracula-background rounded text-xs hover:bg-dracula-cyan transition-colors"
						>
							Download
						</button>
					</div>
				</div>

				<!-- File Content -->
				<div
					class="text-dracula-text whitespace-pre-wrap break-all bg-dracula-bg p-4 rounded min-h-[300px] max-h-[500px] overflow-y-auto"
				>
					{{ selectedSetting.content }}
				</div>

				<!-- Editor Footer -->
				<div
					class="mt-4 text-dracula-comment text-xs border-t border-dracula-comment pt-2"
				>
					^G Help ^O Write ^W Where ^K Cut ^J Justify ^C Cancel ^Y Page Up ^X
					Exit ^R Read ^\ Replace ^U Paste ^T To Spell ^_ Go To ^V Page Down
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-between items-center">
				<div class="text-dracula-comment text-sm">
					Press <kbd class="text-dracula-purple">Ctrl+X</kbd> or click
					<button
						@click="closeEditor"
						class="text-dracula-purple hover:text-dracula-pink transition-colors"
					>
						here
					</button>
					to exit
				</div>

				<!-- Notification Message -->
				<div v-if="message" class="text-dracula-green text-sm animate-fade-out">
					{{ message }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useTerminalInput } from '~/composables/useTerminalInput';
import terminal from '~/data/settings/terminal';
import vim from '~/data/settings/vim';
import git from '~/data/settings/git';
import tmux from '~/data/settings/tmux';

const { hideInput, showInput } = useTerminalInput();
const selectedSetting = ref(null);
const showEditor = ref(false);
const message = ref('');

const settings = [terminal, vim, git, tmux];

const selectSetting = (setting) => {
	selectedSetting.value = setting;
	showEditor.value = true;
	hideInput();
};

const closeEditor = () => {
	showEditor.value = false;
	selectedSetting.value = null;
	showInput();
};

const copyToClipboard = async () => {
	try {
		await navigator.clipboard.writeText(selectedSetting.value.content);
		message.value = 'Configuration copied to clipboard!';
		setTimeout(() => {
			message.value = '';
		}, 2000);
	} catch (err) {
		console.error('Failed to copy:', err);
		message.value = 'Failed to copy configuration';
	}
};

const downloadFile = (setting) => {
	const link = document.createElement('a');
	link.href = setting.fileUrl;
	link.download = setting.filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const handleKeydown = (e) => {
	if (showEditor.value && e.key === 'x' && e.ctrlKey) {
		e.preventDefault();
		closeEditor();
	}
};

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	showInput();
});
</script>

<style scoped>
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.animate-fade-out {
	animation: fadeOut 2s forwards;
}
</style>
