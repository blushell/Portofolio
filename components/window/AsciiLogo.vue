<template>
	<div class="flex flex-col sm:flex-row items-center">
		<pre
			style="font-family: monospace"
			class="text-dracula-purple leading-snug text-[0.3rem] sm:text-lg sm:leading-none"
			>{{ asciiLogo }}</pre
		>
	</div>
</template>
<script setup>
const asciiLogo = `
     ██╗ ██████╗ ███╗   ██╗███████╗███████╗██╗   ██╗    ██████╗ ███████╗██╗   ██╗
     ██║██╔═══██╗████╗  ██║██╔════╝██╔════╝╚██╗ ██╔╝    ██╔══██╗██╔════╝██║   ██║
     ██║██║   ██║██╔██╗ ██║█████╗  ███████╗ ╚████╔╝     ██║  ██║█████╗  ██║   ██║
██   ██║██║   ██║██║╚██╗██║██╔══╝  ╚════██║  ╚██╔╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚█████╔╝╚██████╔╝██║ ╚████║███████╗███████║   ██║       ██████╔╝███████╗ ╚████╔╝ 
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝       ╚═════╝ ╚══════╝  ╚═══╝
`;
</script>

<style scoped>
pre {
	/* Prevent selection of ASCII art */
	user-select: none;
	/* Ensure consistent rendering */
	-webkit-font-smoothing: none;
	-moz-osx-font-smoothing: grayscale;
}
</style>
