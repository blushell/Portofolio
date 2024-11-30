<template>
	<div v-if="output" class="mt-1">
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
