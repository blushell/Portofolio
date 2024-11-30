<script setup>
import { ref, computed } from 'vue'
import ImageViewer from './ImageViewer.vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  }
})

const showViewer = ref(false)
const initialPosition = ref({ x: 50, y: 50 })

// Compute the actual image source
const imageSrc = computed(() => {
  return props.src || 'https://placehold.co/600x400/png'
})

// Compute the display name for the image
const displayName = computed(() => {
  return props.alt || imageSrc.value.split('/').pop()
})

const openImage = () => {
  // Randomize initial position slightly to avoid windows stacking exactly
  initialPosition.value = {
    x: Math.max(50, Math.min(window.innerWidth - 400, 50 + Math.random() * 100)),
    y: Math.max(50, Math.min(window.innerHeight - 300, 50 + Math.random() * 100))
  }
  showViewer.value = true
}

const closeViewer = () => {
  showViewer.value = false
}
</script>

<template>
  <div class="inline">
    <button
      type="button"
      @click.prevent="openImage"
      class="text-dracula-cyan hover:text-dracula-purple transition-colors underline inline-flex items-center gap-1"
    >
      <slot>{{ displayName }}</slot>
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ImageViewer
          v-if="showViewer"
          :src="imageSrc"
          :alt="alt"
          :initial-x="initialPosition.x"
          :initial-y="initialPosition.y"
          @close="closeViewer"
        />
      </Transition>
    </Teleport>
  </div>
</template>