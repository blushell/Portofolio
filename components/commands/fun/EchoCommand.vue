<template>
	<div>
		<div v-if="error" class="text-dracula-red">
			Error: Message must be wrapped in quotes. Example: echo "Hello World"
		</div>
		<div v-else class="text-dracula-text">
			{{ message }}
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	message: {
		type: String,
		default: '',
	},
	error: {
		type: Boolean,
		default: false,
	},
});
</script>
