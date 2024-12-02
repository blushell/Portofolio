<template>
  <div class="fixed inset-0 bg-dracula-background flex items-center justify-center z-50">
    <div class="text-center">
      <pre class="text-dracula-red text-4xl font-bold mb-8">
  ▄▄ •  ▄▄▄· • ▌ ▄ ·. ▄▄▄ .    ▄▄▄▄·  ▄▄▄· ▄▄▄  
▐█ ▀ ▪▐█ ▀█ ·██ ▐███▪▀▄.▀·    ▐█ ▀█▪▐█ ▀█ ▀▄ █·
▄█ ▀█▄▄█▀▀█ ▐█ ▌▐▌▐█·▐▀▀▪▄    ▐█▀▀█▄▄█▀▀█ ▐▀▀▄ 
▐█▄▪▐█▐█ ▪▐▌██ ██▌▐█▌▐█▄▄▌    ██▄▪▐█▐█ ▪▐▌▐█•█▌
·▀▀▀▀  ▀  ▀ ▀▀  █▪▀▀▀ ▀▀▀     ·▀▀▀▀  ▀  ▀ .▀  ▀
      </pre>
      <p class="text-dracula-purple text-xl">Press ESC to continue</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>