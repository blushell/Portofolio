<template>
	<div class="flex flex-col h-screen">
		<WindowTopBar />
		<div class="flex-1 p-4 overflow-y-auto">
			<WindowAsciiLogo />
			<TerminalPrompt class="mt-4" />
		</div>
		<WindowFooter />
	</div>
</template>
