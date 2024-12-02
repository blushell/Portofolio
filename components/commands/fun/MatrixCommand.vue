<template>
	<div
		v-if="isActive"
		class="fixed inset-0 z-50 bg-black cursor-pointer"
		@click="cleanup"
	>
		<canvas ref="canvas" class="absolute inset-0"></canvas>
		<div
			v-if="showWakeUp"
			class="absolute inset-0 flex items-center justify-center"
		>
			<div class="text-green-500 text-2xl font-mono animate-pulse">
				Wake up, Neo...
			</div>
		</div>
		<div class="absolute bottom-4 right-4 text-green-500 text-sm opacity-50">
			Press ESC or click anywhere to exit
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref(null);
const animationId = ref(null);
const showWakeUp = ref(false);
const isActive = ref(true);

const katakana =
	'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
let columns = 0;
let rainDrops = [];

const cleanup = () => {
	isActive.value = false;
	if (animationId.value) {
		cancelAnimationFrame(animationId.value);
	}
	showWakeUp.value = false;
};

const handleEscape = (event) => {
	if (event.key === 'Escape') {
		cleanup();
	}
};

const matrix = () => {
	if (!isActive.value) return;

	const ctx = canvas.value.getContext('2d');
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

	ctx.fillStyle = '#0F0';
	ctx.font = fontSize + 'px monospace';

	for (let i = 0; i < rainDrops.length; i++) {
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

		if (
			rainDrops[i] * fontSize > canvas.value.height &&
			Math.random() > 0.975
		) {
			rainDrops[i] = 0;
		}
		rainDrops[i]++;
	}

	animationId.value = requestAnimationFrame(matrix);
};

const initMatrix = () => {
	if (!canvas.value) return;

	canvas.value.width = window.innerWidth;
	canvas.value.height = window.innerHeight;

	columns = canvas.value.width / fontSize;
	rainDrops = Array(Math.floor(columns)).fill(1);

	matrix();

	setTimeout(() => {
		showWakeUp.value = true;
		setTimeout(() => {
			cleanup();
		}, 2000);
	}, 5000);
};

onMounted(() => {
	initMatrix();
	window.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
	cleanup();
	window.removeEventListener('keydown', handleEscape);
});
</script>
