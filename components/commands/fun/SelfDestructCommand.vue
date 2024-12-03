<template>
	<div class="space-y-2">
		<template v-if="status === 'countdown'">
			<div class="text-dracula-red font-bold animate-pulse">
				WARNING: Terminal self-destruct sequence initiated
			</div>
			<div class="text-dracula-orange">
				Self-destructing in {{ countdown }} seconds...
			</div>
		</template>

		<template v-if="status === 'explosion'">
			<pre class="text-dracula-red whitespace-pre animate-pulse">
   ____________________
  /                    \
 /     BOOM! BANG!      \
|        KABOOM!         |
|         💥 💥          |
 \      EXPLOSION!      /
  \____________________/
      </pre>
		</template>

		<template v-if="status === 'reboot'">
			<div class="space-y-1">
				<div class="text-dracula-green">Initiating system reboot...</div>
				<div class="text-dracula-purple">Loading kernel...</div>
				<div class="text-dracula-cyan">Mounting file systems...</div>
				<div class="text-dracula-pink">Starting terminal services...</div>
				<div class="text-dracula-yellow">Terminal restored successfully!</div>
			</div>
		</template>
	</div>
</template>

<script setup>
const countdown = ref(5);
const status = ref('countdown');

onMounted(() => {
	const timer = setInterval(() => {
		countdown.value--;
		if (countdown.value === 0) {
			clearInterval(timer);
			status.value = 'explosion';
			setTimeout(() => {
				status.value = 'reboot';
			}, 2000);
		}
	}, 1000);
});
</script>
