<template>
	<div
		ref="windowRef"
		class="bg-other-BGDarker rounded-lg shadow-xl overflow-hidden h-full"
		:class="{ 'transition-all duration-300': isMaximized }"
		:style="windowStyle"
		@mousedown="bringToFront"
	>
		<!-- Window Title Bar -->
		<div
			class="bg-dracula-current px-4 py-2 cursor-move flex items-center justify-between select-none"
			@mousedown="startDrag"
			@dblclick="toggleMaximize"
		>
			<div class="text-dracula-foreground font-medium truncate">
				{{ alt || props.src.split('/').pop() }}
			</div>
			<div class="flex items-center space-x-2 window-controls">
				<button
					type="button"
					@click.stop="toggleMaximize"
					class="w-3 h-3 rounded-full bg-dracula-yellow hover:opacity-80 transition-opacity"
					title="Maximize"
				></button>
				<button
					type="button"
					@click.stop="$emit('close')"
					class="w-3 h-3 rounded-full bg-dracula-red hover:opacity-80 transition-opacity"
					title="Close"
				></button>
			</div>
		</div>

		<!-- Image Container -->
		<div
			class="relative overflow-auto p-4 bg-dracula-background h-[calc(100%-2.5rem)]"
		>
			<template v-if="!imageError">
				<img
					:src="imagePath"
					:alt="alt"
					class="max-w-full max-h-full object-contain mx-auto"
					@dragstart.prevent
					@error="handleImageError"
				/>
			</template>
			<div
				v-else
				class="flex flex-col items-center justify-center h-full gap-2"
			>
				<div class="text-dracula-red">Failed to load image:</div>
				<div class="text-dracula-comment text-sm break-all">
					{{ imagePath }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		default: '',
	},
	initialX: {
		type: Number,
		default: 50,
	},
	initialY: {
		type: Number,
		default: 50,
	},
});

const emit = defineEmits(['close']);
const windowRef = ref(null);
const isMaximized = ref(false);
const previousPosition = ref({ x: 0, y: 0 });
const previousSize = ref({ width: 0, height: 0 });
const zIndex = ref(1000);
const imageError = ref(false);
const position = ref({ x: props.initialX, y: props.initialY });
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });

// Compute the correct image path
const imagePath = computed(() => {
	if (props.src.startsWith('http')) {
		return props.src;
	}
	return props.src.startsWith('/') ? props.src : `/${props.src}`;
});

// Window style
const windowStyle = computed(() => ({
	transform: isMaximized.value
		? 'none'
		: `translate(${position.value.x}px, ${position.value.y}px)`,
	zIndex: zIndex.value,
	minWidth: '300px',
	minHeight: '200px',
	maxWidth: isMaximized.value ? '100vw' : '90vw',
	maxHeight: isMaximized.value ? '100vh' : '90vh',
	position: 'fixed',
	top: 0,
	left: 0,
}));

// Handle window focus
const bringToFront = () => {
	zIndex.value = Date.now();
};

// Constrain position within viewport
const constrainPosition = (x, y) => {
	if (!windowRef.value) return { x, y };

	const rect = windowRef.value.getBoundingClientRect();
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	return {
		x: Math.max(0, Math.min(x, viewportWidth - rect.width)),
		y: Math.max(0, Math.min(y, viewportHeight - rect.height)),
	};
};

// Dragging handlers
const startDrag = (event) => {
	if (isMaximized.value || event.target.closest('.window-controls')) return;
	isDragging.value = true;
	const rect = windowRef.value.getBoundingClientRect();
	dragOffset.value = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
	window.addEventListener('mousemove', handleDrag);
	window.addEventListener('mouseup', stopDrag);
};

const handleDrag = (event) => {
	if (!isDragging.value) return;
	const newPosition = {
		x: event.clientX - dragOffset.value.x,
		y: event.clientY - dragOffset.value.y,
	};
	position.value = constrainPosition(newPosition.x, newPosition.y);
};

const stopDrag = () => {
	isDragging.value = false;
	window.removeEventListener('mousemove', handleDrag);
	window.removeEventListener('mouseup', stopDrag);
};

// Handle maximize/restore
const toggleMaximize = () => {
	if (isMaximized.value) {
		position.value = constrainPosition(
			previousPosition.value.x,
			previousPosition.value.y
		);
		windowRef.value.style.width = previousSize.value.width + 'px';
		windowRef.value.style.height = previousSize.value.height + 'px';
	} else {
		previousPosition.value = { ...position.value };
		previousSize.value = {
			width: windowRef.value.offsetWidth,
			height: windowRef.value.offsetHeight,
		};
		position.value = { x: 0, y: 0 };
		windowRef.value.style.width = '100vw';
		windowRef.value.style.height = '100vh';
	}
	isMaximized.value = !isMaximized.value;
};

// Handle escape key
const handleKeydown = (event) => {
	if (event.key === 'Escape') {
		emit('close');
	}
};

// Handle image load error
const handleImageError = () => {
	console.error('Failed to load image:', imagePath.value);
	imageError.value = true;
};

onMounted(() => {
	window.addEventListener('keydown', handleKeydown);
	bringToFront();
	// Ensure initial position is within bounds
	position.value = constrainPosition(position.value.x, position.value.y);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeydown);
	window.removeEventListener('mousemove', handleDrag);
	window.removeEventListener('mouseup', stopDrag);
});
</script>

<style scoped>
.window-controls {
	pointer-events: auto;
}

.window-controls button {
	cursor: pointer;
}
</style>
