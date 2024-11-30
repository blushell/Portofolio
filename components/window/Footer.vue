<template>
	<div
		class="text-dracula-comment text-xs sm:text-sm border-t border-dracula-current py-2 px-4"
	>
		<div class="flex flex-col sm:flex-row items-center justify-between">
			<div>
				This site was styled with the
				<a
					href="https://draculatheme.com"
					target="_blank"
					class="text-dracula-purple hover:text-dracula-pink transition-colors"
				>
					Dracula Theme
				</a>
			</div>
			<div class="text-center sm:text-right">
				© {{ new Date().getFullYear() }} jonesy.dev
			</div>
		</div>
	</div>
</template>
