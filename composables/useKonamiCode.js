import { ref, onMounted, onUnmounted } from 'vue'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
  'Enter'
]

export const useKonamiCode = () => {
  const showGameOver = ref(false)
  const keySequence = ref([])

  const handleKeydown = (e) => {
    keySequence.value.push(e.key)
    
    if (keySequence.value.length > KONAMI_CODE.length) {
      keySequence.value.shift()
    }

    if (JSON.stringify(keySequence.value) === JSON.stringify(KONAMI_CODE)) {
      showGameOver.value = true
      keySequence.value = []
    }
  }

  const closeGameOver = () => {
    showGameOver.value = false
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    showGameOver,
    closeGameOver
  }
}