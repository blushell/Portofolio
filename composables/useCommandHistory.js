import { ref } from 'vue'

export const useCommandHistory = () => {
  const displayHistory = ref([])
  const commandHistory = ref([])
  const historyIndex = ref(-1)

  const addToHistory = (command, output) => {
    displayHistory.value.push({ command, output })
    commandHistory.value.push(command)
  }

  const clearHistory = () => {
    displayHistory.value = []
    historyIndex.value = -1
    // Note: commandHistory is not cleared
  }

  const navigateHistory = (direction, currentCommand) => {
    if (commandHistory.value.length === 0) return currentCommand

    if (direction === 'up') {
      historyIndex.value = historyIndex.value < commandHistory.value.length - 1 
        ? historyIndex.value + 1 
        : historyIndex.value
    } else {
      historyIndex.value = historyIndex.value > -1 
        ? historyIndex.value - 1 
        : -1
    }
    
    return historyIndex.value >= 0 
      ? commandHistory.value[commandHistory.value.length - 1 - historyIndex.value] 
      : ''
  }

  return {
    displayHistory,
    commandHistory,
    historyIndex,
    addToHistory,
    clearHistory,
    navigateHistory
  }
}