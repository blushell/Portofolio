<template>
	<div v-if="output" class="mb-6">
		<component
			v-if="typeof output === 'object' && output.component"
			:is="output.component"
			v-bind="output.props || {}"
		/>
		<div v-else v-html="output"></div>
	</div>
</template>

<script setup>
defineProps({
	output: {
		type: [String, Object],
		default: '',
	},
});
</script>
