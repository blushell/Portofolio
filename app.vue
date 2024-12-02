<template>
	<div>
		<TerminalWindow />
		<GameOver v-if="showGameOver" @close="closeGameOver" />
	</div>
</template>

<script setup>
import { useKonamiCode } from '~/composables/useKonamiCode';

const { showGameOver, closeGameOver } = useKonamiCode();
</script>
